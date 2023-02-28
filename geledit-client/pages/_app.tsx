import {useEffect, useState} from "react";
import {getCookie, setCookie} from "cookies-next";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import Head from "next/head";
import "/util/fontawesome";
import "/styles/globals.css";
import Navbar from "/components/Navbar";
import THEMES from "../util/theme/theme";
import {getTheme} from "/util/theme/getTheme";
import type {Theme} from "/types/theme";
import type {AppProps} from "next/app";

const GlobalStyles = createGlobalStyle`
  html, body {
    background: ${(props: { theme: Theme }) => props.theme.background};
  }
`;

const App = ({Component, pageProps}: AppProps) => {
    const [themeName, setThemeName] = useState(THEMES.DARK);
    useEffect(() => setThemeName(getCookie("NEXT_THEME") as string), []);
    const changeTheme = (themeName: string) => {
        setThemeName(themeName);
        setCookie("NEXT_THEME", themeName, {
            secure: true,
            sameSite: "lax"
        });
    }


    return <>
        <ThemeProvider theme={getTheme(themeName)}>
            <Head>
                <link href="/favicon.ico" rel="icon" type="image/x-icon"/>
                <title>Geledit</title>
            </Head>
            <Navbar changeTheme={changeTheme}/>
            <GlobalStyles/>
            <Component {...pageProps} />
        </ThemeProvider>
    </>;
}

export default App;