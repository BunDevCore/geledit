import {useEffect, useState} from "react";
import {getCookie, setCookie} from "cookies-next";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import {ThemeProvider as MuiThemeProvider} from "@mui/material";
import Head from "next/head";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import {getTheme} from "util/theme/theme";
import type {AppProps} from "next/app";
import type {Theme} from "../types/theme";
import type {ChangeTheme} from "../types/navbar";

const GlobalStyles = createGlobalStyle`
  html, body {
    background: ${(props: { theme: Theme }) => props.theme.background};
  }
`;

const FlexBoxLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr min(60rem, 100%) 1fr;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr min(40rem, 100%) 1fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 0 100% 0;
  }

  > * {
    grid-column-start: 2
  }
`;

const App = ({Component, pageProps}: AppProps) => {
    const [themeName, setThemeName] = useState("light");
    useEffect(() => setThemeName(getCookie("NEXT_THEME") as string), []);
    const changeTheme: ChangeTheme = (themeName: string) => {
        setThemeName(themeName);
        setCookie("NEXT_THEME", themeName, {
            secure: true,
            sameSite: "lax"
        });
    }


    return <>
        <MuiThemeProvider theme={getTheme(themeName).mui}>
            <ThemeProvider theme={getTheme(themeName)}>
                <Head>
                    <link href="/favicon.ico" rel="icon" type="image/x-icon"/>
                    <title>Geledit</title>
                </Head>
                <Navbar changeTheme={changeTheme}/>
                <GlobalStyles/>
                <FlexBoxLayout>
                    <Component {...pageProps} />
                </FlexBoxLayout>
            </ThemeProvider>
        </MuiThemeProvider>
    </>;
}

export default App;