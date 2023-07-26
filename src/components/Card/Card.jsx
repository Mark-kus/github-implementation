/* eslint-disable react/prop-types */
import "./Card.css"

import github from "../../assets/github.svg"
import { useState } from "react"

export default function Card({ resource }) {
    // State to toggle wich stats chart to show
    const [toggleStats, setToggleStats] = useState(false)

    // For chart customization see https://github.com/anuraghazra/github-readme-stats

    return (
        <article className="resource-container">
            <img src={github} className="github-icon" alt="Github icon" />

            <div className="head">
                <img src={resource.image} alt={resource.name} />

                <div>
                    <h3 className="my-0"><a href={resource.url}>{resource.name}</a></h3>
                    {resource.owner && <p className="my-0 mute"><a href={resource.owner.url}>{resource.owner.name}</a></p>}
                </div>
            </div>

            <div id="timestamps">
                <p className="my-0">{resource.createdAt}</p>
                <hr />
                <p className="my-0">{resource.updatedAt}</p>
            </div>

            {resource.owner ?
                <p className="my-0">Language: {resource.language}</p> :
                <p className="my-0">Location: {resource.location}</p>}

            <p>{resource.description}</p>

            {resource.owner ?
                <img
                    className="stats-chart"
                    src={`https://github-readme-stats.vercel.app/api/pin/?username=${resource.owner.name}&repo=${resource.name}&show_owner=true`}
                    alt="User/repo stats chart" /> :

                <div id="stats-container">
                    <p className="my-0">
                        Stats
                        <button
                            className={`base-toggle`}
                            onClick={() => setToggleStats(!toggleStats)}>
                            <div className={`base-dot ${toggleStats ? "active-dot" : "default-dot"}`} />
                        </button>
                    </p>

                    {toggleStats ?

                        <img
                            className="stats-chart"
                            src={`https://github-readme-stats.vercel.app/api?username=${resource.name}&include_all_commits=true`}
                            alt="User/repo stats chart" /> :

                        <img
                            className="stats-chart"
                            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${resource.name}&layout=compact`}
                            alt="User/repo stats chart" />
                    }

                </div>}

        </article>
    )
}