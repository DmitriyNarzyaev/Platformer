import Container = PIXI.Container;
import { Platform } from "./Platform";
import LevelContainer from "./LevelContainer";

export default class Stage1 extends Container {
    private _blockSize:number = 50;

	constructor() {
		super();
        this.stageLoader();
	}

    private stageLoader():void {
		const xhr:XMLHttpRequest = new XMLHttpRequest();
		xhr.responseType = "json";
		xhr.open("GET", "level_1.json", true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					const json:ILevel = xhr.response;
					for (let iterator:number = 0; iterator < json.blocks.length; iterator++)
					{
						let blockImage:string = json.blocks[iterator].type;
						let blockDamage:string = json.blocks[iterator].damage;
						let blockX:number = this._blockSize * json.blocks[iterator].x;
						let blockY:number = this._blockSize * json.blocks[iterator].y;
						let blockWidth:number = this._blockSize * json.blocks[iterator].width;
						let blockHeight:number = this._blockSize * json.blocks[iterator].height;

						let platform:Platform = new Platform(blockImage, blockWidth, blockHeight);
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
				} else {
					console.log("ERROR");
				}
			}
		};
		xhr.send();
    }
}

interface ILevel {
	blocks:IBlock[];
}

interface IBlock {
	type:string;
	damage:string;
	x:number;
	y:number;
	width:number;
	height:number;
}