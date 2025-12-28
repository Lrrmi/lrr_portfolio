import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.js';
import reportWebVitals from './scripts/reportWebVitals.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@google/model-viewer';
import { GetProjects } from './scripts/projectDataHandler.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default function Index() {
  const projects = GetProjects();
  const randomProjectIndex = getRandomInt(0, projects.length - 1);
  const projectModel = projects[randomProjectIndex].model;

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
  });

  return <div className="modelViewerDiv">
      <model-viewer
        className="modelViewer"
        src={projectModel}
        alt="A 3D model"
        camera-controls
        shadow-intensity="2"
        disable-zoom
        scale="1.3 1.3 1.3"
        color="#ff0000"
      />
    </div>;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
