
import Phaser from 'phaser';
import Pipe from './pipe';
module config from '../../../config';

export default class PipeGroup extends Phaser.Group {

  constructor(game, parent) {
    super(game, parent);

    this.topPipe = new Pipe(this.game, 0, 0, 0);
    this.add(this.topPipe);

    this.bottomPipe = new Pipe(this.game, 0, this.bottomPipeY, 1);
    this.add(this.bottomPipe);

    this.setAll('body.velocity.x', config.pipes.velocity);
    this.hasScored = false;
    this.exists = true;
  }

  get bottomPipeY() {
    return 320 + config.pipes.gapSize;
  }

  update() {
    this.checkWorldBounds();
  }

  stop() {
    this.setAll('body.velocity.x', 0);
  }

  reset(x, y) {
    this.topPipe.reset(0, 0);
    this.bottomPipe.reset(0, this.bottomPipeY);

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
