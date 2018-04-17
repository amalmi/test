class Main {
    constructor() {
        this.app = new PIXI.Application(1280, 720);
        document.body.appendChild(this.app.view);
        new Background(this.app);
        new Ground(this.app);
    }
}