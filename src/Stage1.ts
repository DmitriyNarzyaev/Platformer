import { Container } from "pixi.js";
import { Platform } from "./Platform";
import LevelContainer from "./LevelContainer";
import { Main } from "./Main";

export default class Stage1 extends Container {
    private _blockSize:number = 50;
	private _level:ILevel;

	constructor(level:ILevel) {
		super();
		this._level = level;
        this.stageLoader();
	}

    private stageLoader():void {
		for (let iterator:number = 0; iterator < this._level.blocks.length; iterator++) {
			let blockImage:string = this._level.blocks[iterator].type;
			let blockDamage:string = this._level.blocks[iterator].damage;
			let nineSlice:string = this._level.blocks[iterator].nineSlice;
			let blockX:number = this._blockSize * this._level.blocks[iterator].x;
			let blockY:number = this._blockSize * this._level.blocks[iterator].y;
			let blockWidth:number = this._blockSize * this._level.blocks[iterator].width;
			let blockHeight:number = this._blockSize * this._level.blocks[iterator].height;
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
