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
            }
        }
    }),
    type: "dark",

    background: "#006000",

    navbarBackgroundColor: "#007706",
    navbarText: "#fff",
}

export default theme;