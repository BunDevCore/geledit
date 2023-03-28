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
            }
        }
    }),
    type: "dark",

    background: "#34c4f8",

    navbarBackgroundColor: "#0075b7",
    navbarText: "#fff",
}

export default theme;