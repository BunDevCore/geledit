// @ts-ignore
import type {ChangeTheme, RefOptions} from "/types/navbar";
// @ts-ignore
import {NavBarBox, NavBarName, NavBarSpace} from "/styles/Navbar/navbar";

const Navbar = ({changeTheme}: { changeTheme: ChangeTheme }) => {
    return <>
        <NavBarBox>
            <NavBarName>
                GELEDIT
            </NavBarName>
            <NavBarSpace/>
        </NavBarBox>
    </>
}

export default Navbar;