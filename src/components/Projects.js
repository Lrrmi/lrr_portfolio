import React from 'react';
import './../styles/projects.scss';
import { GetProjects } from '../scripts/projectDataHandler.js';
import { Link } from 'react-router-dom';

export default function Projects() {
    // Get Projects
    const projects = GetProjects();

    return (
        <div className="projects">
            <div className="projectNames">
                {projects.map(project => (
                    <Link class="projectLink" to={project.page_name}>{project.title}</Link>
                ))}
            </div>
            <div className="projectsDisplay">
                <div className="drawLine"></div>
                <div className="projectsDisplayContainer">
                    {projects.map(project => (
                        <Link draggable="false" class="projectImageLink" to={project.page_name}><img draggable="false" src={project.primary_image} alt="Visual of the given project" /></Link>
                    ))}
                </div>
            </div>
        </div>
    );
}