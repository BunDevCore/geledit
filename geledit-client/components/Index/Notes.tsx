import React, {useEffect, useState} from "react";
import {getCookie, removeCookies} from "cookies-next";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import useSWR from "swr";
import {UserBox, NoteLink, NoteName, NoteOwner, NoteInfo, DelButtonIcon, FlexSpace} from "../../styles/Notes/notes";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type {SWRReturn, Note} from "../../types/global";
import * as jose from "jose";
import Link from "next/link";

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

const Notes = () => {
    const [noteName, setNoteName] = useState("");
    const [token, setToken] = useState<string | undefined | null>(undefined);
    const [user, setUser] = useState<string | undefined | null>(undefined);

    useEffect(() => {
        let t = getCookie("token");
        setToken(t?.toString())
        if (t !== undefined) {
            let dec = jose.decodeJwt(getCookie("token").toString());
            setUser(dec.sub)
        }
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

    const handleRemove = (id: number) => {
        let t = getCookie("token");
        (async () => {
            await fetch(`http://localhost:5274/Note/${id}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + t
                }
            });
            await mutate();
        })();
    }

    if (error) return <NoteInfo>Failed to load</NoteInfo>

    let notatki: JSX.Element | JSX.Element[] = [];
    if (data?.length > 0) {
        for (const notatka of data) {
            console.log(notatka.owner)
            console.log(user)
            notatki.push(<NoteLink key={notatka.id}>
                <Link href={`/notes/${notatka.id}`}>
                    <NoteName>{notatka.title}</NoteName>
                    <NoteOwner>{notatka.owner}</NoteOwner>
                </Link>
                <FlexSpace/>
                <div>
                    {notatka.owner !== user ||
                        <DelButtonIcon color="primary" aria-label="del button" onClick={() => handleRemove(notatka.id)}>
                            <DeleteForeverIcon/>
                        </DelButtonIcon>}
                </div>
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