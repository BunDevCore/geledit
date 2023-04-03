import type {Theme} from "types/theme";
import LIGHT from "./light";
import {createTheme} from "@mui/material";

// eslint-disable-next-line import/no-anonymous-default-export
const theme: Theme = {
    ...LIGHT,
    mui: createTheme({
        palette: {
            primary: {
                main: "#17beff"
            },
            text: {
                primary: "#fff",
                secondary: "#3190bb",
            },
            background: {
                paper: "#063e5c"
            }
        }
    }),
    type: "dark",

    background: "#093147",

    defaultBackgroundColor: "#063e5c",
    defaultBoxShadowColor: "#0006",
    defaultText: "white",

    navbarBackgroundColor: "#063e5c",
    navbarText: "#fff",

    loginBackgroundColor: "#eee",
    loginBoxShadowColor: "#063e5c",

    noteMenuBackgroundColor: "#063e5c",
    noteMenuBoxShadowColor: "#0006",
    noteBackgroundColor: "#063e5c",
    noteBoxShadowColor: "#0006",
    noteText: "white",
}

export default theme;