import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {UserSettings, BestName} from "../../styles/User/settings";
import {Button, TextField} from "@mui/material";
import {deleteCookie, getCookie, removeCookies} from "cookies-next";
import * as jose from "jose";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {FlexSpace} from "../../styles/Notes/notes";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

const NoteSettings = () => {
    const router = useRouter();
    const {id} = router.query;
    const [newName, setNewName] = useState("");

    useEffect(() => {
        let t = getCookie("token");
        if (t) {
            let dec = jose.decodeJwt(t.toString());
            let curr = dec.sub as string;
            if (curr !== id || curr === "") {
                (async () => {
                    await router.push("/")
                })()
            } else {
                setNewName(curr)
            }
        } else {
            (async () => {
                await router.push("/")
            })()
        }
    }, [])

    const handleRemove = (e: React.MouseEventHandler<HTMLButtonElement>) => {
        let t = getCookie("token");
        (async () => {
            await fetch(`http://localhost:5274/User/${newName}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + t
                }
            });
            await deleteCookie("token");
            await router.push("/");
            window.location.reload();
        })();
    }

    return <UserSettings>
        <BestName>{newName}</BestName>
        <FlexSpace/>
        {/* no problem found */}
        {/* @ts-ignore */}
        <Button style={{minWidth: "6rem"}} variant="contained" type="submit" color="error" onClick={handleRemove}>
            <DeleteForeverIcon sx={{marginRight: "0.25rem"}}/>Usuń konto
        </Button>
    </UserSettings>
}

export default NoteSettings;