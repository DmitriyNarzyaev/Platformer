import Rectangle = PIXI.Rectangle;
import Application = PIXI.Application;
import Container = PIXI.Container;
import MainContainer from "./Main_Container";
import { Loader } from "pixi.js";
import Global from "./Global";

export class Main extends Container {
	private _size:Rectangle;
	private _mainContainer:MainContainer;
	private _loaderIterator:number = 0;
	public static xhr:XMLHttpRequest;

	constructor(canvasId:string) {
		super();
		this.initSize();
		this.initPixiApp(canvasId);
		this.initImages();
		this.initStage();
	}

	private initImages():void {
        const loader:Loader = new Loader();
		loader.add("title", "title.jpg");
		loader.add("background", "bg.png");
		loader.add("player", "player.png");
		loader.add("brick_block", "brick_block.jpg");
		loader.add("lava_block", "lava_block.jpg");
		loader.add("thorns", "thorns.png");
		loader.add("teleport", "teleport.png");
		loader.on("complete", ()=> {
			this._loaderIterator += 1;
			this.initialComplite();
		});
		loader.load();
	}

	private initStage():void {
		Main.xhr = new XMLHttpRequest();
		Main.xhr.responseType = "json";
		Main.xhr.open("GET", "level_1.json", true);
		Main.xhr.onreadystatechange = () => {
			if (Main.xhr.readyState === 4) {
				if (Main.xhr.status === 200) {
					this._loaderIterator += 1;
					this.initialComplite();
				} else {
					console.log("ERROR");
				}
			}
		};
		Main.xhr.send();
	}

	private initialComplite():void {
		if (this._loaderIterator == 2){
			this.initMainContainer();
			window.onresize = () => { this.resize(); };
			this.resize();
		}
	}

	private initSize():void {
		this._size = new Rectangle();
	}

	private initPixiApp(canvasId:string):void {
		Global.PIXI_APP = new Application({
			backgroundColor: 0x000000,
			view: document.getElementById(canvasId) as HTMLCanvasElement,
			// needed to avoid troubles with invisible fonts on some Android devices
			resolution: ((devicePixelRatio || 1) < 2) ? 1 : 2,
		});
		Global.PIXI_APP.stage.addChild(this);
	}

	private initMainContainer():void {
		this._mainContainer = new MainContainer();
		this._mainContainer.width = window.innerWidth;
		this._mainContainer.height = window.innerHeight;
		Global.PIXI_APP.stage.addChild(this._mainContainer);
	}

	private resize():void {
		this.refreshSize();
		this.alignPixiApp();
		this.alignContainer();
	}

	private refreshSize():void {
		if (window.outerHeight !== 0) {
			this._size.width = window.innerWidth;
			this._size.height = window.innerHeight;
		} else { // needed to avoid some iOS troubles
			this._size.width = document.body.scrollWidth;
			this._size.height = document.body.scrollHeight;
		}
	}

	private alignPixiApp():void {
		Global.PIXI_APP.renderer.view.style.width = this._size.width + "px";
		Global.PIXI_APP.renderer.view.style.height = this._size.height + "px";
		Global.PIXI_APP.renderer.resize(this._size.width, this._size.height);
	}

	private alignContainer():void {
		const scaleByWidth:number = this._size.width / MainContainer.WIDTH;
		const scaleByHeight:number = this._size.height / MainContainer.HEIGHT;
		this._mainContainer.scale.x = this._mainContainer.scale.y = Math.min(scaleByWidth, scaleByHeight);
		this._mainContainer.x = (this._size.width - MainContainer.WIDTH*this._mainContainer.scale.x) / 2;
		this._mainContainer.y = (this._size.height - MainContainer.HEIGHT*this._mainContainer.scale.y) / 2;
	}
}