import { Container, Sprite } from "pixi.js";

export class Teleport extends Container {

	public static TELEPORT_CONTAINER:PIXI.Container;
	public static TELEPORT_SPRITE:PIXI.Sprite;
	public rotationSpeed:number = .05;

	constructor() {
		super();

		Teleport.TELEPORT_CONTAINER = new PIXI.Container;
		this.addChild(Teleport.TELEPORT_CONTAINER);
		Teleport.TELEPORT_SPRITE = Sprite.from("teleport");
        Teleport.TELEPORT_CONTAINER.addChild(Teleport.TELEPORT_SPRITE);
        Teleport.TELEPORT_SPRITE.x -= Teleport.TELEPORT_SPRITE.width/2;
		Teleport.TELEPORT_SPRITE.y -= Teleport.TELEPORT_SPRITE.height/2;
    }
}