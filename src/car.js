export default class Car {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 50;
    this.height = 30;

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
    };

    this.friction = 0.95;

    this.rotation = 0;

    this.moving = false;

    this.keys = {
      ArrowUp: false,
      ArrowLeft: false,
      ArrowRight: false,
      ArrowDown: false,
    };

    this.speed = 5;
  }

  updatePosition() {
    // update velocity
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    // friction
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    // update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  update(deltaTime) {
    // this.updatePosition();

    this.position.x +=
      (this.keys.ArrowRight - this.keys.ArrowLeft) * this.speed;
    this.position.y += (this.keys.ArrowDown - this.keys.ArrowUp) * this.speed;
    console.log(deltaTime);
    // if (this.moving === true) {
    //   this.position.x += this.velocity.x;
    //   this.position.y += this.velocity.y;
    // }

    // if (this.position.x < 0) this.position.x = 0;
    // if (this.position.x + this.width > this.gameWidth) {
    //   this.position.x = this.gameWidth - this.width;
    // }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = "black";
    // ctx.fillRect(-this.height / 2, this.width / 2, this.height, this.width);
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}
