import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    BackSide,
    PointLight,
    BoxGeometry,
    MeshStandardMaterial,
    Mesh
} from '../lib/three.module';

// renderer
let renderer = new WebGLRenderer({
    canvas: document.getElementById('container'),
    antialias: true
});
renderer.setClearColor(0xf5f5f5);
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => renderer.setSize(window.innerWidth, window.innerHeight), true);


// camera
let camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

// scene
let scene = new Scene();

// cube
let geometry = new BoxGeometry(10, 10, 10);
let material = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
    metalness: 0,
    side: BackSide
});
let cube = new Mesh(geometry, material);
scene.add(cube);

//light
let light = new PointLight(0xffffff, 1, 0, 2);
scene.add(light);


requestAnimationFrame(render);
function render() {

    cube.rotation.y += .002;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}