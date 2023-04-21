import Car from "../src/car.js";
import InputHandler from "../src/input.js";
import Map from "../src/map.js";
import {getVolume} from "./getVolume.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.map = new Map(this);
    this.car = new Car(this);
    new InputHandler(this.car);

    this.finish = false;
    this.start = this.start();
    this.countdown = 3;

    this.audio = new Audio("./audio/start.mp3");
    this.audio.play();
    this.audio.loop = true;
    this.audio.volume = 0.1;
  }

  update(deltaTime) {
    if (getVolume() < 0.1) {
      this.audio.volume = getVolume();
    } else {
      this.audio.volume = 0.1;
    }
    if (this.finish === true) {
      this.end();
    }
    if (this.finish === true || this.start !== true) {
      return;
    }
    if (this.countdown !== 0) {
      return;
    }
    this.finish = this.car.update(deltaTime);
  }

  draw(ctx) {
    this.map.draw(ctx);
  }

  drawLater(ctx) {
    if (this.finish === true || this.start !== true) {
      return;
    }
    this.car.draw(ctx);
  }

  async countDown() {
    const container = document.getElementById("countdown");
    container.classList.remove("none");
    const countdownText = document.getElementById("countdown-text");

    const beepAudio = new Audio("./audio/beep.mp3");
    beepAudio.play();
    const interval = setInterval(() => {
      this.countdown--;
      countdownText.textContent = `${this.countdown}...`;

      if (this.countdown === 0) {
        clearInterval(interval);
        container.classList.add("none");
      } else {
        beepAudio.play();
      }
    }, 1000);
    await new Promise((resolve) => setTimeout(resolve, (countdown + 1) * 1000));
  }

  start() {
    const btn = document.getElementById("start-btn");

    btn.addEventListener("click", () => {
      const displayMenu = document.getElementById("start-screen");
      displayMenu.classList.add("none");
      this.audio.pause();
      this.audio.currentTime = 0;
      this.countDown();

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

      this.car = new Car(this, this.volume);
      new InputHandler(this.car);

      this.audio.play();
    });
  }
}
