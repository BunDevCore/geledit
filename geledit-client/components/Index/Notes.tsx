import React, {useEffect, useState} from "react";
import {getCookie, removeCookies} from "cookies-next";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import useSWR from "swr";
import {UserBox, NoteLink, NoteName, NoteOwner, NoteInfo} from "../../styles/Notes/notes";
import type {SWRReturn, Note} from "../../types/global";

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

const Notes = () => {
    const [noteName, setNoteName] = useState("");
    const [token, setToken] = useState<string | undefined | null>(undefined);

    useEffect(() => {
        let t = getCookie("token");
        setToken(t?.toString())
    }, []);

    const handleNewNote = (_event: React.MouseEvent<HTMLButtonElement>) => {
        let t = getCookie("token");
        (async () => {
            let res = await fetch("http://localhost:5274/Note/new", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + t
                },
                body: JSON.stringify({
                    "title": noteName
                })
            });
            if (res.status == 401) {
                removeCookies("token")
                window.location.reload()
            }
            await mutate();
        })();
    }
    const {data, error, isLoading, mutate}: SWRReturn<Note[]> = useSWR("http://localhost:5274/Note", fetcher);

    if (error) return <NoteInfo>Failed to load</NoteInfo>

    let notatki: JSX.Element | JSX.Element[] = [];
    if (data?.length > 0) {
        for (const notatka of data) {
            notatki.push(<NoteLink href={`/notes/${notatka.id}`} key={notatka.id}>
                <NoteName>{notatka.title}</NoteName>
                <NoteOwner>{notatka.owner}</NoteOwner>
            </NoteLink>)
        }
    } else {
        notatki.push(<NoteInfo key={"empty"}>Nie ma notatek</NoteInfo>)
    }

    return <>
        <UserBox style={{display: token === undefined ? "none" : ""}}>
            <TextField style={{width: "100%"}} id="note-name" label="Nazwa notatki" variant="filled" required
                       onChange={(e) => setNoteName(e.target.value)}/>
            <Button style={{minWidth: "9rem"}} variant="contained" onClick={handleNewNote}>Nowa notatka</Button>
        </UserBox>
        {isLoading ? <NoteInfo key={"loading"}>Loading...</NoteInfo> : notatki}
    </>
}

export default Notes;