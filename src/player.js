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
        this.image.src = './assets/images/pos-1.gif';
        this.sprite = new Sprite(this.image);

        this.spellSheets = new Image();
        this.spellSheets.src = `./assets/images/attack1.png`
        this.spellSprite = new Sprite(this.spellSheets)

        this.spells = {
            shoot: {
                id: 1,
                attackName: 'Bustershot',
                name: 'shoot',
                damage: 20,
                cooldownTime: 250,
                cooldown: false,
            },
            // thunderClap: {
            //     id: 2,
            //     attackName: 'Thunder Clap',
            //     name: 'thunderClap',
            //     damage: 100,
            //     cooldownTime: 10000,
            //     cooldown: false,
            // }
        }
        this.spellList = Object.values(this.spells).slice(1).map(spell => spell.name)

        this.moveLoop = [1, 2, 3]
        this.currentMoveIndex = 1;

        this.atkFrameTimer = 1;
        this.atkAnimationSpeed = 3;
        this.atkLoop = [0, 50 * 40 / 35, 100 * 40 / 35, 175 * 40 / 35, 250 * 40 / 35, 325 * 40 / 35];
        this.atkFrame = 0;

        this.eraseFrameTimer = 0;
        this.eraseAnimationSpeed = 11;

        this.shootSFX = new Audio();
        this.shootSFX.src = './assets/sounds/bustershot.mp3';
    }

    update(dx, dy) {
        this.dx = dx;
        this.dy = dy;
        this.state.position['x'] += dx;
        this.state.position['y'] += dy;
        this.render();
    }

    render() {
        this.sprite.renderAnimation(this.sx, 0, this.sw, 55, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
    }

    renderMove(currentLoopIndex) {
        this.sprite.renderAnimation(this.sx + 46 * currentLoopIndex, 0, this.sw, 55, this.state.position['x'] - this.dx, this.state.position['y'] - this.dy, this.dw, this.dh, this.ctx)
    }

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

        this.spellSprite.renderAnimation(start, h, (end - start), this.spellSheets.height, this.state.position['x'], this.state.position['y'] + 20, this.dw * (end - start) / 46, this.dh, this.ctx)
    }

    resetCooldown(spell) {
        if (spell === 'shoot') {
            setTimeout(() => {
                this.spells[spell].cooldown = false
            }, this.spells[spell].cooldownTime);
            return;
        }
        // setTimeout(() => {
        //     this.spellList.push(spell),
        //         this.spells[spell].cooldown = false;
        // }, this.spells[spell].cooldownTime)
    }

    deleteChar() {
        // this.eraseFrameTimer++;
        // if (this.eraseFrameTimer % this.eraseAnimationSpeed === 0) {
        this.sprite.renderAnimation(175, 300, this.sw, 55, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        // }
    }

    playerHit() {
        this.eraseFrameTimer++;
        if (this.eraseFrameTimer % this.eraseAnimationSpeed === 0) {
            this.sprite.renderAnimation(175, 300, this.sw, 55, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        }
    }
}

export default Player;