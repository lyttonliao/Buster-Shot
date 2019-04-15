import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById("my-canvas");
    canvasEl.width = 720;
    canvasEl.height = 405;


    const ctx = canvasEl.getContext("2d");
    let game = new Game(ctx);
    game.startAnimating();


    
    // const playGame = () => {
    //     game = new Game(ctx);
    //     game.play();
    // }

    // playGame();
});
