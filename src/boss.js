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
        // this.image.onload = function() {
        //     this.render;
        // }
        this.image.src = '../assets/images/flying.gif';
        // debugger
        this.sprite = new Sprite(this.image);
        this.render = this.render.bind(this);

        this.atkImage = new Image();   
        this.atkImage.src = '../assets/images/'

        this.frameTimer = 0;
        this.animationSpeed = 20;
        this.bossMoveLoop = [0, 1, 2, 1]
        this.currentFrame = 0;

        this.atkFrameTimer = 0;
        this.atkAnimationSpeed = 20;
        this.atkLoop = [2, 1, 0, 1, 0, 1, 0, 1, 0, 1]
        this.atkFrame = 0;

        this.phoenixFire = new Image();
        this.phoenixFire.src = `../assets/images/falzrattack1.gif`
        this.phoenixFireSprite = new Sprite(this.phoenixFire);

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
        this.sprite.renderAnimation(this.image, 155 * moveIndex, 0, 155, 164, this.state.position['x'], this.state.position['y'], this.dw, this.dh, this.ctx);
        if (this.currentFrame === this.bossMoveLoop.length) {
            this.currentFrame = 0;
        }
    }

    isAttacked(spellId) {
        if (spellId === 1) {
            const damaged = new Image();
            damaged.src = `../assets/images/bossflash${1}.gif`;
            const flashSprite = new Sprite(damaged);
            // const flashSprite2 = new Sprite(damaged, 0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / 2, this.state.position['y'] + this.dh / 2, damaged.width * 2, damaged.height * 2, this.ctx);
            // const flashSprite3 = new Sprite(damaged, 0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / 5, this.state.position['y'] + this.dh / 2.3, damaged.width * 2, damaged.height * 2, this.ctx);

            flashSprite.renderAnimation(damaged, 0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / 3, this.state.position['y'] + this.dh / 3, damaged.width * 2, damaged.height * 2, this.ctx);
            flashSprite.renderAnimation(damaged, 0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / 2, this.state.position['y'] + this.dh / 2, damaged.width * 2, damaged.height * 2, this.ctx);
            flashSprite.renderAnimation(damaged, 0, 0, damaged.width, damaged.height, this.state.position['x'] + this.dw / 5, this.state.position['y'] + this.dh / 2.3, damaged.width * 2, damaged.height * 2, this.ctx);
        }
    }

    cycleAttacks() {
        for (let i = 1; i <= this.spellList.length; i++) {
            // const spell = Object.values(this.spells).filter(spell => spell.id === i)
            // const spellName = spell.name
            const spellName = this.spellList.shift();
            setTimeout(this.attack(spellName), 5000);
            this.resetCooldown(spellName);
        }
    }

    attack(spell) {
        if (spell === 'phoenixFire') {
            var spellAnim = this.phoenixFire;
            this.spellSprite = this.phoenixFireSprite;
            var w = 229 / 3;
            var h = 183;
        }
        
        this.atkFrameTimer++;
        if (this.atkFrameTimer % this.atkAnimationSpeed < 1) {
            this.atkFrame++;
        }

        const atkIndex = this.atkLoop[this.atkFrame];
        this.spellSprite.renderAnimation(spellAnim, w * atkIndex, 0, w, h, ctx.canvas.width / 2, ctx.canvas.height * .45, w, h, this.ctx)
        if(this.atkFrame === this.atkLoop.length) {
            this.atkFrame = 0;
        }
    }

    resetCooldown(spell) {
        setTimeout(() => {
            this.spellList.push(spell),
            this.spells[spell].cooldown = false;
        }, this.spell[spell].cooldownTime)
    }

    // attack(spell, index) {
    //     const ctx = this.ctx;
    //     const spellAnim = new Image();
    //     spellAnim.src = `../assets/images/falzrattack${this.spells[spell].id}.gif`
    //     var w = 229 / 3;
    //     var h = 183;
        // if (spell === 'shoot') {
            // this.sprite = new Sprite(spellAnim, start, 0, end - start, 50, this.state.position['x'], this.state.position['y'], this.dw, this.dh , this.ctx);
        // this.spellSprite = new Sprite(spellAnim, w * index, 0, w, h, ctx.canvas.width / 2, ctx.canvas.height * .45, w, h, ctx);
        
        // this.atkFrameTimer++;
        // if (this.atkFrameTimer % this.atkAnimationSpeed < 1) {
        //     this.spellSprite.render()
            // this.atkFrame++;
        // }
        // }
    // }

}

export default Boss;