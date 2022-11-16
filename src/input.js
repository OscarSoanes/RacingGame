export default class InputHandler {
    constructor(car) {
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowUp':
                    car.moveUp();
                    break;
                case 'ArrowDown':
                    car.moveDown();
                    break;
                case 'ArrowLeft':
                    car.moveLeft();
                    break;
                case 'ArrowRight':
                    car.moveRight();
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.key) {
                case 'ArrowUp':
                    if (car.speedY < 0) car.stop();
                    break;
                case 'ArrowDown':
                    if (car.speedY > 0) car.stop();
                    break;
                case 'ArrowLeft':
                    if (car.speedX < 0) car.stop();
                    break;
                case 'ArrowRight':
                    if (car.speedX > 0) car.stop();
                    break;
            }
        });
    }
            
}