class Main {
    constructor() {
        let options = {resolution: 1, roundPixels: false,backgroundColor: 0x000000,legacy: false, antialias:true};

        this.app = new PIXI.Application(1280, 720, options);
        document.body.appendChild(this.app.view);
        new Background(this.app);
        new Ground(this.app);
    }
}