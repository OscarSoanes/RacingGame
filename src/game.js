import Car from "../src/car.js";
import InputHandler from "../src/input.js";
import Map from "../src/map.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.map = new Map(this);
    this.car = new Car(this);
    new InputHandler(this.car);

    this.finish = false;
  }

  update(deltaTime) {
    if (this.finish === true) {
      return;
    }
    this.finish = this.car.update(deltaTime);
    console.log(this.finish);
  }

  draw(ctx) {
    this.map.draw(ctx);
  }

  drawLater(ctx) {
    if (this.finish === true) {
      return;
    }
    this.car.draw(ctx);
  }
}
