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

    this.speed = 3;

    this.points = {
      point1: {
        x: this.position.x - this.width / 2,
        y: this.position.y - this.height / 2,
      },
      point2: {
        x: this.position.x / 2,
        y: this.position.y / 2,
      },
      point3: {
        x: this.position.x / 2,
        y: this.position.y / 2,
      },
      point4: {
        x: this.position.x / 2,
        y: this.position.y / 2,
      },
    };
  }

  createPoints() {
    let halfWidth = this.width / 2;
    let halfHeight = this.height / 2;

    // Top Left (upon init)
    this.points.point1 = {
      x:
        this.position.x -
        halfWidth * Math.cos(this.rotation) +
        halfHeight * Math.sin(this.rotation),
      y:
        this.position.y -
        halfWidth * Math.sin(this.rotation) -
        halfHeight * Math.cos(this.rotation),
    };

    // Top Right (upon init)
    this.points.point2 = {
      x:
        this.position.x +
        halfWidth * Math.cos(this.rotation) +
        halfHeight * Math.sin(this.rotation),
      y:
        this.position.y +
        halfWidth * Math.sin(this.rotation) -
        halfHeight * Math.cos(this.rotation),
    };

    this.points.point3 = {
      x:
        this.position.x -
        halfWidth * Math.cos(this.rotation) -
        halfHeight * Math.sin(this.rotation),
      y:
        this.position.y -
        halfWidth * Math.sin(this.rotation) +
        halfHeight * Math.cos(this.rotation),
    };

    // Bottom Right (upon init)
    this.points.point4 = {
      x:
        this.position.x +
        halfWidth * Math.cos(this.rotation) -
        halfHeight * Math.sin(this.rotation),
      y:
        this.position.y +
        halfWidth * Math.sin(this.rotation) +
        halfHeight * Math.cos(this.rotation),
    };
  }

  update(deltaTime) {
    // defines rotation
    if (this.keys.ArrowUp == true) {
      if (this.keys.ArrowLeft == true) {
        this.rotation -= 0.1;
      }
      if (this.keys.ArrowRight == true) {
        this.rotation += 0.1;
      }
    }

    const moveX =
      (this.keys.ArrowDown - this.keys.ArrowUp) *
      this.speed *
      Math.cos(this.rotation);
    const moveY =
      (this.keys.ArrowDown - this.keys.ArrowUp) *
      this.speed *
      Math.sin(this.rotation);

    this.position.x += moveX;
    this.position.y += moveY;

    this.createPoints();
    console.log(this.points);
    if (this.position.y - this.height / 2 < 0) {
      this.position.y = 0 + this.height / 2;
    }
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = "black";
    // ctx.fillRect(-this.height / 2, this.width / 2, this.height, this.width);
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();

    // temporary
    ctx.fillStyle = "red";
    ctx.fillRect(this.points.point1.x, this.points.point1.y, 5, 5);
    ctx.fillRect(this.points.point2.x, this.points.point2.y, 5, 5);
    ctx.fillRect(this.points.point3.x, this.points.point3.y, 5, 5);
    ctx.fillRect(this.points.point4.x, this.points.point4.y, 5, 5);
    ctx.restore();
  }
}
