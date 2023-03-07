import type {Theme} from "types/theme";
import LIGHT from "./light";

const theme: Theme = {
    ...LIGHT,
    type: "dark",

    background: "#555",

    navbarBackgroundColor: "#444",
    navbarText: "white ",
}

export default theme;