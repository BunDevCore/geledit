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

    navbarBackgroundColor: "#ccc",
    navbarText: "black",
}

export default theme;