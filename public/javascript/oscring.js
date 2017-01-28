
// settings (config)
const amplitude = 20;
const zeroLevel = 2 * amplitude;
const period = 10 * Math.PI;
const density = 1;
const delta = Math.round(1 / density);

export class Oscring {
    constructor(data) {
        let defaults = {};
        this.config = defaults.extend(data);
    }
    render() {
        let context = this.config.context;
        context.beginPath();
        context.moveTo(0, zeroLevel);
        for (let x = 0; x < 2 * Math.PI * period; x += delta) {
            context.lineTo(x, zeroLevel + Math.round(amplitude * Math.sin(x / period)));
        }
        context.stroke();
        context.closePath();
    }
}