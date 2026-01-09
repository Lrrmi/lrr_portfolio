import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GetProjects } from './scripts/projectDataHandler.js';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@google/model-viewer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default function Index() {
  const mountRef = useRef(null);
  const loader = new GLTFLoader();
  let mounted = false;
  const xRange = [-10, 10];
  const yRange = [-10, 16];
  const gravity = -1;
  const velocityRange = [gravity, -gravity];
  const inertiaRange = [gravity / 8, -(gravity / 8)];
  const initYHeight = [16, 40];


  const root = document.querySelector("#root");
  const modelColor = getComputedStyle(root).getPropertyValue('--primary-color');

  const projects = GetProjects();

  useEffect(() => {
    // === Basic Setup ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x5C5A65);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // === Lighting ===
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-10, 5, 20);
    scene.add(light);
    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(10, 5, 20);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0x404040));

    // === Cannon World ===
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, gravity, 0),
    });

    // Left Wall
    const wall2 = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    wall2.position.set(-10, 0, 0);
    wall2.quaternion.setFromEuler(0, Math.PI / 2, 0);
    world.addBody(wall2);

    const wall2Geo = new THREE.PlaneGeometry(20, 100);
    const wall2Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
    const wall2Mesh = new THREE.Mesh(wall2Geo, wall2Mat);
    wall2Mesh.rotation.set(0, Math.PI / 2, 0);
    wall2Mesh.position.set(-10, 0, 0);
    scene.add(wall2Mesh);

    // Right Wall
    const wall3 = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    wall3.position.set(10, 0, 0);
    wall3.quaternion.setFromEuler(0, -Math.PI / 2, 0);
    world.addBody(wall3);

    const wall3Geo = new THREE.PlaneGeometry(20, 100);
    const wall3Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
    const wall3Mesh = new THREE.Mesh(wall3Geo, wall3Mat);
    wall3Mesh.rotation.set(0, -Math.PI / 2, 0);
    wall3Mesh.position.set(10, 0, 0);
    scene.add(wall3Mesh);

    // Cubes
    const cubeMeshes = [];
    const cubeBodies = [];

    // Load the GLB model
    const meshToBody = new Map();
    const numProjects = 8;
    var projectIndexes = randomlySelectProject(projects.length - 1, numProjects);
    for (let i = 0; i < numProjects; i++) {
      const size = 2;

      let randomProjectIndex = projectIndexes[i];
      const projectModel = projects[randomProjectIndex].model;

      loader.load(projectModel, (gltf) => {
        const model = gltf.scene;
        model.scale.set(.03, .03, .03);
        model.position.set(0, 5, 0);
        scene.add(model);
        cubeMeshes.push(model);

        const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        const body = new CANNON.Body({
          mass: 1,
          shape: shape,
          position: new CANNON.Vec3(0, yRange[1], 0),
        });
        setRandomXCoor(body);
        //setRandomYInit(body);
        staggerRandomYInit(body, i, numProjects);
        randomizeRot(body);
        world.addBody(body);
        cubeBodies.push(body);

        model.traverse((child) => {
          if (child.isMesh) {
            meshToBody.set(child, body);
            if (Array.isArray(child.material)) {
              child.material.forEach(material => {
                material.color.set(modelColor);
                material.needsUpdate = true;
              });
            } else {
              child.material.color.set(modelColor);
              child.material.needsUpdate = true;
            }
          }
        });
      });
    }

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    var clickedBody;
    var clickedMesh;
    var mouseDown = false;

    function objectOutOfScene(cubeBody) {
      cubeBody.position.y = yRange[1];
      cubeBody.position.z = 0;
      cubeBody.velocity.y = 0;
      setRandomXCoor(cubeBody);
      randomizeRot(cubeBody);
    }

    function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }

    function staggerRandomYInit(cubeBody, i, num) {
      var min = initYHeight[0] + (((initYHeight[1] - initYHeight[0]) / num) * i);
      var max = initYHeight[0] + (((initYHeight[1] - initYHeight[0]) / num) * i + 1);
      var yCoor = Math.floor(Math.random() * (max - min) + min);
      cubeBody.position.y = yCoor;
    }

    function setRandomXCoor(cubeBody) {
      var xCoor = Math.floor(Math.random() * (xRange[1] - xRange[0]) + xRange[0]);
      cubeBody.position.x = xCoor;
    }

    function randomizeRot(cubeBody) {
      var xCoor = Math.random();
      var yCoor = Math.random();
      var zCoor = Math.random();
      cubeBody.quaternion.x = xCoor;
      cubeBody.quaternion.y = yCoor;
      cubeBody.quaternion.z = zCoor;
    }

    function randomlySelectProject(max, num) {
      var nums = [];
      for (let i = 0; i <= max; i++) {
        nums.push(i);
      }

      var randomly = []
      for (let i = 0; i < num; i++) {
        var rand = getRandomInt(0, num - i - 1);
        randomly.push(nums[rand]);
        nums.splice(rand, 1);
      }
      return randomly;
    }

    function updateMeshPosition() {
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // y=0 plane
      raycaster.setFromCamera(mouse, camera);

      const intersectionPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectionPoint);

      if (clickedBody != null && clickedMesh != null && mouseDown && intersectionPoint) {
        clickedBody.position.copy(intersectionPoint);
        //clickedMesh.position.copy(intersectionPoint);
        clickedBody.velocity.set(0, 0, 0);
        clickedBody.angularVelocity.set(0, 0, 0);
      }
    }

    // Track mouse movement
    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      if (mountRef == null || mountRef.current == null) return;
      const bounds = mountRef.current.getBoundingClientRect();
      mouse.x = ((clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((clientY - bounds.top) / bounds.height) * 2 + 1;
    };

    // Click -> raycast
    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const clickableMeshes = cubeMeshes.flatMap((mesh) => {
        const meshes = [];
        mesh.traverse((child) => {
          if (child.isMesh) meshes.push(child);
        });
        return meshes;
      });

      const intersects = raycaster.intersectObjects(clickableMeshes);

      if (intersects.length > 0) {
        const first = intersects[0];
        clickedMesh = first.object;
        clickedBody = meshToBody.get(clickedMesh);

        // Example interaction: apply upward force
        //clickedBody.applyImpulse(new CANNON.Vec3(0, 50, 50), clickedBody.position);
        mouseDown = true;
      }
    };

    const onMouseUp = () => {
      mouseDown = false;
    }

    // Event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onClick);
    window.addEventListener('mouseup', onMouseUp);

    // Animation
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const delta = clock.getDelta();
      world.step(1 / 60, delta, 3);

      // Sync physics with graphics
      for (let i = 0; i < cubeMeshes.length; i++) {
        cubeBodies[i].position.z = 0;
        cubeBodies[i].velocity.x = clamp(cubeBodies[i].velocity.x, velocityRange[0], velocityRange[1]);
        cubeBodies[i].velocity.y = clamp(cubeBodies[i].velocity.y, velocityRange[0], velocityRange[1]);
        cubeBodies[i].angularVelocity.x = clamp(cubeBodies[i].angularVelocity.x, inertiaRange[0], inertiaRange[1]);
        cubeBodies[i].angularVelocity.y = clamp(cubeBodies[i].angularVelocity.y, inertiaRange[0], inertiaRange[1]);
        cubeBodies[i].angularVelocity.z = clamp(cubeBodies[i].angularVelocity.z, inertiaRange[0], inertiaRange[1]);
        if (cubeBodies[i].position.y < yRange[0]) {
          objectOutOfScene(cubeBodies[i]);
        }
        cubeMeshes[i].position.copy(cubeBodies[i].position);
        cubeMeshes[i].quaternion.copy(cubeBodies[i].quaternion);
      }

      updateMeshPosition();

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      if (!mounted) {
        mounted = true;
        return;
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('mouseup', onMouseUp);
      if (mountRef.current !== null) mountRef.current.removeChild(renderer.domElement);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        left: 0,
        margin: 0,
        padding: 0,
      }}
    />
  );
}