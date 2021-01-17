import Container = PIXI.Container;
import { Graphics } from "pixi.js";
import LevelContainer from "./LevelContainer";
import Global from "./Global";
import { Title } from "./Title";
import Button from "./Button";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1600;
	public static readonly HEIGHT:number = 800;
	private _levelContainer:LevelContainer;
	private _title:Title;
	private _button:Button;

	constructor() {
		super();

		this.initialTitle();

	}

	private initialTitle():void {
		this._title = new Title();
		this.addChild(this._title);


		this._button = new Button("START", () => {this.initialGame();});
		this.addChild(this._button);
		this._button.x = (Main_Container.WIDTH - this._button.width)/2;
		this._button.y = Main_Container.HEIGHT - this._button.height*2;
	}

	private initialGame():void {
		this.removeChild(this._title);
		this.removeChild(this._button);

		Global.PIXI_APP.ticker.add(this.ticker, this);
		this.initialMask();
		this._levelContainer = new LevelContainer;
		this.addChild(this._levelContainer);
	}

	private initialMask():void {
		let containerMask: Graphics = new Graphics;
		containerMask.beginFill(0x00ff48);
		containerMask.drawRect(0, 0, Main_Container.WIDTH, Main_Container.HEIGHT);
		this.addChild(containerMask);
		this.mask = containerMask;
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