export default class Car {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 50;
    this.height = 30;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight / 2 - this.height / 2,
    };

    this.rotation = 0;

    this.keys = {
      ArrowUp: false,
      ArrowLeft: false,
      ArrowRight: false,
      ArrowDown: false,
    };

    this.speed = 0.0001;
    this.maxSpeed = 0.3;
    this.acceleration = 0.0000001;

    this.xVelocity = 0;
    this.yVelocity = 0;

    this.xSpeed = 0;
    this.ySpeed = 0;

    this.points = {
      point1: {
        x: 0,
        y: 0,
      },
      point2: {
        x: 0,
        y: 0,
      },
      point3: {
        x: 0,
        y: 0,
      },
      point4: {
        x: 0,
        y: 0,
      },
    };
  }

  // look at getters in week 6
  createPoints() {
    let halfWidth = this.width / 2;
    let halfHeight = this.height / 2;

    // Top Left (upon init)
    this.points.point1 = {
      x: this.position.x - halfWidth * Math.cos(this.rotation) + halfHeight * Math.sin(this.rotation),
      y: this.position.y - halfWidth * Math.sin(this.rotation) - halfHeight * Math.cos(this.rotation),
    };

    // Top Right (upon init)
    this.points.point2 = {
      x: this.position.x + halfWidth * Math.cos(this.rotation) + halfHeight * Math.sin(this.rotation),
      y: this.position.y + halfWidth * Math.sin(this.rotation) - halfHeight * Math.cos(this.rotation),
    };

    this.points.point3 = {
      x: this.position.x - halfWidth * Math.cos(this.rotation) - halfHeight * Math.sin(this.rotation),
      y: this.position.y - halfWidth * Math.sin(this.rotation) + halfHeight * Math.cos(this.rotation),
    };

    // Bottom Right (upon init)
    this.points.point4 = {
      x: this.position.x + halfWidth * Math.cos(this.rotation) - halfHeight * Math.sin(this.rotation),
      y: this.position.y + halfWidth * Math.sin(this.rotation) + halfHeight * Math.cos(this.rotation),
    };
  }

  updatePosition() {
    this.xVelocity += this.xSpeed;
    this.yVelocity += this.ySpeed;

    this.xVelocity *= 0.97;
    this.yVelocity *= 0.97;

    this.position.x += this.xVelocity;
    this.position.y += this.yVelocity;
  }

  update(deltaTime) {
    // if (
    //   this.xSpeed > this.maxSpeed ||
    //   this.xSpeed < -this.maxSpeed ||
    //   this.ySpeed > this.maxSpeed ||
    //   this.ySpeed < -this.maxSpeed
    // ) {
    //   this.updatePosition();
    //   this.createPoints();
    // }

    console.log(this.ySpeed, this.xSpeed);

    if (this.ySpeed !== 0 || this.ySpeed !== 0) {
      // Rotation
      if (this.keys.ArrowLeft == true) {
        this.rotation -= 0.05;
      }
      if (this.keys.ArrowRight) {
        this.rotation += 0.05;
      }
    }

    if (this.keys.ArrowUp || this.keys.ArrowDown) {
      // Speed
      this.xSpeed += (this.keys.ArrowDown - this.keys.ArrowUp) * this.speed * Math.cos(this.rotation) * deltaTime;
      this.ySpeed += (this.keys.ArrowDown - this.keys.ArrowUp) * this.speed * Math.sin(this.rotation) * deltaTime;
    } else {
      // Deceleration
      this.xSpeed *= 0.1;
      this.ySpeed *= 0.1;

      // Stopping
      if (this.xSpeed < this.speed) {
        this.xSpeed = 0;
      }
      if (this.ySpeed < this.speed) {
        this.ySpeed = 0;
      }
    }

    // TODO Collision Detection *on 0 index*
    // for loop on each point
    this.updatePosition();
    this.createPoints();
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    ctx.fillStyle = "black";
    // ctx.fillRect(-this.height / 2, this.width / 2, this.height, this.width);
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();

    // DEBUGGING EACH POINT
    ctx.fillStyle = "red";
    ctx.fillRect(this.points.point1.x, this.points.point1.y, 5, 5);
    ctx.fillRect(this.points.point2.x, this.points.point2.y, 5, 5);
    ctx.fillRect(this.points.point3.x, this.points.point3.y, 5, 5);
    ctx.fillRect(this.points.point4.x, this.points.point4.y, 5, 5);
    ctx.restore();
  }
}
