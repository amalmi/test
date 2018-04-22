class Main {
    constructor() {
        let options = {resolution: 1, roundPixels: false,backgroundColor: 0x000000,legacy: false, antialias:true};

        this.app = new PIXI.Application(1280, 720, options);
        document.body.appendChild(this.app.view);
        const background = new Background(this.app);
        const ground = new Ground(this.app);

        let obj = {
            speed: 5,
            scale: 0.375,
            curve: 0.231,
            x: 73,
            y: 1273,
            sinePos: 1.25,
            numPoints: 1024
        };

        ground.onChange(obj);

        let gui = new dat.gui.GUI();
//        gui.remember(obj);
        gui.add(obj, 'speed').min(-10).max(10).step(0.25)
            .onChange(function(value) {
                // Fires on every change, drag, keypress, etc.
                ground.onChange({speed: value});
            }.bind(this));

        gui.add(obj, 'scale').min(0.2).max(2).step(0.025)
            .onChange(function(value) {
                // Fires on every change, drag, keypress, etc.
                ground.onChange({scale: value});
            }.bind(this));

        gui.add(obj, 'curve').min(-1).max(1).step(0.001)
            .onChange(function(value) {
                // Fires on every change, drag, keypress, etc.
                ground.onChange({curve: value});
            }.bind(this));

        gui.add(obj, 'x').min(-2000).max(2000).step(1)
            .onChange(function(value) {
                // Fires on every change, drag, keypress, etc.
                ground.onChange({x: value});
            }.bind(this));

        gui.add(obj, 'y').min(-4000).max(4000).step(1)
            .onChange(function(value) {
                // Fires on every change, drag, keypress, etc.
                ground.onChange({y: value});
            }.bind(this));

        gui.add(obj, 'sinePos').min(-2).max(2).step(0.001)
            .onChange(function(value) {
                // Fires on every change, drag, keypress, etc.
                ground.onChange({sinePos: value});
            }.bind(this));

        gui.add(obj, 'numPoints').min(32).max(1024).step(1)
            .onChange(function(value) {
                // Fires on every change, drag, keypress, etc.
                ground.onChange({numPoints: value});
            }.bind(this));
    }
}