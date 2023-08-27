/**
 * @description Main Game Class
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2019 - 2023 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import 'phaser';
import { BootScene } from './scenes/boot-scene';
import { MainScene } from './scenes/main-scene';

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
	scale: {
		height: '100%',
		mode: Phaser.Scale.ENVELOP,
		parent: 'game',
		width: '100%'
	},
	scene: [BootScene, MainScene],
	title: 'astar-typescript-example',
	type: Phaser.AUTO,
	version: '1.0.0'
};

// game class
export class Game extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config);
	}
}

// when the page is loaded, create our game instance
window.addEventListener('load', () => {
	const game = new Game(config);
});
