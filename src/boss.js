import Sprite from './sprite';
import Phoenix from './objects/phoenix';
import { Howl, Howler } from 'howler';

class Boss {
    constructor(ctx, x, y, dw, dh, player) {
        this.ctx = ctx;
        this.player = player;
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
        this.image.src = './assets/images/flying.gif';
        this.sprite = new Sprite(this.image);
        this.render = this.render.bind(this);

        this.atkImage = new Image();   
        this.atkImage.src = './assets/images/'

        this.frameTimer = 0;
        this.animationSpeed = 20;
        this.bossMoveLoop = [0, 1, 2, 1]
        this.currentFrame = 0;

        this.atkFrameTimer = 0;
        this.atkAnimationSpeed = 20;
        this.atkLoop = [2, 1, 0, 1]
        this.atkFrame = 0;

        this.phoenixArray = [];
        this.phoenixFire = new Image();
        this.phoenixFire.src = `./assets/images/falzrattack1.gif`
        this.phoenixFireSprite = new Sprite(this.phoenixFire);

        this.phoenix = new Image();
        this.phoenix.src = './assets/images/phoenix.gif';
        this.index = 0;

        this.spells = {
            phoenixFire: {
                id: 1,
                attackName: 'Phoenix Fire',
                name: 'phoenixFire',
                damage: 100,
                cooldownTime: 10000,
                cooldown: false,
            },

            // talonSpike: {
            //     id: 2,
            //     attackName: 'Talon Spike',
            //     name: 'talonSpike',
            //     damage: 100,
            //     cooldownTime: 10000,
            //     cooldown: false,
            // }
        }
        this.spellList = Object.values(this.spells).map(spell => spell.name)

        this.attacking = false;
        this.flying = new Audio();
        this.flying.src = './assets/sounds/fly.mp3';
    }

    update(dx, dy) {
        this.state.position['x'] += dx;
        this.state.position['y'] += dy;
        this.render();
    }

    render(){
        this.frameTimer++;
        if (this.frameTimer % this.animationSpeed < 1) {
            this.currentFrame++;
        }
        const moveIndex = this.bossMoveLoop[this.currentFrame];
        this.sprite.renderAnimation(155 * moveIndex, 0, 155, 164, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        if (this.currentFrame === this.bossMoveLoop.length) {
            this.currentFrame = 0;
            this.flying.play();
        }

        // if (this.currentFrame = 1 && this.frameTimer % this.animationSpeed === 0) this.flying.play();
    }

    isAttacked(spellId) {
        if (spellId === 1) {
            const damaged = new Image();
            damaged.src = `./assets/images/bossflash${1}.gif`;
            const flashSprite = new Sprite(damaged);
            flashSprite.renderAnimation(0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / (3 + Math.random()), this.state.position['y'] + this.dh / (Math.random() + 2), damaged.width * 2, damaged.height * 2, this.ctx);
            flashSprite.renderAnimation(0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / (2 + Math.random()), this.state.position['y'] + this.dh / (Math.random() + 4), damaged.width * 2, damaged.height * 2, this.ctx);
            flashSprite.renderAnimation(0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / (4 + Math.random()), this.state.position['y'] + this.dh / (Math.random() + 6), damaged.width * 2, damaged.height * 2, this.ctx);
        }
    }

    // cycleAttacks() {
    //     for (let i = 1; i <= this.spellList.length; i++) {
    //         const spellName = this.spellList.shift();
    //         this.spells[spellName].cooldown = true;
    //         setTimeout(this.attack(spellName), 0);
    //         this.resetCooldown(spellName);
    //     }
    // }

    attack(spell) {
        if (spell === 'phoenixFire') {
            this.spellSprite = this.phoenixFireSprite;
            var w = 229 / 3;
            var h = 183;
        }
        this.attacking = true;

        if (this.state.hp > 2500) {
            if (this.atkFrameTimer % 35 === 0) {
                this.phoenixArray.push(new Phoenix(this.phoenix, this.player, this.ctx));
            }
        } else if (this.state.hp > 2000) {
            if (this.atkFrameTimer % 30 === 0) {
                this.phoenixArray.push(new Phoenix(this.phoenix, this.player, this.ctx));
            }
        } else if (this.state.hp > 1500) {
            if (this.atkFrameTimer % 25 === 0) {
                this.phoenixArray.push(new Phoenix(this.phoenix, this.player, this.ctx));
            }
        } else if (this.state.hp > 1000) {
            if (this.atkFrameTimer % 22 === 0) {
                this.phoenixArray.push(new Phoenix(this.phoenix, this.player, this.ctx));
            }
        } else if (this.state.hp > 500) {
            if (this.atkFrameTimer % 18 === 0) {
                this.phoenixArray.push(new Phoenix(this.phoenix, this.player, this.ctx));
            }
        } else if (this.state.hp > 0) {
            if (this.atkFrameTimer % 15=== 0) {
                this.phoenixArray.push(new Phoenix(this.phoenix, this.player, this.ctx));
            }
        }

        this.atkFrameTimer++;
        if (this.atkFrameTimer % this.atkAnimationSpeed < 1) {
            this.atkFrame++;
        }
        this.atkIndex = this.atkLoop[this.atkFrame];
        this.spellSprite.renderAnimation(w * this.atkIndex, 0, w, h, this.ctx.canvas.width / 2, this.ctx.canvas.height * .45 - 10, w, h, this.ctx)
            
        if(this.atkFrame === this.atkLoop.length) {
            this.atkFrame = 0;
            this.attacking = false;
        }
    }

    updatePhoenix() {
        this.phoenixArray.forEach(phoenix => {
            if (phoenix.isCollided()) {
                phoenix.reducePlayerHP(this.spells['phoenixFire'].damage);
                this.removePhoenix(phoenix);
            } else {
                phoenix.render();
            }
        })
        this.phoenixArray = this.phoenixArray.filter(phoenix => (phoenix.x > -75 || phoenix.isCollided()))
    }

    removePhoenix(phoenixCollided){
        const index = this.phoenixArray.findIndex((element) => element === phoenixCollided)
        this.phoenixArray = this.phoenixArray.slice(0, index).concat(this.phoenixArray.slice(index + 1))
    }

    deleteChar() {
        this.death = new Image();
        this.death.src = './assets/images/phoenix1.gif';
        this.deathSprite = new Sprite(this.death);
        this.deathSprite.renderAnimation(0, 0, 155, 164, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
    }

    // resetCooldown(spell) {
    //     setTimeout(() => {
    //         this.spellList.push(spell),
    //         this.spells[spell].cooldown = false;
    //     }, this.spells[spell].cooldownTime)
    // }
}

export default Boss;