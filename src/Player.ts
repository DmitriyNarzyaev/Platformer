import { Container, Sprite } from "pixi.js";

export class Player extends Container {

	public static PLAYER_CONTAINER:PIXI.Container;
	public static PLAYER_SPRITE:PIXI.Sprite;

	constructor() {
		super();

		Player.PLAYER_CONTAINER = new PIXI.Container;
		this.addChild(Player.PLAYER_CONTAINER);
		Player.PLAYER_SPRITE = Sprite.from("player");
		Player.PLAYER_CONTAINER.addChild(Player.PLAYER_SPRITE);
		Player.PLAYER_SPRITE.width /= 4;
		Player.PLAYER_SPRITE.height /= 4;

    }
}