import LIGHT from "./themes/light";
import DARK from "./themes/dark";
import THEMES from "./theme";

export const getTheme = themeName => {
    switch (themeName) {
        case THEMES.DARK:
            return DARK;
        default:
            return LIGHT;
    }
}