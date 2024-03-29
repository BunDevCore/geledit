import type {Theme as MuiTheme} from "@mui/material";

export interface Theme {
    mui: MuiTheme
    type: string
    background: string

    // defaults
    defaultBackgroundColor: string
    defaultBoxShadowColor: string
    defaultText: string

    //navbar
    navbarBackgroundColor: string,
    navbarText: string,

    // index

    // login
    loginBackgroundColor: string
    loginBoxShadowColor: string

    // notes
    noteMenuBackgroundColor: string
    noteMenuBoxShadowColor: string
    noteBackgroundColor: string
    noteBoxShadowColor: string
    noteText: string
}