import Sprite from './sprite';

class Player {
    constructor(ctx, x, y, dw, dh) {
        this.ctx = ctx;
        this.state = {
            position: {
                x: x,
                y: y
            },
            hp: 1000,
        }
        this.sx = 0
        this.sw = 46;
        this.dw = dw;
        this.dh = dh;
        this.image = new Image();
        this.image.src = '../assets/images/pos-1.gif';

        this.spells = {
            shoot: {
                attackName: 'Bustershot',
                name: 'shoot',
                damage: 5,
                cooldownTime: 500,
                cooldown: false,
            }

        }
    }

    update(dx, dy) {
        this.dx = dx;
        this.dy = dy;
        this.state.position['x'] += dx;
        this.state.position['y'] += dy;
        this.render();
    }

    render() {
        this.sprite = new Sprite(this.image, this.sx, 0, this.sw, 55, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        this.sprite.render();
    }

    renderMove(currentLoopIndex) {
        this.sprite = new Sprite(this.image, this.sx + 46 * currentLoopIndex, 0, this.sw, 55, this.state.position['x'] - this.dx, this.state.position['y'] - this.dy, this.dw, this.dh, this.ctx);
        this.sprite.render();
    }

    attack(spell, start, end) {
        if (spell === 'shoot') {
            this.sprite = new Sprite(this.image, this.sx + 46 * start, 55, this.sw * (end - start), 55 * 7 / 8, this.state.position['x'], this.state.position['y'], this.dw * (end - start), this.dh , this.ctx);
            this.sprite.render();
        }
    }
}

export default Player;