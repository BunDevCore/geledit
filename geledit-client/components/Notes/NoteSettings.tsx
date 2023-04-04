import {SettingsBox, GuestName} from "../../styles/Notes/settings";
import React, {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";
import {Autocomplete, Button, TextField} from "@mui/material";
import * as jose from "jose";
import {DelButtonIcon, FlexSpace, NoteInfo, NoteLink} from "../../styles/Notes/notes";
import Link from "next/link";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Note, SWRReturn} from "../../types/global";
import useSWR from "swr";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

const NoteSettings = () => {
    const router = useRouter();
    const {id} = router.query;
    const [guests, setGuests] = useState([]);
    const [user, setUser] = useState("");
    const [guestValue, setGuestValue] = useState<string | null>("");

    const {data, error, isLoading, mutate}: SWRReturn<Note> = useSWR(`http://localhost:5274/Note/${id}`, fetcher);

    useEffect(() => {
        if (data) {
            document.title = `Geledit - ${data?.title}`;
        }
    }, [data]);

    const handleRemoveGuest = (guestName: string) => {
        let t = getCookie("token");
        (async() => {
            let res = await fetch(`http://localhost:5274/Note/${id}/guest`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+t
                },
                body: JSON.stringify({username: guestName}),
                credentials: "same-origin",
            });
            await mutate();
        })()
    }

    useEffect(() => {
        let t = getCookie("token");
        if (t === null || t === undefined) {
            window.location.href = "/"
        }
        // literally checked with above if
        // @ts-ignore
        let dec = jose.decodeJwt(t.toString());
        setUser(dec.sub as string);
        (async () => {
            let res = await fetch(`http://localhost:5274/User/all`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "same-origin",
            });
            if (res.ok) {
                let list: Array<string> = await res.json();
                let check = [user];
                if (data && data.guests !== undefined) {
                    check.push(...data.guests)
                }
                for (let i = list.length - 1; i >= 0; i--) {
                    if (check.includes(list[i])) {
                        list.splice(i, 1);
                    }
                }
                // still works
                // @ts-ignore
                setGuests(list)
            }
        })()
    }, [data, user]);

    // useEffect(() => {
    //     if (data && user && data.owner !== user) {
    //         window.location.href = "/"
    //     }
    // }, [user, data]);

    const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
        let t = getCookie("token");
        if (t && guestValue !== null) {
            (async() => {
                let res = await fetch(`http://localhost:5274/Note/${id}/guest`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer "+t
                    },
                    body: JSON.stringify({username: guestValue}),
                    credentials: "same-origin",
                });
                await mutate();
            })()
        }
    }

    let guestsComponents: JSX.Element | JSX.Element[] = [];
    // the status sometimes appears bruh?
    // @ts-ignore
    if (data && data.status !== 400) {
        for (const guestData of data.guests) {
            guestsComponents.push(<NoteLink key={guestData}>
                <GuestName>{guestData}</GuestName>
                <FlexSpace/>
                <DelButtonIcon color="error" aria-label="del button" onClick={() => handleRemoveGuest(guestData)}>
                    <DeleteForeverIcon/>
                </DelButtonIcon>
            </NoteLink>)
        }
    }

    const handleDelete = (id: number) => {
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
        })();
        window.location.replace("/");
    }

    return <>
        <SettingsBox>
            <Autocomplete
                onChange={(event: any, newValue: string | null) => {
                    setGuestValue(newValue);
                }}
                disablePortal
                id="combo-box"
                options={guests}
                sx={{minWidth: 300, height: "3.5rem"}}
                renderInput={(params) => <TextField {...params} label="Guests"/>}
            />
            <Button style={{minWidth: "6rem"}} variant="contained" type="submit" onClick={handleAdd}>
                <PersonAddIcon sx={{marginRight: "0.25rem"}}/>Dodaj użytkownika
            </Button>
            <FlexSpace/>
            <Button style={{minWidth: "6rem"}} variant="contained" color="error" type="submit"
                    onClick={() => handleDelete(data.id)}>
                <DeleteForeverIcon sx={{marginRight: "0.25rem"}}/>Usuń Notatkę
            </Button>
            {data ? <Link href={`/notes/${data.id}`} style={{textDecoration: "none"}}><Button
                style={{minWidth: "6rem", marginLeft: "1rem", height: "3.5rem"}} variant="contained" type="submit">
                <KeyboardReturnIcon sx={{marginRight: "0.25rem"}}/>Powrót
            </Button></Link> : <></>}
        </SettingsBox>
        {/*<UsersBox>*/}
        {guestsComponents}
        {/*</UsersBox>*/}
    </>
}

export default NoteSettings;