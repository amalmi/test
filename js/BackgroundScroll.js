class BackgroundScroll extends PIXI.Sprite {
    constructor(app) {
        super();
        this.app = app;

        this.speed = 2;
        this.backgroundTexture = PIXI.Texture.fromImage('iP4_BGtile.jpg');
        this.tilingBackground = new PIXI.extras.TilingSprite(
            this.backgroundTexture,
            1286,
            640
        );

        this.groundTexture = PIXI.Texture.fromImage('iP4_ground.png');
        this.tilingGround = new PIXI.extras.TilingSprite(
            this.groundTexture,
            1286,
            179
        );
        this.tilingGround.y += this.app.view.height - this.tilingGround.height;

        this.app.stage.addChild(this.tilingBackground, this.tilingGround);

        this.app.ticker.add(function() {
            this.tilingBackground.tilePosition.x -=  this.speed;
            this.tilingGround.tilePosition.x -= this.speed * 0.3;

        }.bind(this));
    }

    onChange({speed}) {
        this.speed = speed / 3;
    }

}