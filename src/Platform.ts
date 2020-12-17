import { Container, NineSlicePlane, Sprite, Texture } from "pixi.js";

export class Platform extends Container{
	public damage:boolean = false;

	constructor(texture:string, nineSlice:string, platformWidth:number, platformHeight:number) {
        super();

		if (nineSlice == "true") {
			let block:NineSlicePlane = new NineSlicePlane (
				Texture.from(texture),
				10,
				5,
				10,
				5
			);
			this.addChild(block);
			block.width = platformWidth;
			block.height = platformHeight;
		} else {
			let block:PIXI.Sprite = Sprite.from(texture);
			this.addChild(block);
			block.width = 50;
			block.height = 50;
		}
        
    }
}