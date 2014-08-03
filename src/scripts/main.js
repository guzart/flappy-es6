
import Phaser from 'phaser';
import Boot from './states/boot';
import Preloader from './states/preloader';
import Menu from './states/menu';
import Play from './states/play';

var cfg = require('../../config');
var game = new Phaser.Game(cfg);

game.state.add('boot', Boot);
game.state.add('preloader', Preloader);
game.state.add('menu', Menu);
game.state.add('play', Play);
game.state.start('boot');
