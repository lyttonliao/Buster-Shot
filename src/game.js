import Player from './player';
import Boss from './boss';
import Phoenix from './objects/phoenix';

import GameModel from './game_model';

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameModel = new GameModel(ctx);
        this.player = new Player(ctx, 125, 130, 110, 160);
        this.boss = new Boss(ctx, 350, 0, 500, 450, this.player);
        this.renderPreview = this.renderPreview.bind(this);
        this.move = this.move.bind(this);
        this.move();

        this.myAttack = this.myAttack.bind(this);
        this.myAttack();

        this.toggleButtons.call(this);

        this.moveLoop = [1, 2, 3]
        this.currentMoveIndex = 1;
        this.moved = false;

        this.falzrAttack = this.falzrAttack.bind(this);
        this.playerAttack = false;
        this.bossAttack = false;
        this.playerPrevHP = this.player.state.hp;
        
        this.phoenix = new Image();
        this.phoenix.src = './assets/images/phoenix.gif';

        this.gameover = false;

        this.audio = document.getElementById('audio');
        this.audio.load();
        this.audio.play();
    }
    
    toggleButtons() {
        const up = document.getElementById('up');
        const left = document.getElementById('left');
        const down = document.getElementById('down');
        const right = document.getElementById('right')
        const a_button = document.getElementById('a-button');
        const b_button = document.getElementById('b-button');

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 87) {
                up.classList.add('pressed')
            } else if (e.keyCode === 83) {
                down.classList.add('pressed')
            } else if (e.keyCode === 65) {
                left.classList.add('pressed')
            } else if (e.keyCode === 68) {
                right.classList.add('pressed')
            } else if (e.keyCode === 74) {
                a_button.classList.add('pressed')
            } else if (e.keyCode === 75) {
                b_button.classList.add('pressed')
            }
        })

        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 87) {
                up.classList.remove('pressed')
            } else if (e.keyCode === 83) {
                down.classList.remove('pressed')
            } else if (e.keyCode === 65) {
                left.classList.remove('pressed')
            } else if (e.keyCode === 68) {
                right.classList.remove('pressed')
            } else if (e.keyCode === 74) {
                a_button.classList.remove('pressed')
            } else if (e.keyCode === 75) {
                b_button.classList.remove('pressed')
            }
        })
    }

    move() {
        const player = this.player;
        document.addEventListener('keydown', (e) => {
            if (this.gameover) {
                return;
            }
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
            if (e.keyCode === 74 || e.keyCode === 75) {
                this.playerSpell = 'shoot';
                this.updateAttack(this.playerSpell);
            } 
            // else if (e.keyCode === 85) {
            //     this.playerSpell = this.player.spellList.shift();
            //     this.updateAttack(this.playerSpell);
            // }
        })
    }

    falzrAttack() {
        this.boss.cycleAttacks();
    }

    updateAttack(spell) {
        if (this.player.spells[spell].cooldown === false) {
            this.playerAttack = true;

            this.boss.state.hp -= this.player.spells[spell].damage;
            this.player.spells[spell].cooldown = true;
            this.player.resetCooldown(spell);
        }
    }

    startAnimating() {
        this.fpsInterval = 1000 / 60;
        this.then = Date.now();
        this.renderPreview();
    }

    renderPreview() {
        const now = Date.now();
        const elapsed = now - this.then;
        // this.gameSFX.play();
        if (this.playerAttack) {
            this.moved = false;
            if (elapsed > this.fpsInterval) {
                this.then = now - (elapsed % this.fpsInterval);
                this.ctx.clearRect(0, 0, 720, 405);
                this.gameModel.render();
                this.boss.render();
                this.boss.attack('phoenixFire');
                    this.player.shootSFX.play();
                this.boss.updatePhoenix();
                if (this.player.atkFrame === this.player.atkLoop.length - 1) {
                    this.player.atkFrame = 0;
                    this.playerAttack = false;
                    this.player.render();
                    // this.player.shootSFX.play();
                } else {
                    this.player.attack(this.playerSpell);
                }

                this.updateHP.call(this);
                
                this.boss.isAttacked(this.player.spells[this.playerSpell].id);
                // if (!this.requestId) {
                    // this.requestId = window.requestAnimationFrame(this.renderPreview);
                    window.requestAnimationFrame(this.renderPreview);
                // }
                // this.animation();
                return;
            }
        }
        if (this.moved) {
            this.playerAttack = false;
            if (elapsed > this.fpsInterval) {
                this.then = now - (elapsed % this.fpsInterval);
                this.ctx.clearRect(0, 0, 720, 405);
                this.gameModel.render();
                this.boss.render();
                this.boss.attack('phoenixFire');
                this.boss.updatePhoenix();
                this.player.renderMove(this.currentMoveIndex);
                this.updateHP.call(this);

                this.currentMoveIndex++;      
                if (this.currentMoveIndex >= this.moveLoop.length) {
                    this.currentMoveIndex = 1;
                    this.moved = false;
                }
                // if (!this.requestId) {
                    // this.requestId = window.requestAnimationFrame(this.renderPreview);
                    window.requestAnimationFrame(this.renderPreview);
                // }
                // this.animation();
                return;
            }
        }
        this.player.render();
        
        this.ctx.clearRect(0, 0, 720, 405);
        this.gameModel.render();
        this.boss.render();
        this.boss.attack('phoenixFire');
        this.boss.updatePhoenix();
        this.updateHP.call(this);
        if (this.playerPrevHP !== this.player.state.hp) {
            this.player.playerHit();
            this.playerPrevHP = this.player.state.hp
        } else {
            this.player.render();
        }
        this.isGameover();
        if (this.gameover) {
            this.ctx.clearRect(0, 0, 720, 405);
            this.gameModel.render();
            this.declareWinner();
            this.winner.render();
            // if (this.requestId) {
            window.cancelAnimationFrame(requestAnimationFrame(this.renderPreview));
            //     this.requestId = undefined;
            // }
            return;
        }
        // } else {
            // this.boss.render();
        // }
        // const plane = requestAnimationFrame(this.renderPreview);
        // if (!this.requestId) {
            // this.requestId = window.requestAnimationFrame(this.renderPreview);
            window.requestAnimationFrame(this.renderPreview);
        // }
        // this.animation();
    }
    
    updateHP() {
        // const playerHP = document.getElementById('player-hp');
        // const bossHP = document.getElementById('boss-hp');
        const playerHP = this.player.state.hp;
        const bossHP = this.boss.state.hp;
        
        this.ctx.fillStyle = "white";
        this.ctx.fillText(playerHP, 10, 10)
        this.ctx.fillText(bossHP, 635, 10)
        this.ctx.font = "30px Verdana"
        this.ctx.textAlign = "start";
        this.ctx.textBaseline = "top";
    }

    isGameover() {
        if (this.player.state.hp === 0) {
            // this.player.deleteChar();
            // document.location.reload();
            this.gameover = true;
            this.loser = this.player;
            this.winner = this.boss
        }

        if (this.boss.state.hp === 0) {
            this.gameover = true;
            this.loser = this.boss;
            this.winner = this.player
        }
    }

    declareWinner() {
        this.loser.deleteChar();
        const gameover = document.getElementById('gameover');
        const endgameStatus = document.getElementsByClassName('end-game')
        const canvasEl = document.getElementById('my-canvas');
        gameover.setAttribute("style", "visibility: visible")
        if (this.winner === this.player) {
            endgameStatus[0].innerHTML = "YOU WIN! CLICK TO PLAY AGAIN."
        } else if (this.winner === this.boss) {
            endgameStatus[0].innerHTML = "GAMEOVER. CLICK TO PLAY AGAIN."
        }
        canvasEl.classList.add('blur');
    }
}

export default Game;