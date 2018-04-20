class Ground {
    constructor(app) {
        this.app = app;
        let numPoints =20;
        let xWidth = 1280 * 2;

        this.texture = PIXI.Texture.fromImage('p2.jpeg');

//        this.renderTexture = new PIXI.RenderTexture(this.texture);

        this.renderTexture = PIXI.RenderTexture.create(
            xWidth,
            256
        );


        this.tilingSprite = new PIXI.extras.TilingSprite(
            this.texture,
            xWidth,
            256
        );

//        this.app.stage.addChild(this.tilingSprite);

        let count = 0;

        // build a rope!
        let ropeLength = (xWidth)/ numPoints;
        let points = [];
        for (let i = 0; i < numPoints + 1; i++) {
            points.push(new PIXI.Point(i * ropeLength, 0));
        }
        let strip = new PIXI.mesh.Rope(this.renderTexture, points);
        //strip.x = -459;

        var snakeContainer = new PIXI.Container();
//        snakeContainer.pivot.set(0.5, 0.5);
        snakeContainer.x = 0;
        snakeContainer.y = 720 * 2;
        snakeContainer.scale.set(1);
        this.app.stage.addChild(snakeContainer);
        snakeContainer.addChild(strip);

        this.app.ticker.add(function() {
            count = Math.PI * 1.35;
//            count +=0.01;
            console.log(count);

            this.app.renderer.render(this.tilingSprite, this.renderTexture, false);

//            this.tilingSprite.tilePosition.x += 1;
            this.tilingSprite.tilePosition.x -= 4;

            // make the snake
            for (var i = 0; i < points.length; i++) {
                points[i].y = Math.sin((i * 0.1) + count) * 1000 ;
                points[i].x = i * ropeLength;
            }
/*
            for(let i = 0; i < points.length; i++){
                points[i].y = 256 * Math.cos(count * i);
                points[i].x = 256 * Math.sin(count * i) * 4;
            } */
        }.bind(this));
    }
}