export default class InputHandler {
  constructor(car) {
    window.addEventListener("keydown", (ev) => {
      car.keys[ev.code] = true;
    });

    window.addEventListener("keyup", (ev) => {
      car.keys[ev.code] = false;
    });
  }
}
