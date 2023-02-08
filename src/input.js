export default class InputHandler {
  constructor(car) {
    window.addEventListener("keydown", (ev) => {
      car.keys[ev.key] = true;
    });

    window.addEventListener("keyup", (ev) => {
      car.keys[ev.key] = false;
    });

    // document.addEventListener("keydown", (event) => {
    //   if (event.key == "ArrowUp") {
    //     car.acceleration.x = Math.cos(car.rotation) * 0.05;
    //     car.acceleration.y = Math.sin(car.rotation) * 0.05;
    //   }

    //   // console.log(car.acceleration);

    //   car.updatePosition();
    //   car.moving = true;
    // });

    // // document.addEventListener('keydown', (event) => {
    // //     if (event.key == "ArrowDown") {
    // //         car.moveDown();
    // //     }
    // // });

    // document.addEventListener("keydown", (event) => {
    //   if (event.key == "ArrowLeft") {
    //     car.rotation += -0.07;
    //     car.updatePosition();
    //     car.moving = true;
    //   }
    // });

    // document.addEventListener("keydown", (event) => {
    //   if (event.key == "ArrowRight") {
    //     car.rotation -= 0.07;
    //     car.updatePosition();
    //     car.moving = true;
    //   }
    // });

    // document.addEventListener("keyup", (event) => {
    //   switch (event.key) {
    //     case "ArrowUp":
    //       car.acceleration.x = 0;
    //       car.acceleration.y = 0;
    //       break;
    //   }
    // });
  }
}
