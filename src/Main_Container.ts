import Container = PIXI.Container;
import { Graphics } from "pixi.js";
import LevelContainer from "./LevelContainer";
import Global from "./Global";
import { Title } from "./Title";
import Button from "./Button";
import Stage1 from "./Stage1";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1600;
	public static readonly HEIGHT:number = 800;
	private _levelContainer:LevelContainer;
	private _title:Title;
	private _button:Button;
	private _containerMask:PIXI.Graphics;

	constructor() {
		super();
		this.initialTitle("START");
	}

	private initialTitle(buttonName:string):void {
		this._title = new Title();
		this.addChild(this._title);

		this._button = new Button(buttonName, () => {this.initialGame();});
		this.addChild(this._button);
		this._button.x = (Main_Container.WIDTH - this._button.width)/2;
		this._button.y = Main_Container.HEIGHT - this._button.height*2;
	}

	private initialGame():void {
		this.removeChild(this._title);
		this.removeChild(this._button);

		Global.PIXI_APP.ticker.add(this.ticker, this);
		//this.initialMask();
		this._levelContainer = new LevelContainer();
		this.addChild(this._levelContainer);

		Global.STAGE = new Stage1;
		this._levelContainer.addChild(Global.STAGE);
	}

	private initialMask():void {
		this._containerMask = new Graphics;
		this._containerMask.beginFill(0x00ff48);
		this._containerMask.drawRect(0, 0, Main_Container.WIDTH, Main_Container.HEIGHT);
		this.addChild(this._containerMask);
		this.mask = this._containerMask;
	}

	private ticker():void {
		const minX:number = (LevelContainer.WIDTH - Main_Container.WIDTH) * -1;
		const maxX:number = 0;
		const calculatedX:number = ((Main_Container.WIDTH - LevelContainer.PLAYER_1.width) / 2) - LevelContainer.PLAYER_1.x;
		this._levelContainer.x = Math.min(maxX, Math.max(minX, calculatedX));

		const minY:number = (LevelContainer.HEIGHT - Main_Container.HEIGHT) * -1;
		const maxY:number = 0;
		const calculatedY:number = ((Main_Container.HEIGHT - LevelContainer.PLAYER_1.height) / 2) - LevelContainer.PLAYER_1.y;
		this._levelContainer.y = Math.min(maxY, Math.max(minY, calculatedY));
	}
}