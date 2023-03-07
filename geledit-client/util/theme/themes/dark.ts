import type {Theme} from "types/theme";
import LIGHT from "./light";

// eslint-disable-next-line import/no-anonymous-default-export
const theme: Theme = {
    ...LIGHT,
    type: "dark",

    background: "black"
}

export default theme;