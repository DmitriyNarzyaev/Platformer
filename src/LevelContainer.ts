import Container = PIXI.Container;
import { Texture, TilingSprite } from "pixi.js";
import { Player } from "./Player";
import { Platform } from "./Platform";
import Stage1 from "./Stage1";
import HitTest from "./HitTest";
import { Teleport } from "./Teleport";
import Global from "./Global";

export default class LevelContainer extends Container {
	public static readonly WIDTH:number = 3000;
    public static readonly HEIGHT:number = 1500;
	public static PLAYER_1:Player;
	public static TELEPORT_1:Teleport;
    private _background:TilingSprite;
    private BUTTON_LEFT:boolean = false;
	private BUTTON_RIGHT:boolean = false;
	private BUTTON_UP:boolean = false;	
	private _stage1:Stage1
	public static PLATFORM_ARRAY:Platform[] = [];
	private _gap:number = 10;
	private _playerStartX:number;
	private _playerStartY:number;

	constructor() {
		super();
        this.initBackground();
		this.initPlayer();
		this.initTeleport();
		this.initStage1();
		window.addEventListener("keydown",
			(e:KeyboardEvent) => {LevelContainer.PLAYER_1
			this.keyDownHandler(e);
		},);
		window.addEventListener("keyup",
			(e:KeyboardEvent) => {
			this.keyUpHandler(e);
		},);
		Global.PIXI_APP.ticker.add(this.ticker, this);
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
			this._playerStartX = LevelContainer.PLAYER_1.width + this._gap;
			this._playerStartY = LevelContainer.HEIGHT - LevelContainer.PLAYER_1.height - this._gap*10;
		LevelContainer.PLAYER_1.x = this._playerStartX;
		LevelContainer.PLAYER_1.y = this._playerStartY;
	}

	//Создание телепорта
	private initTeleport():void {
		LevelContainer.TELEPORT_1 = new Teleport();
		this.addChild(LevelContainer.TELEPORT_1);
		//LevelContainer.TELEPORT_1.x = 2850;
		//LevelContainer.TELEPORT_1.y = 300;
			LevelContainer.TELEPORT_1.x = 400;
			LevelContainer.TELEPORT_1.y = 1200;
		LevelContainer.TELEPORT_1.width /= 2;
		LevelContainer.TELEPORT_1.height /= 2;
	}
	
	//создание наполнения уровня
	private initStage1():void {
		this._stage1 = new Stage1();
		this.addChild(this._stage1);
	}
	
	//Нажатие кнопок
    private keyDownHandler(e:KeyboardEvent):void {
		if (e.code == "ArrowRight") {
			this.BUTTON_RIGHT = true;
		}
		if (e.code == "ArrowLeft") {
			this.BUTTON_LEFT = true;
		}
		if (e.code == "ArrowUp") {
			this.BUTTON_UP = true;
		}
	}

	//отпуск кнопок
	private keyUpHandler(e:KeyboardEvent):void {
		if (e.code == "ArrowRight") {
			this.BUTTON_RIGHT = false;
		}
		if (e.code == "ArrowLeft") {
			this.BUTTON_LEFT = false;
		}
		if (e.code == "ArrowUp") {
			this.BUTTON_UP = false;
		}
    }
    
