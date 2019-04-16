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
        this.sprite = new Sprite(this.image);

        this.spellSheets = new Image();
        this.spellSheets.src = `../assets/images/attack1.png`
        this.spellSprite = new Sprite(this.spellSheets)

        this.spells = {
            shoot: {
                id: 1,
                attackName: 'Bustershot',
                name: 'shoot',
                damage: 5,
                cooldownTime: 250,
                cooldown: false,
            }
        }
        this.spellList = Object.values(this.spells).slice[1].map(spell => spell.name)

        this.moveLoop = [1, 2, 3]
        this.currentMoveIndex = 1;

        this.atkFrameTimer;
        this.atkAnimationSpeed
        this.atkLoop = [0, 50 * 40 / 35, 100 * 40 / 35, 175 * 40 / 35, 250 * 40 / 35, 325 * 40 / 35];
        this.atkFrame = 0;
    }

    update(dx, dy) {
        this.dx = dx;
        this.dy = dy;
        this.state.position['x'] += dx;
        this.state.position['y'] += dy;
        this.render();
    }

    render() {
        this.sprite.renderAnimation(this.image, this.sx, 0, this.sw, 55, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
    }

    renderMove(currentLoopIndex) {
        this.sprite.renderAnimation(this.image, this.sx + 46 * currentLoopIndex, 0, this.sw, 55, this.state.position['x'] - this.dx, this.state.position['y'] - this.dy, this.dw, this.dh, this.ctx)
    }

    // attack(spell, start, end) {
    //     const spellAnim = new Image();
    //     spellAnim.src = `../assets/images/attack${this.spells[spell].id}.png`
    //     if (spell === 'shoot') {
    //         // this.sprite = new Sprite(spellAnim, start, 0, end - start, 50, this.state.position['x'], this.state.position['y'], this.dw, this.dh , this.ctx);
    //         this.sprite = new Sprite(spellAnim, start, 0, (end - start), spellAnim.height, this.state.position['x'], this.state.position['y'], this.dw * (end - start) / 46, this.dh, this.ctx);
    //         this.sprite.render();
    //     }
    // }

    attack(spell) {
        if (spell === 'shoot') {
            var h = 0;
        } 
        
        this.atkFrameTimer++;
        if (this.atkFrameTimer % this.atkAnimationSpeed < 1) {
            this.atkFrame++;
        }

        const start = this.atkLoop[this.atkFrame];
        const end = this.atkLoop[this.atkFrame + 1];

        this.spellSprite.renderAnimation(spellAnim, start, h, (end - start), spellAnim.height, this.state.position['x'], this.state.position['y'], this.dw * (end - start) / 46, this.dh, this.ctx)
        if (this.atkFrame === this.atkLoop.length) {
            this.atkFrame = 0;
        }
    }

    resetCooldown(spell) {
        if (spell === 'shoot') {
            setTimeout(this.spells[spell].cooldown = false, this.spell[spell].cooldownTime);
        }
        setTimeout(() => {
            this.spellList.push(spell),
                this.spells[spell].cooldown = false;
        }, this.spell[spell].cooldownTime)
    }
}

export default Player;