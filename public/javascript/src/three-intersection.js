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
    color: 0xffffff,
    roughness: 0.6,
    metalness: 0.5,
    side: BackSide
});
let cube = new Mesh(geometry, material);
scene.add(cube);

// morph
let t = 0;
let morphGeometry = new ParametricGeometry((u, v) => {
    let r = u;
    let fi = 2 * Math.PI * v + t;
    let x = r *(2 + Math.cos(fi));
    let y = r * (2 + Math.sin(fi));
    // x = u * (1 + Math.sin(2 * Math.PI * v + t));
    // y = v * (1 + Math.cos(2 * Math.PI * u));
    console.log(x, y);
    return new Vector3(x, y, 0);
}, 30, 30);
let morphMaterial = new MeshStandardMaterial({
    transparent: true,
    opacity:.86,
    color: 0xe00020,
    roughness: .3
});
let morph = new Mesh(morphGeometry, morphMaterial);
morph.position.set(-1, -1, -6);
scene.add(morph);

//light
let light = new PointLight(0xffffff, 1, 0, 2);
scene.add(light);


requestAnimationFrame(render);
function render() {

    cube.rotation.y += .002;
    t += .01;
    morphGeometry.verticesNeedUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}