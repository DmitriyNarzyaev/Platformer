import Container = PIXI.Container;
import { Texture, TilingSprite } from "pixi.js";
import { Player } from "./Player";
import { Platform } from "./Platform";

export default class LevelContainer extends Container {
	public static readonly WIDTH:number = 4000;
    public static readonly HEIGHT:number = 1500;
    public static PLAYER_1:Player;
    private _background:TilingSprite;
    private _blockSize:number = 50;

	constructor() {
		super();

        this.initBackground();
        this.initPlayer();
        this.stageLoader();
	}

    //создание заднего фона
	private initBackground():void {
		this._background = this.addChild(new TilingSprite(Texture.from("bg.png"), 100, 100));
		this._background.width = LevelContainer.WIDTH;
		this._background.height = LevelContainer.HEIGHT;
    }
    
    //создание игрока
    private initPlayer():void {
		LevelContainer.PLAYER_1 = new Player();
		this.addChild(LevelContainer.PLAYER_1);
		LevelContainer.PLAYER_1.x = 100;
		LevelContainer.PLAYER_1.y = 100;
    }

    //создание платформ
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
	x:number;
	y:number;
	width:number;
	height:number;
}