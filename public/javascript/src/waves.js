import Oscring from "./oscring";


const canvas = document.getElementById('container');
const context = canvas.getContext('2d');


let ring = new Oscring({
    canvas,
    context
});


//init
onResize();


// keep canvas size same as window
window.addEventListener('resize', onResize, true);
function onResize() {
    spreadCanvas();
    ring.render();
}
function spreadCanvas() {
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
