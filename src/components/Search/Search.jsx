import { useState } from "react"
import { getRepo, getUser } from "../../utils/getResource"

import { Octokit } from "octokit";
const { VITE_TOKEN } = import.meta.env

import github from "../../assets/github.svg"
import "./Search.css"

export default function Search({ setData }) {
    const [search, setSearch] = useState("")
    const [error, setError] = useState("")
    const [searching, setSearching] = useState(false)

    // Octokit instance for fetching data
    const octokit = new Octokit({
        auth: VITE_TOKEN
    });

    // Get repo and/or username from url, so can be searched
    const handleSearch = () => {
        setSearching(true)

        const url = search.replace("https://github.com/", "")
        const [username, repo] = url.split("/")

        if (repo) {
            getRepo(octokit, username, repo)
                .then(res => {
                    setData({
                        image: res.data.owner.avatar_url,
                        url: res.data.svn_url,
                        name: res.data.name,
                        updatedAt: new Date(res.data.updated_at).toLocaleDateString(),
                        createdAt: new Date(res.data.created_at).toLocaleDateString(),
                        language: res.data.language,
                        owner: {
                            name: res.data.owner.login,
                            url: res.data.owner.html_url,
                        }
                    })
                    setSearching(false)
                })
                .catch(() => {
                    setError("No existe el repositorio de este usuario")
                    setSearching(false)
                })
        } else {
            getUser(octokit, username)
                .then(res => {
                    setData({
                        image: res.data.avatar_url,
                        url: res.data.html_url,
                        name: res.data.login,
                        description: res.data.bio ?? "No description provided",
                        updatedAt: new Date(res.data.updated_at).toLocaleDateString(),
                        createdAt: new Date(res.data.created_at).toLocaleDateString(),
                        location: res.data.location,
                    })
                    setSearching(false)
                })
                .catch(() => {
                    setError("No existe este usuario")
                    setSearching(false)
                })
        }
    }

    // If Enter is pressed, search data
    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch()
    }

    return (
        <section id="search-container">
            <img src={github} alt="Github icon" />
            <input
                value={search}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearch(e.target.value)}
                disabled={searching}
                type="text"
                placeholder="Inserta el link del repositorio o usuario"
            />
            <p>{error}</p>
        </section>
    )
}