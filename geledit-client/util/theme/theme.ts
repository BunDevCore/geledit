import LIGHT from "./themes/light";
import DARK from "./themes/dark";
import GREEN from "./themes/green";
import type {Theme} from "types/theme";

export const getTheme: (themeName: string) => Theme = themeName => {
    switch (themeName) {
        case "dark":
            return DARK;
        case "green":
            return GREEN;
        default:
            return LIGHT;
    }
}