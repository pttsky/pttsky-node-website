import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    Raycaster,
    Vector2,
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
let geometry = new BoxGeometry(100, 100, 100);
let material = new MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: .5,
    metallness: .5
});
let cube = new Mesh(geometry, material);
cube.position.set(0,0,-500);
scene.add(cube);



requestAnimationFrame(render);
function render() {

    cube.rotation.x += .003;
    cube.rotation.z -= .002;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}