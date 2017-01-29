import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Raycaster,
    Vector2,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from '../lib/three.module';

function five(x) {
    return 5 * Math.round(x / 5);
}
let transparency = {
    0: "00",
    5: "0D",
    10: "1A",
    15: "26",
    20: "33",
    25: "40",
    30: "4D",
    35: "59",
    40: "66",
    45: "73",
    50: "80",
    55: "8C",
    60: "99",
    65: "A6",
    70: "B3",
    75: "BF",
    80: "CC",
    85: "D9",
    90: "E6",
    95: "F2",
    100: "FF"
};




let scene = new Scene();

let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new WebGLRenderer();
let raycaster = new Raycaster();
let mouse = new Vector2();
mouse.x = 0;
mouse.y = 0;
let speed = 0.1;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let shapes = [];
camera.position.x = 4;
shapes.push(new BoxGeometry(1, 3, 0.75));
camera.position.x = 6;
shapes.push(new BoxGeometry(1, 3, 0.75));
camera.position.z = 25;
let trans = transparency[five(camera.position.z)];
let material = new MeshBasicMaterial({color: '#' + trans + '#F5F5F5'});
let cubes = [];
for (let i = 0; i < shapes.length; i++) {
    let cube = new Mesh(shapes[i], material)
    cubes.push(cube);
}

scene.add(cubes[0]);
scene.add(cubes[1]);

camera.position.x = 4;
let render = function () {
    requestAnimationFrame(render);

    camera.position.z -= speed;
    trans = transparency[five(camera.position.z)];
    let col = '#' + trans + '#F5F5F5';
    material = new MeshBasicMaterial({color: col});
    scene = new Scene();
    scene.add(new Mesh(shapes[0], material));
    if (camera.position.z <= 0) {
        camera.position.z = 25;
        // shapes.push(new BoxGeometry( 1, 3, 0.75 ));
        // cubes.push(new Mesh(shapes[shapes.length-1], material));
        // scene.add(cubes[cubes.length-1]);
    }
    // cube.rotation.x += 0.05;
    // cube.rotation.y += 0.05;
    //             cube.rotation.z += 0.05;

    renderer.render(scene, camera);
};

render();

function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1
}


window.addEventListener('mousemove', onMouseMove, false);

window.requestAnimationFrame(render);