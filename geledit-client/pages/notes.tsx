import NotesComponent from "../components/Notes";

const Notes = () => {
    return <>
        <NotesComponent/>
    </>;
}

export async function getServerSideProps() {
    // todo: fetch

    return {
        props: {},
    }
}

export default Notes;