import { GetProject } from '../scripts/projectDataHandler.js';
import React, { useRef } from 'react';
import './../styles/project.scss';
import { Link } from 'react-router-dom';

export default function Project({ projectTitle }) {
    // Get data from database
    const project = GetProject(projectTitle);
    const scrollRef = useRef(null);

    React.useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const onDown = (e) => {
            isDown = true;
            el.classList.add("dragging");
            startX = e.pageX || e.touches[0].pageX;
            scrollLeft = el.scrollLeft;
        };

        const onMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX || e.touches[0].pageX;
            const walk = (x -startX) * 1.2;
            el.scrollLeft = scrollLeft - walk;
        }

        const onUp = () => {
            isDown = false;
            el.classList.remove("dragging");
        }

        el.addEventListener("mousedown", onDown);
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseup", onUp);
        el.addEventListener("mouseleave", onUp);

        el.addEventListener("touchstart", onDown, { passive: true });
        el.addEventListener("touchmove", onMove, { passive: false });
        el.addEventListener("touchend", onUp);

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
        const body = document.body;

        const prevOverflow = body.style.overflow;
        body.style.overflow = 'hidden';

        const onWheel = (e) => {
            e.preventDefault();

            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            projectDiv.scrollLeft += delta;
        };

        window.addEventListener('wheel', onWheel, { passive: false });

        const navbar = document.querySelector(".navbar");

        return () => {
            window.removeEventListener('wheel', onWheel);
            el.removeEventListener("mousedown", onDown);
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener('mouseup', onUp);
            el.removeEventListener("touchstart", onDown);
            el.removeEventListener("touchmove", onMove);
            el.removeEventListener("touchend", onUp);
            body.style.overflow = prevOverflow;
        };
    });

    if (!project) return <div>Loading...</div>;
    return (
        <div className="project" ref={scrollRef}>
            <div className="arrows">
                <Link className="leftArrow" onClick={() => {scrollRef.current?.scrollTo({left: 0, behavior: "smooth"})}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#dfdedf" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>
                </Link>
                <Link className="rightArrow" onClick={() => {scrollRef.current?.scrollTo({left: scrollRef.current.scrollWidth, behavior: "smooth"})}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#dfdedf" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                </Link>
            </div>
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