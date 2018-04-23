class BackgroundScroll extends PIXI.Sprite {
    constructor(app) {
        super();
        this.app = app;

        this.speed = 2;
        this.texture = PIXI.Texture.fromImage('iP4_BGtile.jpg');
        this.tilingSprite = new PIXI.extras.TilingSprite(
            this.texture,
            1286,
            640
        );

        this.app.stage.addChild(this.tilingSprite);

        this.app.ticker.add(function() {
            this.tilingSprite.tilePosition.x -=  this.speed;

        }.bind(this));
    }

    onChange({speed}) {
        this.speed = speed / 3;
    }

}