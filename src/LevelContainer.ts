import Container = PIXI.Container;
import { Texture, TilingSprite } from "pixi.js";
import { Player } from "./Player";

export default class LevelContainer extends Container {
	public static readonly WIDTH:number = 4000;
	public static readonly HEIGHT:number = 1500;
    private _background:TilingSprite;
    public static PLAYER_1:Player;

	constructor() {
		super();

        this.initBackground();
        this.initPlayer();
	}

	private initBackground():void {
		this._background = this.addChild(new TilingSprite(Texture.from("bg.png"), 100, 100));
		this._background.width = LevelContainer.WIDTH;
		this._background.height = LevelContainer.HEIGHT;
    }
    
    private initPlayer():void {
		LevelContainer.PLAYER_1 = new Player();							//PLAYER
		this.addChild(LevelContainer.PLAYER_1);
		LevelContainer.PLAYER_1.x = 100;
		LevelContainer.PLAYER_1.y = 100;
	}
}