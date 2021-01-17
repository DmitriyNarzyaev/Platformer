import { Container, Sprite, TextStyle } from "pixi.js";

export class Title extends Container {
    private _titleBackground:PIXI.Sprite;
	private _personagesNameText:PIXI.Text;

	constructor() {
        super();
        this.initialTitleBackground();
        this.initTextWindow();
    }

    private initialTitleBackground():void {
        this._titleBackground = Sprite.from("title");
        this.addChild(this._titleBackground);
    }

    private initTextWindow():void {
		let style:TextStyle = new PIXI.TextStyle ({
				fontFamily: 'Arial',
				fontSize: 50,
				fontWeight: 'bold',
				fill: ['#4444ff', '#2222ff', '#4444ff'],
				dropShadow: true,
				dropShadowColor: '#000000',
				dropShadowDistance:1,
				dropShadowAngle: Math.PI / 10,
				stroke: '#000000',
				strokeThickness: 4
			}
		);
		this._personagesNameText = new PIXI.Text('PLATFORMER', style);
		this._personagesNameText.x = (this._titleBackground.width - this._personagesNameText.width)/2;
		this.addChild(this._personagesNameText);
	}
}