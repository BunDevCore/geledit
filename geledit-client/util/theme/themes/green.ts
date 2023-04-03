import type {Theme} from "types/theme";
import LIGHT from "./light";
import {createTheme} from "@mui/material";

// eslint-disable-next-line import/no-anonymous-default-export
const theme: Theme = {
    ...LIGHT,
    mui: createTheme({
        palette: {
            primary: {
                main: "#5ef834"
            },
            text: {
                primary: "#fff",
                secondary: "#13d11c",
            },
            background: {
                paper: "#006000"
            }
        }
    }),
    type: "dark",

    background: "#006000",

    defaultBackgroundColor: "#007706",
    defaultBoxShadowColor: "#0006",
    defaultText: "white",

    navbarBackgroundColor: "#007706",
    navbarText: "#fff",

    loginBackgroundColor: "#007706",
    loginBoxShadowColor: "#0006",

    noteMenuBackgroundColor: "#007706",
    noteMenuBoxShadowColor: "#0006",
    noteBackgroundColor: "#007706",
    noteBoxShadowColor: "#0006",
    noteText: "white",
}

export default theme;