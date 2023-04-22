import Car from "../src/car.js";
import InputHandler from "../src/input.js";
import Map from "../src/map.js";
import {getVolume} from "./getVolume.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.startingData = {};
    this.setStartingData();

    this.map = new Map(this);

    this.car = new Car(this, this.startingData[0].position, this.startingData[0].keys, "player1");
    new InputHandler(this.car);
    this.car2 = new Car(this, this.startingData[1].position, this.startingData[1].keys, "player2");
    new InputHandler(this.car2);

    this.finish1 = false;
    this.finish2 = false;
    this.start = this.start();
    this.countdown = 3;

    this.audio = new Audio("./audio/start.mp3");
    this.audio.play();
    this.audio.loop = true;
    this.audio.volume = 0.1;

    this.singlePlayer = false;
  }

  update(deltaTime) {
    if (getVolume() < 0.1) {
      this.audio.volume = getVolume();
    } else {
      this.audio.volume = 0.1;
    }

    if (this.countdown !== 0) {
      return;
    }

    if (this.singlePlayer === true) {
      if (this.finish1 === true) {
        this.end();
      }
      if (this.finish1 === true || this.start !== true) {
        return;
      }
      this.finish1 = this.car.update(deltaTime);
      return;
    }

    if (this.finish1 === true && this.finish2 === true) {
      this.end();
    }
    if ((this.finish1 === true && this.finish2 === true) || this.start !== true) {
      return;
    }
    this.finish1 = this.car.update(deltaTime);

    this.finish2 = this.car2.update(deltaTime);
  }

  draw(ctx) {
    this.map.draw(ctx);
  }

  drawLater(ctx) {
    if (this.singlePlayer === true) {
      if (this.finish1 === true || this.start !== true) {
        return;
      }
      this.car.draw(ctx);
      return;
    }

    if ((this.finish1 === true && this.finish2 === true) || this.start !== true) {
      return;
    }
    this.car.draw(ctx);
    this.car2.draw(ctx);
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
        countdownText.textContent = "3...";
      } else {
        beepAudio.play();
      }
    }, 1000);
    await new Promise((resolve) => setTimeout(resolve, (this.countdown + 1) * 1000));
  }

  start() {
    const btn = document.getElementById("start-btn");
    const lapData = document.getElementById("lap-data");

    btn.addEventListener("click", () => {
      const displayMenu = document.getElementById("start-screen");
      displayMenu.classList.add("none");
      this.audio.pause();
      this.audio.currentTime = 0;
      this.countdown = 3;
      this.countDown();

      const secondPlayer = document.getElementById("lap-count-p2");
      lapData.classList.remove("hide");
      secondPlayer.classList.remove("none");

      this.start = true;
    });

    const singlePlayerStart = document.getElementById("solo-start");
    singlePlayerStart.addEventListener("click", () => {
      const displayMenu = document.getElementById("start-screen");
      displayMenu.classList.add("none");
      this.audio.pause();
      this.audio.currentTime = 0;
      this.countdown = 3;
      this.countDown();

      this.singlePlayer = true;
      lapData.classList.remove("hide");
      this.start = true;
    });
  }

  end() {
    this.start = false;
    this.finish1 = false;
    this.finish2 = false;
    this.singlePlayer = undefined;
    const lapData = document.getElementById("lap-data");
    lapData.classList.add("hide");
    const secondPlayer = document.getElementById("lap-count-p2");
    secondPlayer.classList.add("none");

    const displayMenu = document.getElementById("finish-screen");
    displayMenu.classList.remove("none");

    const btn = document.getElementById("end-btn");
    btn.addEventListener("click", () => {
      displayMenu.classList.add("none");

      const startMenu = document.getElementById("start-screen");
      startMenu.classList.remove("none");

      const lapCounter = document.getElementById("lap-count");
      lapCounter.textContent = "Player 1 Lap Counter: 0/3";

      const lapCounterP2 = document.getElementById("lap-count-p2");
      lapCounterP2.textContent = "Player 2 Lap Counter: 0/3";
      console.log(this.startingData);
      this.setStartingData();
      this.car = new Car(this, this.startingData[0].position, this.startingData[0].keys, "player1");
      new InputHandler(this.car);
      this.car2 = new Car(this, this.startingData[1].position, this.startingData[1].keys, "player2");
      new InputHandler(this.car2);

      this.audio.play();
    });
  }

  setStartingData() {
    this.startingData = [
      {
        position: {
          x: this.gameWidth / 2 - 50 / 2,
          y: this.gameHeight / 2 - 75 - 30 / 2,
        },
        keys: {
          W: false,
          A: false,
          D: false,
          S: false,
        },
      },
      {
        position: {
          x: this.gameWidth / 2 + 50 / 2,
          y: this.gameHeight / 2 - 50 / 2,
        },
        keys: {
          ArrowUp: false,
          ArrowLeft: false,
          ArrowRight: false,
          ArrowDown: false,
        },
      },
    ];
  }
}
