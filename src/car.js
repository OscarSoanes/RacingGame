export default class Car {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.width = 30;
        this.height = 50;

        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight / 2 - this.height / 2,
        };

        this.velocity = {
            x: 0,
            y: 0,
        };

        this.acceleration = {
            x: 0,
            y: 0,
        }

        this.friction = 0.97;

        this.rotation = 0;
    }

    updatePosition(obj) {
        // update velocity
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        console.log(this.velocity);

        // // friction
        // this.velocity.x *= this.friction;
        // this.velocity.y *= this.friction;

        // update position
        console.log(this.velocity);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

    }

    // moveLeft() {
    //     if (this.speedX > -this.maxSpeed) {
    //         this.speedX -= this.acceleration;
    //     }
    // }

    // moveRight() {
    //     if (this.speedX < this.maxSpeed) {
    //         this.speedX += this.acceleration;
    //     }
    // }

    // moveUp() {
    //     if (this.speedY > -this.maxSpeed) {
    //         this.speedY -= this.acceleration;
    //     }
    // }

    // moveDown() {
    //     if (this.speedY < this.maxSpeed) {
    //         this.speedY += this.acceleration;
    //     }
    // }

    // stop() {
    //     this.speedX = 0;
    //     this.speedY = 0;
    // }

    update(deltaTime) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        // console.log(`${this.position.x} ${this.position.y}`);
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > this.gameWidth) {
            this.position.x = this.gameWidth - this.width;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = 'black';
        ctx.fillRect(-10, 5, 20, 10);
        ctx.restore();


        // ctx.fillStyle = '#abc'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}