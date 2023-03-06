export default class Car {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
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
    this.maxSpeed = 0.03;
    this.acceleration = 0.00000001;

    this.xVelocity = 0;
    this.yVelocity = 0;

    this.xSpeed = 0;
    this.ySpeed = 0;

    this.moving = false;

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
    if (this.moving == true) {
      if (this.keys.ArrowLeft == true) {
        this.rotation -= 0.02;
      }
      if (this.keys.ArrowRight) {
        this.rotation += 0.02;
      }
    }

    if (this.keys.ArrowUp || this.keys.ArrowDown) {
      this.moving = true;
      // Speed
      this.xSpeed += (this.keys.ArrowDown - this.keys.ArrowUp) * this.speed * Math.cos(this.rotation) * deltaTime;
      this.ySpeed += (this.keys.ArrowDown - this.keys.ArrowUp) * this.speed * Math.sin(this.rotation) * deltaTime;
    } else {
      // Deceleration
      this.xSpeed *= 0.95;
      this.ySpeed *= 0.95;

      // Stopping
      if (this.ySpeed < this.speed) {
        this.xSpeed = 0;
        this.moving = false;
      }
      if (this.ySpeed < this.speed) {
        this.ySpeed = 0;
        this.moving = false;
      }
    }

    // Prevents permnement static acceleration
    if (this.keys.ArrowDown && this.keys.ArrowDown) {
      this.xSpeed *= 0.95;
      this.ySpeed *= 0.95;
    }

    // TODO UPDATE BASED ON VELOCITY (NOT KEYS)
    // TODO Collision Detection ON BARRIER/ GRASS

    for (const position in this.points) {
      this.checkPositionColour(this.points[position]);
      if (
        (this.points[position].x < 0 && this.xVelocity < -this.speed) ||
        (this.points[position].y < 0 && this.yVelocity < -this.speed) ||
        (this.points[position].x > this.gameWidth && this.xVelocity > this.speed) ||
        (this.points[position].y > this.gameHeight && this.yVelocity > this.speed)
      ) {
        console.log("crash!!!");
        this.moving = false;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        return;
      }
    }

    // for loop on each point
    this.updatePosition();
    this.createPoints();
  }

  checkPositionColour(position) {
    function between(value, min, max) {
      return value >= min && value <= max;
    }
    const canvas = document.getElementById("game").getContext("2d");
    const pixelData = canvas.getImageData(position.x, position.y, 1, 1, {colorSpace: "srgb"}).data;
    const roadValues = [
      51, 59, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
      87, 88, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 105, 106, 107, 108, 109, 110, 111, 112, 116, 122,
      132, 136, 140, 143, 144, 147, 151, 153, 152, 158, 159, 160, 161, 161, 162, 163, 164, 165, 166, 167, 168, 170, 171,
      172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194,
      195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 248, 255,
    ];

    const outerValues = [
      [230, 230, 230],
      [201, 115, 145],
      [115, 115, 115],
      [193, 39, 45],
      [180, 128, 105],
      [106, 67, 69],
      [181, 161, 162],
      [210, 203, 191],
      [212, 135, 138],
      [202, 87, 91],
      [61, 62, 61],
      [170, 170, 170],
      [65, 81, 80],
      [207, 36, 41],
      [235, 255, 255],
      [173, 189, 185],
      [189, 16, 22],
      [232, 242, 242],
      [202, 8, 16],
      [148, 60, 60],
      [136, 40, 42],
      [76, 76, 76],
      [216, 154, 156],
      [192, 25, 33],
      [215, 189, 185],
      [246, 246, 246],
      [198, 63, 67],
      [223, 118, 122],
      [192, 99, 100],
      [222, 204, 203],
      [196, 78, 78],
      [211, 207, 204],
      [203, 102, 106],
      [208, 113, 117],
      [132, 142, 143],
    ];

    let isSideRoad = false;

    outerValues.every((colour) => {
      if (
        between(pixelData[0], colour[0] - 15, colour[0] + 15) &&
        between(pixelData[1], colour[1] - 15, colour[1] + 15) &&
        between(pixelData[2], colour[2] - 15, colour[2] + 15)
      ) {
        isSideRoad = true;
        return false;
      }
      return true;
    });

    if (roadValues.includes(pixelData[0]) && pixelData[0] === pixelData[1] && pixelData[0] === pixelData[2]) {
    } else if (isSideRoad) {
    } else {
      console.log(pixelData);
      // console.log("oh shit");
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    const carimg = new Image();
    carimg.src = "img\\car.png";
    ctx.drawImage(carimg, -this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.fillRect(-this.height / 2, this.width / 2, this.height, this.width);
    // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();

    // DEBUGGING EACH POINT
    ctx.fillStyle = "red";
    ctx.fillRect(this.points.point1.x, this.points.point1.y, 2, 2);
    ctx.fillRect(this.points.point2.x, this.points.point2.y, 2, 2);
    ctx.fillRect(this.points.point3.x, this.points.point3.y, 2, 2);
    ctx.fillRect(this.points.point4.x, this.points.point4.y, 2, 2);
    ctx.restore();
  }
}
