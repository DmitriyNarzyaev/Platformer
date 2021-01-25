import { Container, Sprite } from "pixi.js";

export class Teleport extends Container {
	public static TELEPORT_CONTAINER:PIXI.Container;
	public static TELEPORT_SPRITE:PIXI.Sprite;
	public hitbox:PIXI.Graphics;
	public rotationSpeed:number = .05;
	private hitboxMultiplier:number = .7;

	constructor() {
		super();
		
		Teleport.TELEPORT_CONTAINER = new PIXI.Container;
		this.addChild(Teleport.TELEPORT_CONTAINER);
		Teleport.TELEPORT_SPRITE = Sprite.from("teleport");
        Teleport.TELEPORT_CONTAINER.addChild(Teleport.TELEPORT_SPRITE);
        Teleport.TELEPORT_SPRITE.x -= Teleport.TELEPORT_SPRITE.width/2;
		Teleport.TELEPORT_SPRITE.y -= Teleport.TELEPORT_SPRITE.height/2;

		this.hitbox = new PIXI.Graphics;
		this.hitbox
			.beginFill(0x000000, .4)
			.drawRect(
				0,
				0,
				Teleport.TELEPORT_SPRITE.width * this.hitboxMultiplier,
				Teleport.TELEPORT_SPRITE.height * this.hitboxMultiplier
			);
		this.addChild(this.hitbox);
		this.hitbox.x -= this.hitbox.width/2;
		this.hitbox.y -= this.hitbox.height/2;
    }
}