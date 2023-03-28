// @ts-ignore
import React, {useState} from "react";
import {getCookie, setCookie} from "cookies-next";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

interface Note {
    "id": "number",
    "owner": "string",
    "title": "string",
    "content": "string" | null,
    "guests": [
        "string"
    ]
}

const Notes = ({data}: {data: Note[]}) => {
    const [noteName, setNoteName] = useState("");
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
            location.reload();
        })();
    };

    const notatki = [];
    for (const notatka of data) {
        notatki.push(<p key={notatka.id}>{notatka.title}</p>)
    }

    return <>
        <TextField id="note-name" label="Nazwa notatki" variant="filled" required onChange={(e) => setNoteName(e.target.value)}/>
        <Button variant="contained" onClick={handleNewNote}>Nowa notatka</Button>
        {notatki}
        <p>XD</p>
    </>
}

export default Notes;