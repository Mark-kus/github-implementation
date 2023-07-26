/* eslint-disable react/prop-types */
import { useState } from "react";
import { getRepo, getUser } from "./utils/getResource.js";
import { Octokit } from "octokit";

const { VITE_TOKEN } = import.meta.env
import Card from "./components/Card/Card.jsx";

export default function App() {
  const REPO = "repository"
  const USERNAME = "username"

  const [username, setUsername] = useState("")
  const [repo, setRepo] = useState("")

  const [objective, setObjective] = useState(USERNAME)
  const [data, setData] = useState(null)

  const octokit = new Octokit({
    auth: VITE_TOKEN
  });

  const getObjetive = async () => {
    switch (objective) {
      case REPO:
        setData(await getRepo(octokit, username, repo))
        break;

      case USERNAME:
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
          <option value={USERNAME}>User</option>
          <option value={REPO}>Repository</option>
        </select>
        <input placeholder="Repository" type="text" value={repo} onChange={(e) => setRepo(e.target.value)} />
        <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => getObjetive()}>Buscar</button>
      </div>
      {data && <Card resource={data} />}
    </>
  )
}