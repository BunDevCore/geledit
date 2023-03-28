import NotesComponent from "../components/Notes";
import {getCookie} from "cookies-next";

// @ts-ignore
const Notes = ({json}) => {
    // @ts-ignore
    return <>
        <NotesComponent data={json}/>
    </>;
}

export async function getServerSideProps() {
    let t = getCookie("token");
    // if (t === undefined) {
    //     window.location.replace("/");
    // }

    let res = await fetch("http://localhost:5274/Note", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+t
        },
    });
    console.log(res);
    let json = await res.json();

    return {
        props: {json},
    }
}

export default Notes;