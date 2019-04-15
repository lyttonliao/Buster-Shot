import Sprite from './sprite';
import { throws } from 'assert';

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
        // this.image.addEventListener('load', this.render, false);
        this.image.onload = function() {
            this.render;
            debugger
        }
        this.image.src = '../assets/images/flying.gif';
        this.sprite = new Sprite(this.image, 0, 0, 155, 164, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        this.render = this.render.bind(this);
        // this.image.onload = function() {
        //     this.render;
        // }
        // this.ctx.drawImage(this.image, 0, 0, 155, 164, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        // this.image = await loadImage('../assets/images/flying.gif');
        // this.sprite = new Sprite(this.image, 0, 0, 155, 164, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        // this.ctx.drawImage(this.image, 0, 0, 155, 164, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);


        this.spells = {
            phoenixFire: {
                id: 1,
                attackName: 'Phoenix Fire',
                name: 'phoenixFire',
                damage: 100,
                cooldownTime: 10000,
                cooldown: false,
            },

            talonSpike: {
                id: 2,
                attackName: 'Talon Spike',
                name: 'talonSpike',
                damage: 100,
                cooldownTime: 10000,
                cooldown: false,
            }
        }
    }

    update(dx, dy) {
        this.state.position['x'] += dx;
        this.state.position['y'] += dy;
        this.render();
    }

    // render(moveIndex) {
    render(){
        // this.sprite = new Sprite(this.image, 155 * moveIndex, 0, 155, 164, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        // this.image.addEventListener('load', render, false);
            // this.sprite.renderAnimation(this.image, 155 * moveIndex, 0, 155, 164, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        // }
        this.sprite.render();
    }

    isAttacked(spellId) {
        if (spellId === 1) {
            const damaged = new Image();
            damaged.src = `../assets/images/bossflash${1}.gif`;
            const flashSprite1 = new Sprite(damaged, 0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / 3, this.state.position['y'] + this.dh / 3, damaged.width * 2, damaged.height * 2, this.ctx);
            const flashSprite2 = new Sprite(damaged, 0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / 2, this.state.position['y'] + this.dh / 2, damaged.width * 2, damaged.height * 2, this.ctx);
            const flashSprite3 = new Sprite(damaged, 0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / 5, this.state.position['y'] + this.dh / 2.3, damaged.width * 2, damaged.height * 2, this.ctx);

            flashSprite1.render();
            flashSprite2.render();
            flashSprite3.render();
        }
    }

    attack(spell, start, end) {
        const spellAnim = new Image();
        spellAnim.src = `../assets/images/falzrattack${this.spells[spell].id}.gif`;
    }
    // renderMove(moveIndex) {
    //     this.sprite = 
    // }

}

export default Boss;