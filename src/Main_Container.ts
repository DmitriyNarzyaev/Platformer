import Container = PIXI.Container;
import { Graphics } from "pixi.js";
import LevelContainer from "./LevelContainer";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1600;
	public static readonly HEIGHT:number = 800;
	private _levelContainer:LevelContainer;

	constructor() {
		super();

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
}