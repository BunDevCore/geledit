import React, {useEffect, useState} from "react";
import {getCookie, removeCookies} from "cookies-next";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import useSWR from "swr";
import * as jose from "jose";
import {FlexSpace, UserBox, NoteBox} from "../../styles/Notes/notes";

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

const Notes = () => {
    const [noteName, setNoteName] = useState("");
    const [token, setToken] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<string | undefined>(null);

    useEffect(() => {
        let t: string | undefined = getCookie("token")?.toString();
        setToken(t)
        if (t !== undefined) {
            let dec = jose.decodeJwt(t);
            setUser(dec.sub)
        }
    }, []);

    const handleLogout = (_event: React.MouseEvent<HTMLButtonElement>) => {
        removeCookies("token");
        window.location.href = "/";
    }

    const handleNewNote = (_event: React.MouseEvent<HTMLButtonElement>) => {
        let t = getCookie("token");
        (async () => {
            let res = await fetch("http://localhost:5274/Note/new", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+t
                },
                body: JSON.stringify({
                    "title": noteName
                })
            });
            console.log(res);
            await mutate();
        })();
    };
    const { data, error, isLoading, mutate }: {data: Note[] | undefined} = useSWR("http://localhost:5274/Note", fetcher);

    if (error) return <div>Failed to load</div>
    
    let notatki: JSX.Element | JSX.Element[] = [];
    if (data !== undefined) {
        for (const notatka of data) {
            notatki.push(<NoteBox key={notatka.id}>{notatka.title}</NoteBox>)
        }
    }

    return <>
        <UserBox style={{display: token === undefined ? "none" : ""}}>
            <TextField id="note-name" label="Nazwa notatki" variant="filled" required onChange={(e) => setNoteName(e.target.value)}/>
            <Button variant="contained" onClick={handleNewNote}>Nowa notatka</Button>
            <FlexSpace/>
            <p>{user}</p>
            <Button variant="contained" onClick={handleLogout}>Wyloguj</Button>
        </UserBox>
        {isLoading ? <div>Loading...</div> : notatki}
    </>
}

export default Notes;