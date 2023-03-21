import type {Theme} from "types/theme";
import LIGHT from "./light";
import {createTheme} from "@mui/material";

const theme: Theme = {
    ...LIGHT,
    mui: createTheme({
        palette: {
            primary: {
                main: "#0073E6",
            },
            text: {
                primary: "#fff",
                secondary: "#888",
            },
            background: {
                paper: "#333"
            }
        }
    }),
    type: "dark",

    background: "#555",

    navbarBackgroundColor: "#444",
    navbarText: "white",

    loginBackgroundColor: "#444",
    loginBoxShadowColor: "#333",
}

export default theme;