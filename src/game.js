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
    this.start = this.start();
  }

  update(deltaTime) {
    if (this.finish === true) {
      this.end();
    }
    if (this.finish === true || this.start !== true) {
      return;
    }
    this.finish = this.car.update(deltaTime);
    console.log(this.finish);
  }

  draw(ctx) {
    this.map.draw(ctx);
  }

  drawLater(ctx) {
    console.log(this.start);
    if (this.finish === true || this.start !== true) {
      return;
    }
    this.car.draw(ctx);
  }

  start() {
    const btn = document.getElementById("start-btn");

    btn.addEventListener("click", () => {
      const displayMenu = document.getElementById("start-screen");
      displayMenu.classList.add("none");
      this.start = true;
    });
  }

  end() {
    this.start = false;
    this.finish = false;
    const displayMenu = document.getElementById("finish-screen");
    displayMenu.classList.remove("none");

    const btn = document.getElementById("end-btn");
    btn.addEventListener("click", () => {
      displayMenu.classList.add("none");

      const startMenu = document.getElementById("start-screen");
      startMenu.classList.remove("none");

      const lapCounter = document.getElementById("lap-count");
      lapCounter.textContent = "Lap Counter 0/3";

      this.car = new Car(this);
      new InputHandler(this.car);
    });
  }
}
