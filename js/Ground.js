class Ground {
    constructor(app) {
        this.app = app;
        let numPoints =20;
        this.widthTexture = 1280 * 2;
        this.heightTexture = 256;
        this.curve = 1000;

        this.speed = 0;
        this.scale = 1;

        this.texture = PIXI.Texture.fromImage('p2.jpeg');

//        this.renderTexture = new PIXI.RenderTexture(this.texture);

        this.renderTexture = PIXI.RenderTexture.create(
            this.widthTexture,
            this.heightTexture
        );


        this.tilingSprite = new PIXI.extras.TilingSprite(
            this.texture,
            this.widthTexture,
            this.heightTexture
        );

//        this.app.stage.addChild(this.tilingSprite);

        let count = 0;

        // build a rope!
        let ropeLength = (this.widthTexture)/ numPoints;
        let points = [];
        for (let i = 0; i < numPoints + 1; i++) {
            points.push(new PIXI.Point(i * ropeLength, 0));
        }
        this.strip = new PIXI.mesh.Rope(this.renderTexture, points);
        this.strip.pivot.set(0.5, 0.5);
        this.strip.x =  this.scale * this.widthTexture / 2 - this.widthTexture / 2;
        this.strip.y = -this.scale * this.heightTexture - this.heightTexture / 2;


        //strip.x = -459;

        this.snakeContainer = new PIXI.Container();
//        this.snakeContainer.pivot.set(0.5, 0.5);
//        this.snakeContainer.x = -this.app.width / 2;
        this.snakeContainer.y = this.app.renderer.height * 2;
        this.app.stage.addChild(this.snakeContainer);
        this.snakeContainer.addChild(this.strip);

        this.app.ticker.add(function() {
            count = Math.PI * 1.35;
//            count +=0.01;

            this.app.renderer.render(this.tilingSprite, this.renderTexture, false);

//            this.tilingSprite.tilePosition.x += 1;
            this.tilingSprite.tilePosition.x -= this.speed;

            // make the snake
            for (var i = 0; i < points.length; i++) {
                points[i].y = Math.sin((i * 0.1) + count) * this.curve ;
                points[i].x = i * ropeLength;
            }
/*
            for(let i = 0; i < points.length; i++){
                points[i].y = 256 * Math.cos(count * i);
                points[i].x = 256 * Math.sin(count * i) * 4;
            } */
        }.bind(this));
    }
    onChange({speed, scale, curve, x, y}) {
        this.speed = speed ? speed : this.speed;
        this.scale = scale ? scale : this.scale;
        this.curve = curve ? curve : this.curve;
        this.strip.x = x ? x : this.strip.x;
        this.strip.y = y ? y : this.strip.y;

        if (scale) {
//            this.snakeContainer.scale.set(this.scale);
            this.strip.scale.set(this.scale);
//            this.snakeContainer.y = this.app.renderer.height / 2;
//            this.snakeContainer.x = this.app.renderer.width * this.scale;

//            this.strip.x =  this.scale * this.widthTexture / 2 - this.widthTexture / 2;
//            this.strip.y = -this.scale * this.heightTexture - this.heightTexture / 2;

        }
    }
}