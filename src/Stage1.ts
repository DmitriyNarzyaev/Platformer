import { Container } from "pixi.js";
import { Platform } from "./Platform";
import LevelContainer from "./LevelContainer";
import { Main } from "./Main";

export default class Stage1 extends Container {
    private _blockSize:number = 50;

	constructor() {
		super();
        this.stageLoader();
	}

    private stageLoader():void {
		const json:ILevel = Main.xhr.response;
		for (let iterator:number = 0; iterator < json.blocks.length; iterator++) {
			let blockImage:string = json.blocks[iterator].type;
			let blockDamage:string = json.blocks[iterator].damage;
			let nineSlice:string = json.blocks[iterator].nineSlice;
			let blockX:number = this._blockSize * json.blocks[iterator].x;
			let blockY:number = this._blockSize * json.blocks[iterator].y;
			let blockWidth:number = this._blockSize * json.blocks[iterator].width;
			let blockHeight:number = this._blockSize * json.blocks[iterator].height;
			let platform:Platform = new Platform(blockImage, nineSlice, blockWidth, blockHeight);
			this.addChild(platform);
			platform.x = blockX;
			platform.y = blockY;
			if (blockDamage == "false") {
				platform.damage = false;
			} else if (blockDamage == "true") {
				platform.damage = true;
			}
			LevelContainer.PLATFORM_ARRAY.push(platform);
		}
	}

}

interface ILevel {
	blocks:IBlock[];
}

interface IBlock {
	type:string;
	damage:string;
	nineSlice:string;
	x:number;
	y:number;
	width:number;
	height:number;
}