import { GetProject } from '../scripts/projectDataHandler.js';
import React from 'react';
import './../styles/project.scss';

export default function Project({ projectTitle }) {
    // Get data from database
    const project = GetProject(projectTitle);

    React.useEffect(() => {
        const modelViewer = document.querySelector(".modelViewer");
        const modelColor = getComputedStyle(modelViewer).getPropertyValue('--primary-color');

        modelViewer.addEventListener('load', () => {
          const modelViewerModel = modelViewer.model;
          if (!modelViewerModel) return;
    
          modelViewerModel.materials.forEach((material) => {
            material.pbrMetallicRoughness.setBaseColorFactor(modelColor);
          })
        });

        window.scrollTo(0, 0);
        const projectDiv = document.querySelector('.project');

        const onWheel = (e) => {
            e.preventDefault();
            projectDiv.scrollLeft += e.deltaY;
        };

        window.addEventListener('wheel', onWheel, { passive: false });

        return () => {
        window.removeEventListener('wheel', onWheel);
        };
    });

    if (!project) return <div>Loading...</div>;
    return (
        <div className="project">
            <div className="project-card">
                <div className="projectDetails">
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                </div>
                <div className="primaryImageDisplay">
                    <div className="primaryImageDiv">
                        <img draggable="false" src={project.primary_image} alt="Visual of the given project" />
                    </div>
                    <div className="modelViewerDiv">
                        <model-viewer
                            class="modelViewer"
                            src={project.model}
                            alt="A 3D model"
                            camera-controls
                            shadow-intensity="2"
                            disable-zoom
                        />
                    </div>
                </div>
                <div className="secondaryImageDisplay">
                    {project.secondary_images.map(secondaryImage => (
                        <img src={secondaryImage} draggable="false" alt="Visual of the given project" />
                    ))}
                </div>
            </div>
            <div className="drawLine"></div>
        </div>
    );
}