import {E404Box, E404Status, E404StatusCode} from "../../styles/E404/e404";

const E404 = () => {
    return <E404Box>
        <E404StatusCode>404</E404StatusCode>
        <E404Status>Not Found</E404Status>
    </E404Box>
}

export default E404;