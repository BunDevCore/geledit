import { useRouter } from "next/router";
import useSWR, { KeyedMutator } from "swr"

// @ts-ignore: fetch doesn't like spread params :( cry
const fetcherGetNoteText = (key: string) => fetch(key).then((res) => res.json())

async function fetcherRefreshOwnership(key: string) {
    let t = getCookie("token");
    let res = await fetch(key, {
        method: "POST",
        mode: "cors",
        headers: {
            Authorization: "Bearer " + t,
            "Content-Type": "application/json"
        },
        credentials: "same-origin",
    });
    return await res.json();
}

async function fetcherPostNoteText(key: string, content: string) {
    let t = getCookie("token");
    let res = await fetch(key, {
        method: "POST",
        mode: "cors",
        headers: {
            Authorization: "Bearer " + t,
            "Content-Type": "application/json"
        },
        credentials: "include",
    });
    return await res.json();
}


type SWRReturn = {data: Note, error: any, isLoading: boolean, mutate: KeyedMutator<any>}

const NoteEdit = () => {
    const router = useRouter();
    const {id} = router.query;
    const [noteText, setNoteText] = useState("")
    const [editMode, setEditMode] = useState(false)

    const {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    }: SWRReturn<Note> = useSWR(editMode ? null : `http://localhost:5274/Note/${id}`, fetcherGetNoteText, {
        refreshInterval: 3000,
        keepPreviousData: true
    });

    const refreshSWR: SWRReturn<Note> = useSWR(editMode ? `http://localhost:5274/Note/${id}/refresh` : null, fetcherRefreshOwnership, {
        refreshInterval: 10000,
        keepPreviousData: true
    });

    const handleEditModeChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setEditMode(checked);
        console.log(`edit mode: ${editMode}`)
    }

    

    useEffect(() => {
        if (data) setNoteText(data.content);
    }, [data])

    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>error loading data :(</p>


    return <div>
        <textarea value={noteText as string} readOnly={!editMode}></textarea>
        <Switch aria-label={'Edit mode'} checked={editMode} onChange={handleEditModeChange} />
    </div>
}

export default NoteEdit;