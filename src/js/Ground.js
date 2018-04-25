class Ground {
    constructor(app) {
        this.app = app;
        this.numPoints = 32;
        this.widthTexture = 1280;
        this.heightTexture = 256;
        this.curve = 1000;
        this.sinePos = 1.1;

        this.speed = 0;
        this.scale = 1;

        this.hero = new Hero(this.app);



        this.texture = PIXI.Texture.fromImage('p2.jpeg');

//        this.renderTexture = new PIXI.RenderTexture(this.texture);


//        this.app.stage.addChild(this.tilingSprite);

        let count = 0;


        this.app.ticker.add(function() {
//            count +=0.01;

            this.app.renderer.render(this.tilingSprite, this.renderTexture, false);

//            this.tilingSprite.tilePosition.x += 1;
            this.tilingSprite.tilePosition.x -= this.speed;

            // make the snake
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].y = Math.sin((i * (Math.PI / this.numPoints) + this.sinePos)) * this.ropeLength * this.curve;
                this.points[i].x = i * this.ropeLength;

            }
            let p = (this.points.length / 2 + this.hero.xPos);
                p = parseInt(p);
            if (Math.sign(this.curve) < 0) {
                this.hero.x =  Math.sign(this.curve) * (this.heightTexture / 2 ) * Math.cos((p * (Math.PI / this.numPoints)) );
                this.hero.y =  Math.sign(this.curve) * (this.heightTexture / 2 ) * Math.sin((p * (Math.PI / this.numPoints)) );
            } else {
                this.hero.x = (this.heightTexture / 2 ) * Math.cos((p * (Math.PI / this.numPoints)));
                this.hero.y =  -(this.heightTexture / 2 ) * Math.sin((p * (Math.PI / this.numPoints)));
            }
            this.hero.y += this.points[p].y;//Math.sin((p * (Math.PI / this.numPoints) + this.sinePos)) * this.ropeLength * this.curve;
            this.hero.x += this.points[p].x;//p * this.ropeLength;

//            this.hero.rotation = -Math.cos( ( p * (Math.PI / this.numPoints)) + this.sinePos) ;
            this.hero.rotation = -Math.PI/2 + Math.atan2((this.points[p].y - this.hero.y), (this.points[p].x - this.hero.x));
//            this.hero.rotation = Math.PI* 2 - Math.atan2(this.hero.y/2-256*this.curve, this.hero.x/2-2560*this.curve);

            this.hero.update();

            let l = (this.points.length / 2 - 4).toFixed(0);
            if (this.hero.xPos > l) {
                this.hero.xPos = parseInt(l);
            } else if (this.hero.xPos < -l) {
                this.hero.xPos = parseInt(-l);
            }
        }.bind(this));
    }

    makeRope() {
        this.renderTexture = PIXI.RenderTexture.create(
            this.widthTexture,
            this.heightTexture
        );


        this.tilingSprite = new PIXI.extras.TilingSprite(
            this.texture,
            this.widthTexture,
            this.heightTexture
        );

        if (!this.snakeContainer) {
            this.snakeContainer = new PIXI.Container();
            //        this.snakeContainer.pivot.set(0.5, 0.5);
            //        this.snakeContainer.x = -this.app.width / 2;
            this.snakeContainer.y = this.app.renderer.height * 2;
            this.app.stage.addChild(this.snakeContainer);
//            this.app.stage.addChild(this.hero);
            this.snakeContainer.alpha = 0.95;
        }
        // build a rope!
        this.ropeLength = (this.widthTexture)/ this.numPoints;
        this.points = [];
        for (let i = 0; i < this.numPoints + 1; i++) {
            this.points.push(new PIXI.Point(i * this.ropeLength, 0));
        }

        this.strip = new PIXI.mesh.Rope(this.renderTexture, this.points);
//        this.strip.pivot.set(0.5, 0.5);

        this.snakeContainer.removeChildren();
        this.snakeContainer.addChild(this.strip);
        this.snakeContainer.addChild(this.hero);
    }

    onChange({speed, scale, curve, x, y, sinePos, numPoints, width, height}) {
        this.speed = speed ? speed : this.speed;
        this.scale = scale ? scale : this.scale;
        this.numPoints = numPoints ? numPoints :this.numPoints;
        this.curve = curve ? curve * this.numPoints: this.curve;
        this.curveAngle = curve;
        this.sinePos = sinePos ? sinePos : this.sinePos;

        this.widthTexture = width ? width : this.widthTexture;
        this.heightTexture = height ? height : this.heightTexture;

        if (numPoints || width || height) {
            this.makeRope();
        }

        this.snakeContainer.x = x ? x * this.scale: this.snakeContainer.x;
        this.snakeContainer.y = y ? y * this.scale: this.snakeContainer.y;

        if (scale) {
//            this.snakeContainer.scale.set(this.scale);
            this.snakeContainer.scale.set(this.scale);
//            this.snakeContainer.y = this.app.renderer.height / 2;
//            this.snakeContainer.x = this.app.renderer.width * this.scale;

//            this.strip.x =  this.scale * this.widthTexture / 2 - this.widthTexture / 2;
//            this.strip.y = -this.scale * this.heightTexture - this.heightTexture / 2;

        }
    }


}