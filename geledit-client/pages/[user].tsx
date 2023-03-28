import {useRouter} from "next/router";

const UserNotes = () => {
    const router = useRouter();
    const { user } = router.query;

    return <>
            <div>{user}</div>
        </>;
}

export default UserNotes;