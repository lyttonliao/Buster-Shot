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

        this.playerAttack = this.playerAttack.bind(this);
        this.playerAttack();

        this.moveLoop = [1, 2, 3]
        this.currentMoveIndex = 1;
        this.moved = false;

        this.playerAttack = false;
        this.shootLoop = [0,1,2,25/7,36/7,46/7];
        this.currentShootIndex = 0;
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

    playerAttack() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 74) {
                this.abilityUsed = 'shoot';
                this.attack('shoot');
            } else if (e.keyCode === 85) {

            }
        })
    }

    attack(spell) {
        const { player, boss } = this;
        if (player.spells[spell].cooldown === false) {
            this.playerAttack = true;
            boss.state.hp -= player.spells[spell].damage;
            player.spells[spell.cooldown] = true;
            // setTimeout(this.resetCooldown(spell), player.spells[spell].cooldownTime);
        }
    }

    resetCooldown(spell) {
        this.player.spells[spell].cooldown = true;
    }

    startAnimating(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.renderPreview();
    }

    renderPreview() {
        if (this.playerAttack) {
            const now = Date.now();
            const elasped = now - this.then;
            if (elasped > this.fpsInterval) {
                const start = this.shootLoop[this.currentShootIndex];
                const end = this.shootLoop[this.currentShootIndex + 1];
                this.player.attack(this.abilityUsed, start, end);
                this.currentShootIndex++;
                if (this.currentShootIndex === this.shootLoop.length){
                    this.currentShootIndex = 0;
                    this.playerAttack = false;
                }
                window.requestAnimationFrame(this.renderPreview);
                return;
            }
        }
        if (this.moved) {
            const now = Date.now();
            const elapsed = now - this.then;
            if (elapsed > this.fpsInterval) {
                this.then = now - (elapsed % this.fpsInterval);
                this.player.renderMove(this.currentMoveIndex);
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
        window.requestAnimationFrame(this.renderPreview);
    }
    
    play() {
        const { ctx, player } = this;
    }
}

export default Game;