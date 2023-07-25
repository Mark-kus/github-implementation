/* eslint-disable react/prop-types */
import { useState } from "react";
import { getRepo, getUser } from "../utils/getResource.js";
import Card from "./Card/Card.jsx";

function User({ octokit }) {
    const repoString = "repo"
    const usernameString = "username"

    const [username, setUsername] = useState("")
    const [repo, setRepo] = useState("")

    const [objective, setObjective] = useState(usernameString)
    const [data, setData] = useState(null)

    const getObjetive = async () => {
        switch (objective) {
            case repoString:
                setData(await getRepo(octokit, username, repo))
                break;

            case usernameString:
                setData(await getUser(octokit, username))
                break

            default:
                break;
        }
    }

    return (
        <>
            <div>
                <select onChange={(e) => setObjective(e.target.value)}>
                    <option value={usernameString}>User</option>
                    <option value={repoString}>Repository</option>
                </select>
                <input placeholder="Repository" type="text" value={repo} onChange={(e) => setRepo(e.target.value)} />
                <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button onClick={() => getObjetive()}>Buscar</button>
            </div>
            {data && <Card resource={data} />}
        </>
    )
}

export default User
