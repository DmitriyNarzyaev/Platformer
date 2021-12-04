import { Container, Sprite } from "pixi.js";

export class Player extends Container {

	public static PLAYER_CONTAINER:PIXI.Container;
	public static PLAYER_SPRITE:PIXI.Sprite;
	public movingSpeed:number = 6;
	public jumpSpeed:number = -16;
	public speedY:number = 0;
	public gravity:number = 0.6;
	public canJump:boolean = true;

	constructor() {
		super();

		Player.PLAYER_CONTAINER = new PIXI.Container;
		this.addChild(Player.PLAYER_CONTAINER);
		Player.PLAYER_SPRITE = Sprite.from("player");
		Player.PLAYER_CONTAINER.addChild(Player.PLAYER_SPRITE);
    }
}
