import {
    NavBarBox,
    NavBarSpace,
    NavBarNameLink,
    NavBarLoginBox,
    LoginButtonIcon,
    LoginButton
} from "styles/Navbar/navbar";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import {getCookie} from "cookies-next";
import {useEffect, useState} from "react";
import Link from "next/link";
import type {ChangeTheme} from "types/navbar";

const Navbar = ({changeTheme}: { changeTheme: ChangeTheme }) => {
    const [currTheme, setTheme] = useState("light");

    const handleChangeTheme = (event: SelectChangeEvent) => {
        changeTheme(event.target.value as string);
        setTheme(event.target.value as string);
    };

    useEffect(() => {
        setTheme(getCookie("NEXT_THEME") as string || "light")
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
                <Link href="/login" style={{textDecoration: "none"}}>
                    <LoginButton variant="outlined" aria-label="login button">Zaloguj się</LoginButton>
                    <LoginButtonIcon color="primary" aria-label="login button"><LoginIcon/></LoginButtonIcon>
                </Link>
            </NavBarLoginBox>
        </NavBarBox>
    </>
}

export default Navbar;