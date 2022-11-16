export default class Car {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.width = 30;
        this.height = 50;

        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight / 2 - this.height / 2,
        };

        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = 0.4;

        this.maxSpeed = 3
    }

    moveLeft() {
        if (this.speedX > -this.maxSpeed) {
            this.speedX -= this.acceleration;
        }
    }

    moveRight() {
        if (this.speedX < this.maxSpeed) {
            this.speedX += this.acceleration;
        }
    }

    moveUp() {
        if (this.speedY > -this.maxSpeed) {
            this.speedY -= this.acceleration;
        }
    }

    moveDown() {
        if (this.speedY < this.maxSpeed) {
            this.speedY += this.acceleration;
        }
    }

    stop() {
        this.speedX = 0;
        this.speedY = 0;
    }

    update(deltaTime) {
        console.log(this.speedX);
        this.position.x += this.speedX;
        this.position.y += this.speedY;

        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > this.gameWidth) {
            this.position.x = this.gameWidth - this.width;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#abc'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}