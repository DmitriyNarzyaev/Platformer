import { Container, NineSlicePlane, Texture } from "pixi.js";

export class Platform extends Container{

	constructor(texture:string, platformWidth:number, platformHeight:number) {
        super();

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
    }
}