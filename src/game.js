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
  }

  update(deltaTime) {
    this.car.update(deltaTime);
  }

  draw(ctx) {
    this.map.draw(ctx);
  }

  drawLater(ctx) {
    this.car.draw(ctx);
  }
}
