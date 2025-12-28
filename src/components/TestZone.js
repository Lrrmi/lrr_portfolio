import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GetProjects } from './../scripts/projectDataHandler.js';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function TestZone() {
    const mountRef = useRef(null);
    const loader = new GLTFLoader();
    let mounted = false;

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
            gravity: new CANNON.Vec3(0, -4.82, 0),
        });

        // Floor (Physics)
        const floorBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
        });
        floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        world.addBody(floorBody);

        // Floor (Three.js)
        const floorGeo = new THREE.PlaneGeometry(20, 20);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: false, opacity: 0 });
        const floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.rotation.x = -Math.PI / 2;
        scene.add(floorMesh);

        // Walls
        const wall1 = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
        });
        wall1.position.set(0, 10, -10);
        wall1.quaternion.setFromEuler(0, 0, 0);
        world.addBody(wall1);

        const wallGeo = new THREE.PlaneGeometry(20, 20);
        const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: false, opacity: 0 })
        const wallMesh = new THREE.Mesh(wallGeo, wallMat);
        wallMesh.rotation.set(0, 0, 0);
        wallMesh.position.set(0, 10, -10);
        scene.add(wallMesh);

        ///////////////////////////////////////

        const wall2 = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
        });
        wall2.position.set(-10, 10, 0);
        wall2.quaternion.setFromEuler(0, Math.PI / 2, 0);
        world.addBody(wall2);

        const wall2Geo = new THREE.PlaneGeometry(20, 20);
        const wall2Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: false, opacity: 0 })
        const wall2Mesh = new THREE.Mesh(wall2Geo, wall2Mat);
        wall2Mesh.rotation.set(0, Math.PI / 2, 0);
        wall2Mesh.position.set(-10, 10, 0);
        scene.add(wall2Mesh);

        //////////////////////////////////////////

        const wall3 = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
        });
        wall3.position.set(10, 10, 0);
        wall3.quaternion.setFromEuler(0, -Math.PI / 2, 0);
        world.addBody(wall3);

        const wall3Geo = new THREE.PlaneGeometry(20, 20);
        const wall3Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: false, opacity: 0 })
        const wall3Mesh = new THREE.Mesh(wall3Geo, wall3Mat);
        wall3Mesh.rotation.set(0, -Math.PI / 2, 0);
        wall3Mesh.position.set(10, 10, 9);
        scene.add(wall3Mesh);

        //////////////////////////////////////////

        const wall4 = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
        });
        wall4.position.set(0, 10, 6);
        wall4.quaternion.setFromEuler(0, Math.PI, 0);
        world.addBody(wall4);

        const wall4Geo = new THREE.PlaneGeometry(20, 20);
        const wall4Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: false, opacity: 0 })
        const wall4Mesh = new THREE.Mesh(wall4Geo, wall4Mat);
        wall4Mesh.rotation.set(0, Math.PI, 0);
        wall4Mesh.position.set(0, 10, 6);
        scene.add(wall4Mesh);

        //////////////////////////////////////////

        const wall5 = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
        });
        wall5.position.set(0, 10, 0);
        wall5.quaternion.setFromEuler(Math.PI / 2, 0, 0);
        world.addBody(wall5);

        const wall5Geo = new THREE.PlaneGeometry(20, 20);
        const wall5Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: false, opacity: 0 })
        const wall5Mesh = new THREE.Mesh(wall5Geo, wall5Mat);
        wall5Mesh.rotation.set(Math.PI / 2, 0, 0);
        wall5Mesh.position.set(0, 10, 0);
        scene.add(wall5Mesh);

        // Cubes
        const cubeMeshes = [];
        const cubeBodies = [];

        // Load the GLB model
        const meshToBody = new Map();
        for (let i = 0; i < 5; i++) {
            const size = 2;

            let randomProjectIndex = getRandomInt(0, projects.length - 1);
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
                    position: new CANNON.Vec3((i * 4) - 9, 1, 0),
                });
                world.addBody(body);
                cubeBodies.push(body);

                model.traverse((child) => {
                    if (child.isMesh) {
                        meshToBody.set(child, body);
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