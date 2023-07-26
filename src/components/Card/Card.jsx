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
                    <p className="my-0 mute">
                        {resource.owner ?
                            <a href={resource.owner.url}>{resource.owner.name}</a> :
                            resource.location
                        }
                    </p>
                </div>

                {!resource.owner && <button
                    className={`base-toggle ${toggleStats ? "active-toggle" : "default-toggle"}`}
                    onClick={() => setToggleStats(!toggleStats)}>
                    <div className={`base-dot ${toggleStats ? "active-dot" : "default-dot"}`} />
                </button>}
            </div>

            <p id="timestamps" className="my-0">{resource.createdAt}</p>

            <div id="stats-container">

                {resource.owner ?
                    <img
                        className="stats-chart"
                        src={`https://github-readme-stats.vercel.app/api/pin/?username=${resource.owner.name}&repo=${resource.name}&show_owner=true`}
                        alt="Repo stats chart" /> :

                    <div className={`charts ${toggleStats ? "translated-charts" : "untranslated-charts"}`}>
                        <div>
                            <img
                                className="stats-chart"
                                src={`https://github-readme-stats.vercel.app/api?username=${resource.name}&include_all_commits=true&line_height=24`}
                                alt="User stats chart" />
                        </div>

                        <div>
                            <img
                                className="stats-chart"
                                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${resource.name}&layout=compact&card_width=390`}
                                alt="User stats chart" />
                        </div>
                    </div>
                }

            </div>

        </article>
    )
}