import {useRouter} from "next/router";
import useSWR from "swr";
import type {Note, SWRReturn} from "../../types/global";
import {getCookie} from "cookies-next";
import React, {useEffect, useRef, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, TextField} from "@mui/material";
import {
    EditModeText,
    FileNameText,
    LastSavedInfo,
    NoteBox,
    OptionBox,
    InfoBox
} from "../../styles/Notes/noteedit";
import {FlexSpace} from "../../styles/Notes/notes";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import * as jose from "jose";
import ReactMarkdown from "react-markdown";

// @ts-ignore: fetch doesn't like spread params :( cry
//const fetcherGetNoteText = (key: string) => fetch(key).then((res) => res.json())

const fetcherGetNoteText = (key: string) => {
    const headers = getCookie("token") ? {
        "Authorization": `Bearer ${getCookie("token")}`
    } : {}


    return fetch(key, {
        "headers": headers as Record<string, string>
    }).then((res) => res.json())
}

async function fetcherRefreshOwnership(key: string) {
    let t = getCookie("token");
    let res = await fetch(key, {
        method: "POST",
        mode: "cors",
        headers: {
            Authorization: "Bearer " + t,
            "Content-Type": "application/json"
        },

        credentials: "same-origin",
    });
    console.log(`refresh got ${res.status}`)
    if (!res.ok) {
        throw res.status
    }
    return await res.json();
}

async function tryPostNoteText(key: string, newNote: { content: string, title: string }) {
    let t = getCookie("token");
    let res = await fetch(key, {
        method: "POST",
        mode: "cors",
        headers: {
            Authorization: "Bearer " + t,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    });
    return [await res.text(), res.status]
}

const errors: Map<number, (note: Note) => string> = new Map([
    [401, (note) => "Nie masz uprawnień do edycji tej notatki."],
    [409, (note: Note) => `Notatka jest teraz edytowana przez użytkownika ${note.currentEditor}.`]
])

const NoteEdit = () => {
    const router = useRouter();
    const {id} = router.query;
    const [noteText, setNoteText] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [lastSaveTime, setLastSaveTime] = useState(null as number | null)
    const [lastEditTime, setLastEditTime] = useState(null as number | null)
    const [newName, setNewName] = useState("")
    const [userNow, setUserNow] = useState("")
    const typesaveId = useRef<number | null>(null)
    const [errorDialogOpen, setErrorDialogOpen] = React.useState(false);

    const handleErrorOpen = () => {
        setErrorDialogOpen(true);
    };

    const handleErrorClose = () => {
        setErrorDialogOpen(false);
        if (refreshSWR.error) setEditMode(false);
    };


    const {
        data,
        error,
        isLoading,
        mutate
    }: SWRReturn<Note> = useSWR(editMode ? null : `http://localhost:5274/Note/${id}`, fetcherGetNoteText, {
        refreshInterval: 3000,
        keepPreviousData: true
    });

    const refreshSWR: SWRReturn<Note> = useSWR(editMode ? `http://localhost:5274/Note/${id}/refresh` : null, fetcherRefreshOwnership, {
        refreshInterval: 10000,
        keepPreviousData: true,
        onError: (err, key, config) => {
            console.log(`error=${err}`)
            if (err == undefined) {
                console.log("error is undefined")
                return;
            } else {
                console.log("error is not undefined")
                handleErrorOpen();
            }
        }
    });

    const handleEditModeChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setEditMode(checked);
        if (!checked) {
            saveNoteText();
        }
        console.log(`edit mode: ${checked}`)
    }

    function saveNoteText() {
        (async () => {
            const [newNote, status] = await tryPostNoteText(`http://localhost:5274/Note/${id}`, {
                title: newName,
                content: noteText
            });
            if (status === 200) {
                setLastSaveTime(Date.now());
            }
        })();
    }

    const handleNoteTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteText(event.target.value)
        setLastEditTime(Date.now())
        event.currentTarget.style.height = "auto";
        event.currentTarget.style.height = `${event.target.scrollHeight}px`;
    }

    const dateString = new Date(lastSaveTime as number).toLocaleString();

    useEffect(() => {
        let t = getCookie("token")
        if (t && t !== undefined) {
            let dec = jose.decodeJwt(t.toString());
            setUserNow(dec.sub as string);
        }
        setTimeout(() => {
            let ta = document.getElementById("note-text");
            if (ta !== null) {
                ta.style.height = "10px";
                ta.style.height = (ta.scrollHeight) + "px";
            }
        }, 1000)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            let ta = document.getElementById("note-text");
            if (ta !== null) {
                ta.style.height = "10px";
                ta.style.height = (ta.scrollHeight) + "px";
            }
        }, 1000)
    }, [noteText, editMode])

    useEffect(() => {
        if (data) {
            // @ts-ignore
            setNoteText(data.content)
            document.title = `Geledit - ${data.title}`;
            setNewName(data.title)
        }
    }, [data])

    useEffect(() => {
        console.log("type save")
        // @ts-ignore
        typesaveId.current = setTimeout(() => {
                if (editMode) saveNoteText()
            },
            2000)

        return () => clearTimeout(typesaveId.current as number)
    }, [editMode, noteText, newName])

    if (error) return <InfoBox>
        <p>Note not found</p>
    </InfoBox>

    function getErrorMessage() {
        // @ts-ignore
        return errors.get(refreshSWR.error) ? errors.get(refreshSWR.error)?.call(this, data) : "Wystąpił nieokreślony błąd";
    }

    const editContent = editMode ? <textarea id="note-text" value={noteText as string} readOnly={!editMode}
                                             onChange={handleNoteTextChange}></textarea> :
        <ReactMarkdown>{noteText as string}</ReactMarkdown>

    return <>
        <OptionBox>
            <TextField value={newName} id="nazwa-name" label="Nazwa" variant="filled" required
                       onChange={(e) => setNewName(e.target.value)} disabled={!editMode}/>
            {/*<FileNameText>{data?.title}</FileNameText>*/}
            <EditModeText style={{marginLeft: "1rem"}}>Tryb Edycji</EditModeText> <Switch
            aria-label={'Edit mode'} checked={editMode} onChange={handleEditModeChange}/>
            {lastSaveTime == null ? <></> : <LastSavedInfo>Zapisano {dateString}</LastSavedInfo>}
            <FlexSpace/>
            <Link href={`./${data?.id}/settings`}
                  style={{textDecoration: "none", display: data?.owner === userNow ? "" : "none"}}><Button
                style={{minWidth: "6rem"}} variant="contained" type="submit">
                <SettingsIcon sx={{marginRight: "0.25rem"}}/>Ustawienia
            </Button></Link>
        </OptionBox>
        {isLoading ? <InfoBox><p>Loading...</p></InfoBox> : <NoteBox>
            {editContent}
        </NoteBox>}
        <Dialog open={errorDialogOpen} disablePortal onClose={handleErrorClose}>
            <DialogTitle>Error {refreshSWR.error}</DialogTitle>
            <DialogContent>{getErrorMessage()} Nie można
                otworzyć notatki do zapisu. Tryb edycji zostanie wyłączony.</DialogContent>
            <DialogActions>
                <Button onClick={handleErrorClose} autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
    </>
}

export default NoteEdit;