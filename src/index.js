import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById("my-canvas");
    canvasEl.width = 720;
    canvasEl.height = 405;

    const play = document.getElementById("play")
    const menu = document.getElementById("menu")
    const audio = document.getElementById("audio")
    const gameover = document.getElementById("gameover")
    const volControl = document.getElementById('vol-control')
    
    const ctx = canvasEl.getContext("2d");


    audio.addEventListener("ended", () => {
        this.currentTime = 0;
        audio.play();
    }, false);
    

    gameover.addEventListener("click", () => {
        gameover.setAttribute("style", "visibility: hidden")
        playGame();
    })

    volControl.addEventListener("click", () => {
        audio.muted = volControl.className === 'fas fa-volume-up' ? true : false
        volControl.className = volControl.className === 'fas fa-volume-up' ? 'fas fa-volume-off' : 'fas fa-volume-up'
    })

    menu.addEventListener("click", () => {
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
