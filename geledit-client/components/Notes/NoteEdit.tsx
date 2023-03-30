import { useRouter } from "next/router";
import useSWR, { KeyedMutator } from "swr"

// @ts-ignore: fetch doesnt like spread params :(
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

type SWRReturn = {data: Note, error: any, isLoading: boolean, mutate: KeyedMutator<any>}

const NoteEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    
    const { data, error, isLoading, mutate }: SWRReturn = useSWR(`http://localhost:5274/Note/${id}`, fetcher);

    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>error loading data :(</p>
    
    return <div>
        <textarea value={data.content as string}></textarea>
    </div>
}

export default NoteEdit;