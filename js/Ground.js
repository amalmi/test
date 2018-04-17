class Ground {
    constructor(app) {
        this.app = app;
        //
        //
        //
        //

        let numPoints = 100;
        /*
        var tilingSprite = new PIXI.extras.TilingSprite(
            texture,
            this.app.screen.width,
            this.app.screen.height
        );

        this.app.stage.addChild(tilingSprite);
        */

        var count = 0;

// build a rope!
        var ropeLength = 550 / numPoints;

        var points = [];

        for (var i = 0; i < numPoints + 1; i++) {
            points.push(new PIXI.Point(i * ropeLength, 0));
        }


        var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('snake.png'), points);




//strip.x = -459;

        var snakeContainer = new PIXI.Container();
        snakeContainer.x = 1280 / 2;
        snakeContainer.y = 720 / 2 + 800;

        snakeContainer.pivot.set(0.5, 0.5);

        snakeContainer.scale.set(1);
        this.app.stage.addChild(snakeContainer);


        snakeContainer.addChild(strip);

        this.app.ticker.add(function() {

//    count += 0.01;
            count = (Math.PI * 2) / numPoints / 6;
            snakeContainer.rotation -=0.005;
            // make the snake
            /*
            for (var i = 0; i < points.length; i++) {
                points[i].y = Math.sin((i * 0.3) + count) * 250;
                points[i].x = i * ropeLength + Math.cos((i * 0.1) + count) * 250;
            }
            */

            for(let i = 0; i < points.length; i++){
                points[i].y = 800 * Math.cos(count * i);
                points[i].x = 800 * Math.sin(count * i);
            }
        }.bind(this));
    }
}