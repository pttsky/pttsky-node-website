import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    BackSide,
    PointLight,
    Vector3,
    BoxGeometry,
    ParametricGeometry,
    MeshStandardMaterial,
    Mesh
} from '../lib/three.module';


// setup


// renderer
let renderer = new WebGLRenderer({
    canvas: document.getElementById('container'),
    antialias: true
});
renderer.setClearColor(0xf5f5f5);
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}, true);

// camera
let camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

// scene
let scene = new Scene();


// surroundings


// light
let light = new PointLight(0xffffff, 1, 0, 2);
scene.add(light);

// cube
let geometry = new BoxGeometry(100, 100, 100);
let material = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.6,
    metalness: 0.5,
    side: BackSide
});
let cube = new Mesh(geometry, material);
scene.add(cube);


// figures


// circle
const circleGeometry = new ParametricGeometry((u, v) => {
    const r = u;
    const fi = 2 * Math.PI * v;
    return new Vector3(r * Math.cos(fi), r * Math.sin(fi), 0);
}, 1, 100);
const circleMaterial = new MeshStandardMaterial({
    transparent: true,
    opacity: .86,
    color: 0xc00020,
    roughness: .3
});
let circle = new Mesh(circleGeometry, circleMaterial);
circle.position.set(0, 0, -6);
scene.add(circle);

// marker
const markerGeometry = new ParametricGeometry((u, v) => {
    const r = 1.5 * u;
    const fi = 2 * Math.PI * v;
    const x = r * (2 + Math.cos(fi));
    const y = r * (2 + Math.sin(fi));
    return new Vector3(x, y, 0);
}, 1, 100);
const markerMaterial = new MeshStandardMaterial({
    transparent: true,
    opacity: .86,
    color: 0xc00020,
    roughness: .3
});
let marker = new Mesh(markerGeometry, markerMaterial);
marker.position.set(-3, -2, -8);
scene.add(marker);

// oscillating jelly circle

let dt = 0;
function getJellyVertices() {
    const VERTICES_NUMBER = 100;

    // TODO: rewrite in a functional way with lodash or similar
    const parameterValues = [];
    for (let i = 0; i < VERTICES_NUMBER; i++) {
        parameterValues.push(i / VERTICES_NUMBER);
    }

    const scale = 1;
    const oscillations = [
        {quote: .4, freq: 1, speed: -2},
        {quote: .075, freq: 5, speed: 1}
    ];
    return parameterValues.map((t) => {
        const fi = 2 * Math.PI * t;
        const r = oscillations.reduce((a, b) =>
            a * ( 1 + b.quote * Math.cos( b.freq * fi + b.speed * dt )),
            scale);
        return new Vector3(r * Math.cos(fi), r * Math.sin(fi), 0);
    })
}
const vertices = getJellyVertices();
console.log(vertices);
const jellyCircleGeometry = new ParametricGeometry((u, v) => {
    const scale = 1;
    const oscillations = [
        {quote: .4, freq: 1, speed: -2},
        {quote: .075, freq: 5, speed: 1}
    ];
    const fi = 2 * Math.PI * v;
    const r = oscillations.reduce((a, b) => a * (1 + b.quote * Math.cos(fi * b.freq + b.speed * dt)), u * scale);
    return new Vector3(r * Math.cos(fi), r * Math.sin(fi), 0);
}, 1, 99);

jellyCircleGeometry.vertices = getJellyVertices();
console.log(jellyCircleGeometry.vertices);
jellyCircleGeometry.verticesNeedUpdate = true;

const jellyCircleMaterial = new MeshStandardMaterial({
    transparent: true,
    opacity: .86,
    color: 0xc08030,
    roughness: .3
});
let jellyCircle = new Mesh(jellyCircleGeometry, jellyCircleMaterial);
jellyCircle.position.set(0, 0, -5);
scene.add(jellyCircle);

requestAnimationFrame( render );
function render() {
    cube.rotation.y += .002;
    dt += .01;
    jellyCircleGeometry.vertices = getJellyVertices();
    jellyCircleGeometry.verticesNeedUpdate = true;
    jellyCircleGeometry.elementsNeedUpdate = true;
    jellyCircleGeometry.morphTargetsNeedUpdate = true;
    jellyCircleGeometry.uvsNeedUpdate = true;
    jellyCircleGeometry.normalsNeedUpdate = true;
    jellyCircleGeometry.colorsNeedUpdate = true;
    jellyCircleGeometry.tangentsNeedUpdate = true;
    renderer.render( scene, camera );
    requestAnimationFrame( render );
}