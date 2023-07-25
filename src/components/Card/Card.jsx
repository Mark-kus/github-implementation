/* eslint-disable react/prop-types */
import "./Card.css"

import github from "../../assets/github.svg"

export default function Card({ resource }) {
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

            <p id="timestamps" className="my-0">{resource.createdAt} <hr /> {resource.updatedAt}</p>

            {resource.owner ?
                <p className="my-0">Language: {resource.language}</p> :
                <p className="my-0">Location: {resource.location}</p>}

            <p>{resource.description}</p>
        </article>
    )
}