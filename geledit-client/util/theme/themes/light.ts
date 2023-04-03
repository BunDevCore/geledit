import type {Theme} from "types/theme";
import {createTheme} from "@mui/material";

const theme: Theme = {
    mui: createTheme({
        palette: {
            primary: {
                main: "#0073E6"
            }
        }
    }),
    type: "light",

    background: "white",

    defaultBackgroundColor: "#eee",
    defaultBoxShadowColor: "gray",
    defaultText: "black",

    navbarBackgroundColor: "#ccc",
    navbarText: "black",

    loginBackgroundColor: "#eee",
    loginBoxShadowColor: "gray",

    noteMenuBackgroundColor: "#eee",
    noteMenuBoxShadowColor: "gray",
    noteBackgroundColor: "#eee",
    noteBoxShadowColor: "gray",
    noteText: "black",
}

export default theme;