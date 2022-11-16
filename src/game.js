import Car from "../src/car.js";
import InputHandler from "../src/input.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.car = new Car(this);
        new InputHandler(this.car);
    }

    update(deltaTime) {
        this.car.update(deltaTime);
    }

    draw(ctx) {
        this.car.draw(ctx);
    }
}