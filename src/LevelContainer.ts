import Container = PIXI.Container;
import { Texture, TilingSprite } from "pixi.js";

export default class LevelContainer extends Container {
	public static readonly WIDTH:number = 4000;
	public static readonly HEIGHT:number = 1500;
	private _background:TilingSprite;

	constructor() {
		super();

        this.initBackground();
	}

	private initBackground():void {
		this._background = this.addChild(new TilingSprite(Texture.from("bg.png"), 100, 100));
		this._background.width = LevelContainer.WIDTH;
		this._background.height = LevelContainer.HEIGHT;
	}
}