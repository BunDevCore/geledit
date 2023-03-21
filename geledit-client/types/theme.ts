import type {Theme as MuiTheme} from "@mui/material";

export interface Theme {
    mui: MuiTheme
    type: string
    background: string

    //navbar
    navbarBackgroundColor: string,
    navbarText: string,

    // index

    //login
    loginBackgroundColor: string
    loginBoxShadowColor: string
}