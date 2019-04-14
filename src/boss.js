import Sprite from './sprite';

class Boss {
    constructor(ctx, x, y, dw, dh) {
        this.ctx = ctx;
        this.state = {
            position: {
                x: x,
                y: y
            },
            hp: 3000,
        }
        this.dw = dw;
        this.dh = dh;
        this.image = new Image();
        this.image.src = '../assets/images/falzr.gif';
    }

    update(dx, dy) {
        this.state.position['x'] += dx;
        this.state.position['y'] += dy;
        this.render();
    }

    render() {
        this.sprite = new Sprite(this.image, 0, 0, 165, 170, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        this.sprite.render();
    }

    renderMove() {
        
    }

}

export default Boss;