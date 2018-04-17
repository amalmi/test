class main {
    constructor() {
        this.app = new PIXI.Application(1280, 720);
        document.body.appendChild(this.app.view);

        var squareFar = new PIXI.Sprite(PIXI.Texture.WHITE);
        squareFar.tint = 0xff0000;
        squareFar.factor = 1;
        squareFar.anchor.set(0.5);
        squareFar.position.set(this.app.screen.width / 2, 50);

// create a new Sprite from an image path
        var container = new PIXI.projection.Container2d();
        container.position.set(this.app.screen.width / 2, this.app.screen.height);

// tiling - takes whole screen, anchor and position are the same as of sprite surface
// different tint, to see the black part
        this.tiling = new PIXI.projection.TilingSprite2d(new PIXI.Texture.fromImage("bkg.jpg"), this.app.screen.width, this.app.screen.height);
        this.tiling.position.set(this.app.screen.width / 2, this.app.screen.height);
        this.tiling.anchor.set(0.5, 1.0);
        this.tiling.tint = 0x808080;

        var surface = new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage("bkg.jpg"));
        surface.anchor.set(0.5, 1.0);
//surface.scale.y = -1; //sorry, have to do that to make a correct projection
        surface.width = this.app.screen.width;
        surface.height = this.app.screen.height;
//var squarePlane = new PIXI.projection.Sprite2d(PIXI.Texture.fromImage('required/assets/flowerTop.png'));
        this.squarePlane = new PIXI.projection.Sprite2d(PIXI.Texture.WHITE);
        this.squarePlane.tint = 0xff0000;
        this.squarePlane.factor = 1;
        this.squarePlane.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        this.squarePlane.anchor.set(0.5, 0.0);
        this.squarePlane.position.set(-this.app.screen.width / 4, -this.app.screen.height / 2);

        this.bunny = new PIXI.projection.Sprite2d(PIXI.Texture.fromImage('flowerTop.png'));
        this.bunny.anchor.set(0.5, 1.0);

        this.app.stage.addChild(this.tiling);
        this.app.stage.addChild(container);
        this.app.stage.addChild(squareFar);
        container.addChild(surface);
        container.addChild(this.squarePlane);
        this.squarePlane.addChild(this.bunny);

// Listen for animate update
        this.app.ticker.add(function (delta) {
            // clear the projection
            container.proj.clear();
            container.updateTransform();
            // now we can get local coords for points of perspective
            let pos = container.toLocal(squareFar.position);
            //need to invert this thing, otherwise we'll have to use scale.y=-1 which is not good
            pos.y = -pos.y;
            pos.x = -pos.x;
            container.proj.setAxisY(pos, -squareFar.factor);

            this.tiling.tileScale.copy(surface.scale);
            // dont overflow tilePosition, shaders will have less precision
            this.tiling.tilePosition.x = (this.tiling.tilePosition.x + delta) % this.tiling.texture.width;
            //sync container proj and tiling inside proj
            this.tiling.tileProj.setAxisY(pos, -squareFar.factor);

            this.squarePlane.proj.affine = this.squarePlane.factor ?
                PIXI.projection.AFFINE.AXIS_X : PIXI.projection.AFFINE.NONE;
        }.bind(this));

        this.addInteraction(squareFar);
        this.addInteraction(this.squarePlane);
//move the bunny too!
        this.addInteraction(this.bunny);



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






// === CLICKS AND SNAP ===

// changes axis factor
    toggle(obj) {
        if (obj !== this.bunny) {
            obj.factor = 1.0 - obj.factor;
            obj.tint = obj.factor ? 0xff0033 : 0x00ff00;
        }
    }

    snap(obj) {
        if (obj == this.bunny) {
            obj.position.set(0);
        } else if (obj == this.squarePlane) {
            //plane bounds
            obj.position.x = Math.min(Math.max(obj.position.x, -this.app.screen.width / 2 + 10), this.app.screen.width / 2 - 10);
            obj.position.y = Math.min(Math.max(obj.position.y, -this.app.screen.height + 10), 10);
        } else {
            //far
            obj.position.x = Math.min(Math.max(obj.position.x, 0), this.app.screen.width);
            obj.position.y = Math.min(Math.max(obj.position.y, 0), this.app.screen.height);
        }
    }

// === INTERACTION CODE  ===

    addInteraction(obj) {
        obj.interactive = true;
        obj
            .on('pointerdown', this.onDragStart.bind(this))
            .on('pointerup', this.onDragEnd.bind(this))
            .on('pointerupoutside', this.onDragEnd.bind(this))
            .on('pointermove', this.onDragMove.bind(this));
    }

    onDragStart(event) {
        var obj = event.currentTarget;
        obj.dragData = event.data;
        obj.dragging = 1;
        obj.dragPointerStart = event.data.getLocalPosition(obj.parent);
        obj.dragObjStart = new PIXI.Point();
        obj.dragObjStart.copy(obj.position);
        obj.dragGlobalStart = new PIXI.Point();
        obj.dragGlobalStart.copy(event.data.global);
        event.stopPropagation();
    }

    onDragEnd(event) {
        var obj = event.currentTarget;
        if (!obj.dragging) return;
        if (obj.dragging == 1) {
            this.toggle(obj);
        } else {
            this.snap(obj);
        }

        obj.dragging = 0;
        obj.dragData = null;

        event.stopPropagation();
        // set the interaction data to null
    }

    onDragMove(event) {
        var obj = event.currentTarget;
        if (!obj.dragging) return;
        event.stopPropagation();
        var data = obj.dragData; // it can be different pointer!
        if (obj.dragging == 1) {
            // click or drag?
            if (Math.abs(data.global.x - obj.dragGlobalStart.x) +
                Math.abs(data.global.y - obj.dragGlobalStart.y) >= 3) {
                // DRAG
                obj.dragging = 2;
            }
        }
        if (obj.dragging == 2) {
            var dragPointerEnd = data.getLocalPosition(obj.parent);
            // DRAG
            obj.position.set(
                obj.dragObjStart.x + (dragPointerEnd.x - obj.dragPointerStart.x),
                obj.dragObjStart.y + (dragPointerEnd.y - obj.dragPointerStart.y)
            );
        }
    }
}