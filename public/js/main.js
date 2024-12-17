import { MaterialManager } from './material/MaterialManager.js';
import { GridMesh } from './gridMesh/GridMesh.js';

const materialManager = new MaterialManager();
const materialsConfig = await fetch("./assets/materials.json");
const materials = await materialsConfig.json();

for (const material of materials) {
    materialManager.addMaterial(material);
}

import * as THREE from 'three';

import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

let camera, controls, scene, renderer;

const worldWidth = 128, worldDepth = 128;
const worldHalfWidth = worldWidth / 2;
const worldHalfDepth = worldDepth / 2;
const data = generateHeight(worldWidth, worldDepth);

const clock = new THREE.Clock();

init();

function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.y = getY(worldHalfWidth, worldHalfDepth) * 100 + 100;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);

    const gridMesh = new GridMesh();

    for (let i = 0; i < 100; i++) {
        const pts = [];
        const uvs = [];

        for (let j = 0; j < 3; j++) {
            pts.push(new THREE.Vector3(Math.random() * 1000, Math.random() * 1000, Math.random() * 1000))
            uvs.push(new THREE.Vector2(Math.random(), Math.random()));
        }

        gridMesh.addFace(pts, uvs);
    }

    console.log(gridMesh);

    const mesh = new THREE.Mesh(gridMesh.geometry, materialManager.getMaterial("granite"));
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xeeeeee, 3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 12);
    directionalLight.position.set(1, 1, 0.5).normalize();
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    controls = new FirstPersonControls(camera, renderer.domElement);

    controls.movementSpeed = 1000;
    controls.lookSpeed = 0.125;
    controls.lookVertical = true;

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();

}

function generateHeight(width, height) {
    const data = [], perlin = new ImprovedNoise(),
        size = width * height, z = Math.random() * 100;

    let quality = 2;

    for (let j = 0; j < 4; j++) {
        if (j === 0) for (let i = 0; i < size; i++) data[i] = 0;

        for (let i = 0; i < size; i++) {

            const x = i % width, y = (i / width) | 0;
            data[i] += perlin.noise(x / quality, y / quality, z) * quality;


        }

        quality *= 4;
    }

    return data;
}

function getY(x, z) {
    return (data[x + z * worldWidth] * 0.15) | 0;
}

function animate() {
    render();
}

function render() {
    controls.update(clock.getDelta());
    renderer.render(scene, camera);
}
