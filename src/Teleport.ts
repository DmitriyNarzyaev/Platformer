import { Container, Sprite } from "pixi.js";

export class Teleport extends Container {
	public static TELEPORT_CONTAINER:PIXI.Container;
	public static TELEPORT_SPRITE:PIXI.Sprite;
	public teleportWidth:number;
	public teleportHeight:number;
	public hitbox:PIXI.Graphics;
	public rotationSpeed:number = .05;

	constructor() {
		super();
		Teleport.TELEPORT_CONTAINER = new PIXI.Container;
		this.addChild(Teleport.TELEPORT_CONTAINER);
		Teleport.TELEPORT_SPRITE = Sprite.from("teleport");
        Teleport.TELEPORT_CONTAINER.addChild(Teleport.TELEPORT_SPRITE);
        Teleport.TELEPORT_SPRITE.x -= Teleport.TELEPORT_SPRITE.width/2;
		Teleport.TELEPORT_SPRITE.y -= Teleport.TELEPORT_SPRITE.height/2;
		this.teleportWidth = Teleport.TELEPORT_SPRITE.width;
		this.teleportHeight = Teleport.TELEPORT_SPRITE.height;

		this.hitbox = new PIXI.Graphics;
		this.hitbox
			.beginFill(0x555555, 1)
			.drawRect(
				0,
				0,
				Teleport.TELEPORT_SPRITE.width,
				Teleport.TELEPORT_SPRITE.height
			);
		this.addChild(this.hitbox);
    }
}