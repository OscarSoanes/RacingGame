export default class InputHandler {
    constructor(car) {
        document.addEventListener('keydown', (event) => {
            if (event.key == "ArrowUp") {
                car.acceleration.x = Math.cos(car.rotation) * 0.05;
                car.acceleration.y = Math.sin(car.rotation) * 0.05;
            } else {
                car.acceleration.x = 0;
                car.acceleration.y = 0;
            }

            // console.log(car.acceleration);

            car.updatePosition();
        });

        // document.addEventListener('keydown', (event) => {
        //     if (event.key == "ArrowDown") {
        //         car.moveDown();
        //     }
        // });

        document.addEventListener('keydown', (event) => {
            if (event.key == "ArrowLeft") {
                car.rotation += - 0.03;
                car.updatePosition();

            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key == "ArrowRight") {
                car.rotation -= 0.03;
                car.updatePosition();
            }
        });



        document.addEventListener('keyup', (event) => {
            switch(event.key) {
                case 'ArrowUp':
                    break;
                case 'ArrowDown':
                    break;
                case 'ArrowLeft':
                    break;
                case 'ArrowRight':
                    break;
            }
        });
    }
            
}