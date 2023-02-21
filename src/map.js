export default class Map {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.background = new Image();
  }

  update(deltaTime) {}

  draw(ctx) {
    ctx.save();
    this.background.src = "..\\img\\Map1.jpg";
    ctx.drawImage(this.background, 0, 0, this.gameWidth, this.gameHeight);
    ctx.restore();
  }
}
