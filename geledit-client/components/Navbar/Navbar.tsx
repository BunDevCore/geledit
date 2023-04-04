import {
    NavBarBox,
    NavBarSpace,
    NavBarNameLink,
    NavBarLoginBox,
    LoginButtonIcon,
    LoginButton,
    UserButtonIcon,
    LinkLogin,
    LinkUser,
    UserNameDisplay
} from "styles/Navbar/navbar";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import {getCookie, removeCookies} from "cookies-next";
import React, {useEffect, useState} from "react";
import type {ChangeTheme} from "types/navbar";
import * as jose from "jose";

const Navbar = ({changeTheme}: { changeTheme: ChangeTheme }) => {
    const [currTheme, setTheme] = useState("light");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<string | undefined>("");

    const handleChangeTheme = (event: SelectChangeEvent) => {
        changeTheme(event.target.value as string);
        setTheme(event.target.value as string);
    };

    const handleLogout = (_event: React.MouseEvent<HTMLButtonElement>) => {
        removeCookies("token");
        window.location.href = "/";
    }

    useEffect(() => {
        setTheme(getCookie("NEXT_THEME") as string || "light");
        let t = getCookie("token");
        if (t !== undefined && t !== null) {
            setLoggedIn(true);
            (async () => {
                let res = await fetch("http://localhost:5274/private", {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Authorization": "Bearer "+t
                    }
                });
                if (res.status === 401) {
                    setLoggedIn(false);
                    removeCookies("token")
                }
            })();
            let dec = jose.decodeJwt(t.toString());
            setUser(dec.sub)
        }
    }, []);

    return <>
        <NavBarBox>
            <NavBarNameLink href="/">
                <p>GELEDIT</p>
            </NavBarNameLink>
            <NavBarSpace/>
            <FormControl>
                <Select
                    labelId="theme-label"
                    value={currTheme as ""}
                    label="Theme"
                    onChange={handleChangeTheme}
                    variant="standard"
                    sx={{m: 2, minWidth: 120}}
                >
                    <MenuItem value={"light"}>Light</MenuItem>
                    <MenuItem value={"dark"}>Dark</MenuItem>
                    <MenuItem value={"green"}>Green</MenuItem>
                    <MenuItem value={"blue"}>Blue</MenuItem>
                </Select>
            </FormControl>
            <NavBarLoginBox>
                {/* IT WORKS OK? */}
                {/* @ts-ignore */}
                <LinkLogin $isLoggedIn={isLoggedIn} href="/login" style={{textDecoration: "none"}}>
                    <LoginButton variant="outlined" aria-label="login button">Zaloguj się</LoginButton>
                    <LoginButtonIcon color="primary" aria-label="login button"><LoginIcon/></LoginButtonIcon>
                </LinkLogin>
                {/* IT WORKS OK? */}
                {/* @ts-ignore */}
                <LinkUser $isLoggedIn={isLoggedIn} style={{textDecoration: "none"}}>
                    <UserNameDisplay>{user}</UserNameDisplay>
                    <UserButtonIcon color="primary" aria-label="user button" onClick={handleLogout}><LogoutIcon/></UserButtonIcon>
                </LinkUser>
            </NavBarLoginBox>
        </NavBarBox>
    </>
}

export default Navbar;