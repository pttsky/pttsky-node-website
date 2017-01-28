
// settings (config)
const amplitude = 20;
const zeroLevel = 2 * amplitude;
const period = 10 * Math.PI;
const density = 1;
const delta = Math.round(1 / density);

export default class Oscring {
    constructor({ context, canvas }) {
        Object.assign(this, { context, canvas });
    }
    render() {
        let context = this.context;
        context.beginPath();
        context.moveTo(0, zeroLevel);
        for (let x = 0; x < 2 * Math.PI * period; x += delta) {
            context.lineTo(x, zeroLevel + Math.round(amplitude * Math.sin(x / period)));
        }
        context.stroke();
        context.closePath();
    }
}