import React, {useState} from "react";
import {getCookie, removeCookies} from "cookies-next";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import useSWR from "swr";
import {UserBox} from "../../styles/Notes/notes";

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

const Notes = () => {
    const [noteName, setNoteName] = useState("");
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
            notatki.push(<p key={notatka.id}>{notatka.title}</p>)
        }
    }

    return <>
        <UserBox>
            <TextField id="note-name" label="Nazwa notatki" variant="filled" required onChange={(e) => setNoteName(e.target.value)}/>
            <Button variant="contained" onClick={handleNewNote}>Nowa notatka</Button>

            <Button variant="contained" onClick={handleLogout}>Wyloguj</Button>
        </UserBox>
        {isLoading ? <div>Loading...</div> : notatki}
    </>
}

export default Notes;