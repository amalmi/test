class Hero extends PIXI.Sprite {
    constructor(app) {
        super();
        this.app = app;
        this.sprite = new PIXI.Sprite(new PIXI.Texture.fromImage("flowerTop.png"));
        this.sprite.anchor.set(0.5,1);

        this.xPos = 0;
        this.yPos = 0;
        

        //Capture the keyboard arrow keys
        this.left = this.keyboard(37);
        this.up = this.keyboard(38);
        this.right = this.keyboard(39);
        this.down = this.keyboard(40);

        let layer = new PIXI.display.Layer();
        layer.useRenderTexture = true;
        // this flag is required, or you'll get
        // "glDrawElements: Source and destination textures of the draw are the same."
        layer.useDoubleBuffer = true;

        let trailSprite = new PIXI.Sprite(layer.getRenderTexture());
        trailSprite.alpha = 1;

        layer.addChild(trailSprite);

        let stage = new PIXI.display.Stage();
//        app.stage.addChild(layer);
        stage.addChild(layer);
        let showLayer = new PIXI.Sprite(layer.getRenderTexture());
//        app.stage.addChild(showLayer);
        stage.addChild(showLayer);


        layer.addChild(new PIXI.Sprite(new PIXI.Texture.fromImage("flowerTop.png")));
        this.addChild(stage);

        this.addChild(this.sprite);

    }

    update() {
        if (this.left.isDown) {
            this.xPos -= 8;
        }
        if (this.right.isDown) {
            this.xPos += 8;
        }
    }

    keyboard(keyCode) {
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = event => {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = event => {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        };

        //Attach event listeners
        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
            "keyup", key.upHandler.bind(key), false
        );
        return key;
    }
}