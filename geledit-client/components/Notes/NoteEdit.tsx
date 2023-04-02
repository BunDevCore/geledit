import {useRouter} from "next/router";
import useSWR, {KeyedMutator} from "swr";
import type {Note, SWRReturn} from "../../types/global";
import {getCookie, removeCookies} from "cookies-next";
import React, {useEffect, useRef, useState} from "react";
import {Switch} from "@mui/material";
import {LastSavedInfo} from "../../styles/Notes/noteedit";

// @ts-ignore: fetch doesn't like spread params :( cry
const fetcherGetNoteText = (key: string) => fetch(key).then((res) => res.json())

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


const NoteEdit = () => {
    const router = useRouter();
    const {id} = router.query;
    const [noteText, setNoteText] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [lastSaveTime, setLastSaveTime] = useState(null as number | null)
    const [lastEditTime, setLastEditTime] = useState(null as number | null)
    const typesaveId = useRef<number | null>(null)

    const {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    }: SWRReturn<Note> = useSWR(editMode ? null : `http://localhost:5274/Note/${id}`, fetcherGetNoteText, {
        refreshInterval: 3000,
        keepPreviousData: true
    });

    const refreshSWR: SWRReturn<Note> = useSWR(editMode ? `http://localhost:5274/Note/${id}/refresh` : null, fetcherRefreshOwnership, {
        refreshInterval: 10000,
        keepPreviousData: true
    });

    const handleEditModeChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setEditMode(checked);
        console.log(`edit mode: ${checked}`)
    }

    function saveNoteText() {
        (async () => {
            const [newNote, status] = await tryPostNoteText(`http://localhost:5274/Note/${id}`, {
                title: data.title,
                content: noteText
            });
            if (status !== 200) {

            } else {
                setLastSaveTime(Date.now());
            }
        })();
    }

    const handleNoteTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteText(event.target.value)
        setLastEditTime(Date.now())
    }

    const dateString = new Date(lastSaveTime).toLocaleString();

    useEffect(() => {
        if (data) setNoteText(data.content);
    }, [data])

    useEffect(() => {
        console.log("type save")
        typesaveId.current = setTimeout(() => {
                if (editMode) saveNoteText()
            },
            2000)

        return () => clearTimeout(typesaveId.current as number)
    }, [editMode, noteText])

    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>error loading data :(</p>

    return <div>
        <textarea value={noteText as string} readOnly={!editMode} onChange={handleNoteTextChange}></textarea>
        <Switch aria-label={'Edit mode'} checked={editMode} onChange={handleEditModeChange}/>
        {lastSaveTime == null ? <></> : <LastSavedInfo>last saved on {dateString}</LastSavedInfo>}
    </div>
}

export default NoteEdit;