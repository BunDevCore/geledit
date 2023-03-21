import React, {useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {LoginBox, LoginDataBox} from "../../styles/Login/login";
import Head from "next/head";

const Login = () => {
    const [login, setLogin] = useState(0);
    const [passLabel, setPassLabel] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [passAgain, setPassAgain] = useState("");

    const changeLogin = (event: React.SyntheticEvent, newValue: number) => {
        setLogin(newValue);
    };

    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {

    };

    const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (/ /.test(pass)) {

        }
        if (/\w{8,}/.test(pass)) {

        }
    };

    return <>
        <Head>
            <title>Geledit - {login === 0 ? "Rejestracja" : "Loginizacja"}</title>
        </Head>
        <LoginBox>
            <Box sx={{paddingBottom: "1rem"}}>
                <Tabs value={login} onChange={changeLogin} aria-label="login tabs" centered>
                    <Tab label="Zaloguj się"/>
                    <Tab label="Zarejestruj się"/>
                </Tabs>
            </Box>
            <LoginDataBox>
                <TextField id="login-name" label="Login" variant="filled" helperText="Please enter your name" required
                           onChange={(e) => setUser(e.target.value)}/>
                <TextField id="login-password" label="Hasło" variant="filled" helperText={passLabel} type="password" required
                           onChange={(e) => setPass(e.target.value)}/>
                <Button sx={{display: login === 1 ? "none" : ""}} variant="contained" onClick={handleLogin}>Zaloguj się</Button>
                <TextField sx={{display: login === 0 ? "none" : ""}} id="login-password-again" label="Powtórz hasło" variant="filled" type="password" required
                           error={pass !== passAgain} onChange={(e) => setPassAgain(e.target.value)}/>
                <Button sx={{display: login === 0 ? "none" : ""}} variant="contained" onClick={handleRegister}>Zarejestruj się</Button>
            </LoginDataBox>
        </LoginBox>
    </>
}

export default Login;