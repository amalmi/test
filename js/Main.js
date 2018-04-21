class Main {
    constructor() {
        let options = {resolution: 1, roundPixels: false,backgroundColor: 0x000000,legacy: false, antialias:true};

        this.app = new PIXI.Application(1280, 720, options);
        document.body.appendChild(this.app.view);
        const background = new Background(this.app);
        const ground = new Ground(this.app);

        let obj = {
            speed: 0.0,

            color0: "#ffae23", // CSS string
            color1: [ 0, 128, 255 ], // RGB array
            color2: [ 0, 128, 255, 0.3 ], // RGB with alpha
            color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
        };

        let gui = new dat.gui.GUI();

        gui.remember(obj);

        let speedController = gui.add(obj, 'speed').min(-10).max(10).step(0.25);

        speedController.onChange(function(value) {
            // Fires on every change, drag, keypress, etc.
            ground.onChange(value);
        }.bind(this));

    }
}