    private ticker():void {
		let limitX:number;
		let limitY:number;
		let canMove:boolean = true;
		let isDamaged: boolean = false;

		LevelContainer.PLAYER_1.speedY += LevelContainer.PLAYER_1.gravity;
		if (LevelContainer.PLAYER_1.speedY > 0) {
			let correctedY:number = null;
			for (let iterator:number = 0; iterator < LevelContainer.PLATFORM_ARRAY.length; iterator ++) {
				let platform:Platform = LevelContainer.PLATFORM_ARRAY[iterator];
				limitY = platform.y - LevelContainer.PLAYER_1.height;
				if (
					LevelContainer.PLAYER_1.y <= limitY &&
					LevelContainer.PLAYER_1.y + LevelContainer.PLAYER_1.speedY > limitY &&
					HitTest.horizontal(LevelContainer.PLAYER_1, platform)
				) {
					if (platform.damage == false) {
						correctedY = limitY;
						LevelContainer.PLAYER_1.speedY = 0;
					} else {
						isDamaged = true;
						break;
					}
				}
			}

			if (!isDamaged) {
				limitY = LevelContainer.HEIGHT - LevelContainer.PLAYER_1.height		// TODO;
				if (LevelContainer.PLAYER_1.y >= limitY) {
					correctedY = limitY;
				}
	
				if (correctedY != null) {
					LevelContainer.PLAYER_1.y = correctedY;
					LevelContainer.PLAYER_1.canJump = true;
					LevelContainer.PLAYER_1.speedY = 0;
				} else {
					LevelContainer.PLAYER_1.canJump = false;
					LevelContainer.PLAYER_1.y += LevelContainer.PLAYER_1.speedY;
				}
			}

		} else if (LevelContainer.PLAYER_1.speedY < 0) {
			for (let iterator:number = 0; iterator < LevelContainer.PLATFORM_ARRAY.length; iterator ++) {
				let platform:Platform = LevelContainer.PLATFORM_ARRAY[iterator];
				limitY = platform.y + platform.height;
				if (
					LevelContainer.PLAYER_1.y >= limitY &&
					LevelContainer.PLAYER_1.y + LevelContainer.PLAYER_1.speedY < limitY &&
					HitTest.horizontal(LevelContainer.PLAYER_1, platform)
				) {
					if (platform.damage == false) {
						LevelContainer.PLAYER_1.y = limitY;
						LevelContainer.PLAYER_1.speedY = 0;
					} else {
						isDamaged = true;
						break;
					}
				}
			};
			if (LevelContainer.PLAYER_1.speedY !== 0) {
				LevelContainer.PLAYER_1.y += LevelContainer.PLAYER_1.speedY;
			}
		}

		//******BUTTON_UP
		if (this.BUTTON_UP == true && LevelContainer.PLAYER_1.canJump) {
			LevelContainer.PLAYER_1.canJump = false;
			LevelContainer.PLAYER_1.speedY = LevelContainer.PLAYER_1.jumpSpeed;
		}

		//******BUTTON_RIGHT
		if (this.BUTTON_RIGHT == true) {
			for (let iterator:number = 0; iterator < LevelContainer.PLATFORM_ARRAY.length; iterator ++) {
				let platform:Platform = LevelContainer.PLATFORM_ARRAY[iterator];
				limitX = platform.x - LevelContainer.PLAYER_1.width;
				if (
					LevelContainer.PLAYER_1.x <= limitX &&
					LevelContainer.PLAYER_1.x + LevelContainer.PLAYER_1.movingSpeed > limitX &&
					HitTest.vertical(LevelContainer.PLAYER_1, platform)
				) {
					if (platform.damage == false) {
						LevelContainer.PLAYER_1.x = limitX;
						canMove = false;
					} else {
						isDamaged = true;
						break;
					}
				}
			};
			if (canMove) {
				LevelContainer.PLAYER_1.x += LevelContainer.PLAYER_1.movingSpeed;
			}
			if (Player.PLAYER_SPRITE.scale.x < 0) {
				Player.PLAYER_SPRITE.scale.x = 1;
				Player.PLAYER_SPRITE.x -= Player.PLAYER_SPRITE.width;
			}
		}

		//******BUTTON_LEFT
		if (this.BUTTON_LEFT == true) {
			for (let iterator:number = 0; iterator < LevelContainer.PLATFORM_ARRAY.length; iterator ++) {
				let platform:Platform = LevelContainer.PLATFORM_ARRAY[iterator];
				limitX = platform.x + platform.width;
				if (
					LevelContainer.PLAYER_1.x >= limitX &&
					LevelContainer.PLAYER_1.x - LevelContainer.PLAYER_1.movingSpeed < limitX &&
					HitTest.vertical(LevelContainer.PLAYER_1, platform)
				) {
					if (platform.damage == false) {
						LevelContainer.PLAYER_1.x = limitX;
						canMove = false;
					} else {
						isDamaged = true;
						break;
					}
				}
			};
			if (canMove) {
				LevelContainer.PLAYER_1.x -= LevelContainer.PLAYER_1.movingSpeed;
			}
			if (Player.PLAYER_SPRITE.scale.x > 0) {
				Player.PLAYER_SPRITE.scale.x = -1;
				Player.PLAYER_SPRITE.x += Player.PLAYER_SPRITE.width;
			}
		}

		// Телепорта
		Teleport.TELEPORT_CONTAINER.rotation += LevelContainer.TELEPORT_1.rotationSpeed;
		LevelContainer.TELEPORT_1.scale.x = .2;

		if (
			HitTest.horizontal(LevelContainer.PLAYER_1, LevelContainer.TELEPORT_1) &&
			HitTest.vertical(LevelContainer.PLAYER_1, LevelContainer.TELEPORT_1)
		) {
			console.log("ENDGAME");
		} 

		if (isDamaged) {
			LevelContainer.PLAYER_1.x = this._playerStartX;
			LevelContainer.PLAYER_1.y = this._playerStartY;
			LevelContainer.PLAYER_1.speedY = 0;
		}
	}
}