
import Phaser from 'phaser';
import Pipe from './pipe';

export default class PipeGroup extends Phaser.Group {

  constructor(game, parent) {
    super(game, parent);

    this.topPipe = new Pipe(this.game, 0, 0, 0);
    this.add(this.topPipe);

    this.bottomPipe = new Pipe(this.game, 0, 440, 1);
    this.add(this.bottomPipe);

    this.setAll('body.velocity.x', -200);
    this.hasScored = false;
    this.exists = true;
  }

  update() {
    this.checkWorldBounds();
  }

  reset(x, y) {
    this.topPipe.reset(0, 0);
    this.bottomPipe.reset(0, 440);

    this.x = x;
    this.y = y;

    this.setAll('body.velocity.x', -200);
    this.hasScored = false;
    this.exists = true;
  }

  checkWorldBounds() {
    this.exists = this.topPipe.inWorld;
  }
}
