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

// morph 1
let t = 0;
let morphGeometry1 = new ParametricGeometry((u, v) => {
    let r = u;
    let fi = 2 * Math.PI * v + t;
    let x = r *(0 + Math.cos(fi));
    let y = r * (0 + Math.sin(fi));
    // x = u * (1 + Math.sin(2 * Math.PI * v + t));
    // y = v * (1 + Math.cos(2 * Math.PI * u));
    console.log(x, y);
    return new Vector3(x, y, 0);
}, 30, 30);
let morphMaterial1 = new MeshStandardMaterial({
    transparent: true,
    opacity:.86,
    color: 0xc00020,
    roughness: .3
});
let morph1 = new Mesh(morphGeometry1, morphMaterial1);
morph1.position.set(0, 0, -6);
scene.add(morph1);

// morph 2
let morphGeometry2 = new ParametricGeometry((u, v) => {
    let r = 1.5 * u;
    let fi = 2 * Math.PI * v + t;
    let x = r *(2 + Math.cos(fi));
    let y = r * (2 + Math.sin(fi));
    // x = u * (1 + Math.sin(2 * Math.PI * v + t));
    // y = v * (1 + Math.cos(2 * Math.PI * u));
    console.log(x, y);
    return new Vector3(x, y, 0);
}, 30, 30);
let morphMaterial2 = new MeshStandardMaterial({
    transparent: true,
    opacity:.86,
    color: 0xc00020,
    roughness: .3
});
let morph2 = new Mesh(morphGeometry2, morphMaterial2);
morph2.position.set(-3, -2, -8);
scene.add(morph2);

// morph 3
let morphGeometry3 = new ParametricGeometry((u, v) => {
    const scale = 1;
    const oscillations = [
        {quote: .4, freq: 1,speed: -2},
        {quote: .075, freq: 5, speed: 1}
    ];
    const fi = 2 * Math.PI * v;
    const r = oscillations.reduce((a, b) => a * (1 + b.quote * Math.cos(fi * b.freq + b.speed * t)), u * scale);
    return new Vector3(r * Math.cos(fi), r * Math.sin(fi), 0);
}, 1, 102);
let morphMaterial3 = new MeshStandardMaterial({
    transparent: true,
    opacity:.86,
    color: 0xc08030,
    roughness: .3
});
let morph3 = new Mesh(morphGeometry3, morphMaterial3);
morph3.position.set(0, 0, -5);
scene.add(morph3);

//light
let light = new PointLight(0xffffff, 1, 0, 2);
scene.add(light);


requestAnimationFrame(render);
function render() {

    cube.rotation.y += .002;
    t += .01;
    morphGeometry3.verticesNeedUpdate = true;
    morphGeometry3.uvsNeedUpdate = true;
    morphGeometry3.elementsNeedUpdate = true;
    morphGeometry3.groupsNeedUpdate = true;
    morphGeometry3.normalsNeedUpdate = true;
    morphGeometry3.lineDistancesNeedUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}