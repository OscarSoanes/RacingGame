export default class Car {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.width = 50;
        this.height = 100;

        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight / 2 - this.height / 2,
        };
    }

    update(deltaTime) {

    }

    draw(ctx) {
        ctx.fillStyle = '#abc'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}