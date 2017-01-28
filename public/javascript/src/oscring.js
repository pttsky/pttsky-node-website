const dots = [
    {
        r: 100,
        fi: 0
    }, {
        r: 200,
        fi: Math.PI / 4
    }, {
        r: 100,
        fi: Math.PI / 2
    }, {
        r: 200,
        fi: 3 * Math.PI / 4
    }, {
        r: 100,
        fi: Math.PI
    }, {
        r: 200,
        fi: 5 * Math.PI / 4
    }, {
        r: 100,
        fi: 3 * Math.PI / 2
    },{
        r: 200,
        fi: 7 * Math.PI / 4
    },
];

const center = {
    x: .5,
    y: .5
};

export default class Oscring {
    constructor({ context, canvas }) {
        Object.assign(this, { context, canvas });
    }
    render() {
        let context = this.context;
        let canvas = this.canvas;
        let tx, ty;
        context.beginPath();
        for (let i = 0; i < dots.length; i++) {
            tx = Math.round(center.x * canvas.width + dots[i].r * Math.cos(dots[i].fi));
            ty = Math.round(center.y * canvas.height + dots[i].r * Math.sin(dots[i].fi));
            context.lineTo(tx, ty);
        }
        context.closePath();
        context.strokeStyle = 'rgba(255, 170, 190, .5)';
        context.lineWidth = 120;
        context.lineJoin = 'round';
        context.stroke();
    }
}