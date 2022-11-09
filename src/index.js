import Game from '../src/game.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = canvas.width = 800;
const GAME_HEIGHT = canvas.height = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);