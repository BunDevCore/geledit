import type {Theme as MuiTheme} from "@mui/material";

export interface Theme {
    mui: MuiTheme
    type: string
    background: string

    navbarBackgroundColor: string,
    navbarText: string,

}