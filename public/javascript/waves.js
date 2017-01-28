import Oscring from "oscring";

const canvas = document.getElementById('container');
const context = canvas.getContext('2d');


// settings (config)
const amplitude = 20;
const zeroLevel = 2 * amplitude;
const period = 10 * Math.PI;
const density = 1;
const delta = Math.round(1 / density);


// variables (runtime-changed)
// ...

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

function hslToRgb(h, s, l){
    let r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        let hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}