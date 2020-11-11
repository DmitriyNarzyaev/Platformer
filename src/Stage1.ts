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
                    let blockImage:string = json.blocks[0].type;
                    let blockX:number = this._blockSize * json.blocks[0].x;
                    let blockY:number = this._blockSize * json.blocks[0].y;
                    let blockWidth:number = this._blockSize * json.blocks[0].width;
					let blockHeight:number = this._blockSize * json.blocks[0].height;
                    let platform:Platform = new Platform(blockImage, blockWidth, blockHeight);
					this.addChild(platform);
					platform.x = blockX
					platform.y = blockY
					LevelContainer.PLATFORM_ARRAY.push(platform);
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