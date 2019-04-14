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
                id: 1,
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
        const spellAnim = new Image();
        spellAnim.src = `../assets/images/attack${this.spells[spell].id}.png`
        // debugger
        if (spell === 'shoot') {
            // this.sprite = new Sprite(spellAnim, start, 0, end - start, 50, this.state.position['x'], this.state.position['y'], this.dw, this.dh , this.ctx);
            this.sprite = new Sprite(spellAnim, start, 0, (end - start), spellAnim.height, this.state.position['x'], this.state.position['y'], this.dw * (end - start) / 46, this.dh, this.ctx);
            debugger
            this.sprite.render();
        }
    }
}

export default Player;