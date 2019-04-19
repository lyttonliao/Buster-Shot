import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById("my-canvas");
    canvasEl.width = 720;
    canvasEl.height = 405;

    const play = document.getElementById("play");
    const menu = document.getElementById("menu")
    const audio = document.getElementById("audio")
    const gameover = document.getElementById("gameover")

    const ctx = canvasEl.getContext("2d");
    // let game = new Game(ctx);
    // game.startAnimating();

    audio.autoplay = true;

    audio.addEventListener("ended", function () {
        this.currentTime = 0;
        audio.play();
    }, false);

    gameover.addEventListener("click", ()=> {
        gameover.setAttribute("style", "visibility: hidden")
        playGame();
    })

    // debugger
    play.addEventListener("click", () => {
        menu.setAttribute("style", "visibility: hidden")
        playGame();
    })    
    
    const playGame = () => {
        const game = new Game(ctx);
        canvasEl.classList = '';
        game.startAnimating();
        // game.gameSFX.play();
    }
});
