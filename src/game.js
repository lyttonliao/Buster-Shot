import Player from './player';
import Boss from './boss';
import GameModel from './game_model';

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameModel = new GameModel(ctx);
        this.player = new Player(ctx, 125, 130, 110, 160);
        this.boss = new Boss(ctx, 350, 0, 500, 450);
        this.renderPreview = this.renderPreview.bind(this);
        this.move = this.move.bind(this);
        this.move();

        this.resetCooldown = this.resetCooldown.bind(this);
        this.myAttack = this.myAttack.bind(this);
        this.myAttack();

        this.moveLoop = [1, 2, 3]
        this.currentMoveIndex = 1;
        this.moved = false;

        this.playerAttack = false;
        this.bossAttack = false;
        // this.bossAttacking = this.bossAttacking.bind(this);
    }

    move() {
        const player = this.player;
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 87 && player.state.position['y'] !== 69.25) {
                this.player.update(0, -60.75);
                this.moved = true;
            } else if (e.keyCode === 83 && player.state.position['y'] !== 190.75) {
                this.player.update(0, 60.75);
                this.moved = true;
            } else if (e.keyCode === 65 && player.state.position['x'] !== 5) {
                this.player.update(-120, 0);
                this.moved = true;
            } else if (e.keyCode === 68 && player.state.position['x'] !== 245) {
                this.player.update(120, 0);
                this.moved = true;
            }
        }
    )}

    myAttack() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 74) {
                const playerSpell = 'shoot';
                this.updateAttack(playerSpell);
            } else if (e.keyCode === 85) {
                const playerSpell = this.player.spellList.shift();
                this.updateAttack(playerSpell);
            }
        })
    }

    bossAttack() {
        this.boss.cycleAttacks();
    }

    updateAttack(spell) {
        if (this.player.spells[spell].cooldown === false) {
            this.player.attack(spell);
            this.playerAttack = true;

            this.boss.state.hp -= this.player.spells[spell].damage;
            this.player.spells[spell].cooldown = true;
            this.player.resetCooldown(spell);
            // setTimeout(this.resetCooldown, this.player.spells[spell].cooldownTime);
        }
    }

    hit() {

    }

    startAnimating() {
        this.fpsInterval = 1000 / 60;
        this.then = Date.now();
        this.renderPreview();
    }

    renderPreview() {
        const now = Date.now();
        const elapsed = now - this.then;
        if (this.playerAttack && this.spellBelongsTo() === this.player) {
            if (elapsed > this.fpsInterval) {
                this.then = now - (elapsed % this.fpsInterval);
                const start = this.shootLoop[this.shootIndex];
                const end = this.shootLoop[this.shootIndex + 1];
                this.ctx.clearRect(0, 0, 720, 405);
                this.gameModel.render();
                this.player.attack(this.abilityUsed, start, end);
                this.boss.render();

                this.boss.isAttacked(this.player.spells[this.abilityUsed].id);
                this.shootIndex++;
                if (this.shootIndex === this.shootLoop.length){
                    this.shootIndex = 0;
                    this.playerAttack = false;
                }
                window.requestAnimationFrame(this.renderPreview);
                return;
            }
        }
        if (this.moved) {
            if (elapsed > this.fpsInterval) {
                this.then = now - (elapsed % this.fpsInterval);
                this.ctx.clearRect(0, 0, 720, 405);
                this.gameModel.render();
                this.player.renderMove(this.currentMoveIndex);
                this.boss.render();

                this.currentMoveIndex++;      
                if (this.currentMoveIndex >= this.moveLoop.length) {
                    this.currentMoveIndex = 1;
                    this.moved = false;
                }
                window.requestAnimationFrame(this.renderPreview);
                return;
            }
        }
        this.ctx.clearRect(0, 0, 720, 405);
        this.gameModel.render();
        this.player.render();
        this.boss.render();
        setTimeout(this.bossAttacking, 8000);
        if (this.bossAttack && this.spellBelongsTo() === this.boss) {
            debugger
            // const bossAtkIndex = this.bossAtkLoop[this.bossAtkFrame]
            this.boss.attack(this.abilityUsed);
            // this.bossAtkFrame++;


            // if (this.bossAtkFrame === this.bossAtkLoop.length) {
                // this.bossAtkFrame = 0;
                this.bossAttack = false;
            // }

        }

        window.requestAnimationFrame(this.renderPreview);
    }
    
    play() {
        const { ctx, player } = this;
    }
}

export default Game;