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
        this.playerAttack = this.playerAttack.bind(this);
        this.playerAttack();

        this.moveLoop = [1, 2, 3]
        this.currentMoveIndex = 1;
        this.moved = false;

        this.frameCount = 0;
        this.bossMoveLoop = [0, 1, 2, 1]
        this.bossMoveIndex = 0;
        // this.bossRender = this.bossRender.bind(this);
        // this.animateBoss = this.animateBoss.bind(this);

        this.playerAttack = false;
        this.shootLoop = [0, 50 * 40 / 35, 100 * 40 / 35, 175 * 40 / 35, 250 * 40 / 35, 325 * 40 / 35];
        // this.shootLoop = [0, 325]
        this.shootIndex = 0;
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
            player.spells[spell].cooldown = true;
            setTimeout(this.resetCooldown, player.spells[spell].cooldownTime);
        }
    }

    resetCooldown() {
        this.player.spells[this.abilityUsed].cooldown = false;
    }

    startAnimating() {
        this.fpsInterval = 1000 / 30;
        this.then = Date.now();
        this.renderPreview();
    }

    // bossRender() {
    //     const now = Date.now();
    //     const elapsed = now - this.then;
    //     if (elapsed > this.fpsInterval) {
    //         this.then = now - (elapsed % this.fpsInterval);
            // this.boss.render(this.bossMoveLoop[this.bossMoveIndex])
            // this.bossMoveIndex++;
            // if (this.bossMoveIndex === this.bossMoveLoop.length) {
            //     this.bossMoveIndex = 0;
            // }
    //     }
    // }

    // animateBoss(fps) {
    //     this.fpsInterval = 1000 / fps;
    //     this.then = Date.now();
    //     this.bossRender();
    // }

    renderPreview() {
        const now = Date.now();
        const elapsed = now - this.then;
        if (this.playerAttack) {
            if (elapsed > this.fpsInterval) {
                this.then = now - (elapsed % this.fpsInterval);
                const start = this.shootLoop[this.shootIndex];
                const end = this.shootLoop[this.shootIndex + 1];
                this.ctx.clearRect(0, 0, 720, 405);
                this.gameModel.render();
                this.player.attack(this.abilityUsed, start, end);
                // this.bossRender();
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
            // const now = Date.now();
            // const elapsed = now - this.then;
            if (elapsed > this.fpsInterval) {
                this.then = now - (elapsed % this.fpsInterval);
                this.ctx.clearRect(0, 0, 720, 405);
                this.gameModel.render();
                this.player.renderMove(this.currentMoveIndex);
                // this.bossRender();
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

        // if (elapsed > this.fpsInterval) {
        //     this.then = now - (elapsed % this.fpsInterval);
            // this.bossRender();
            this.boss.render();
        // }   
        
        window.requestAnimationFrame(this.renderPreview);
    }
    
    play() {
        const { ctx, player } = this;
    }
}

export default Game;

                // this.animateBoss(30);
                // this.frameCount++;
                // if (this.frameCount < 10) {
                //     window.requestAnimationFrame(this.renderPreview);
                //     return;
                // }
                // this.frameCount = 0;
                // this.boss.render(this.bossMoveLoop[this.bossMoveIndex])
                // this.bossMoveIndex++;
                // if (this.bossMoveIndex === this.bossMoveLoop.length) {
                //     this.bossMoveIndex = 0;
                // }