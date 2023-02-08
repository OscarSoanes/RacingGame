export default class InputHandler {
  constructor(car) {
    window.addEventListener("keydown", (ev) => {
      car.keys[ev.key] = true;
    });

    window.addEventListener("keyup", (ev) => {
      car.keys[ev.key] = false;
    });
  }
}
