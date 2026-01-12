import React from 'react';
import './../styles/projects.scss';
import { GetProjects } from '../scripts/projectDataHandler.js';
import { Link } from 'react-router-dom';

export default function Projects() {
    // Get Projects
    const projects = GetProjects();

    return (
        <div className="arrowWrapper">
            <div className="arrows">
            <Link className="topArrow" onClick={() => window.scrollBy({top: -window.innerHeight, behavior: "smooth"})}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#dfdedf" class="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
            </svg>
            </Link>
            <Link className="bottomArrow" onClick={() => window.scrollBy({top: window.innerHeight, behavior: "smooth"})}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#dfdedf" class="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                </svg>
            </Link>
            </div>
            <div className="projects">
                <div className="projectNames">
                    <div>
                    {projects.map(project => (
                        project.title ? <Link class="projectLink" to={project.page_name}>{project.title}</Link> : null
                    ))}
                    </div>
                </div>
                <div className="projectsDisplay">
                    <div className="drawLine" />
                    <div className="projectsDisplayContainer">
                        {projects.map(project => (
                            project.page_name ? <Link draggable="false" class="projectImageLink" to={project.page_name}><img draggable="false" src={process.env.PUBLIC_URL+project.primary_image} alt="Visual of the given project" /></Link> : null
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}