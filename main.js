var app = new PIXI.Application(1280, 720);
document.body.appendChild(app.view);

let numPoints = 20;

// create a texture from an image path
var texture = PIXI.Texture.fromImage('p2.jpeg');

/* create a tiling sprite ...
 * requires a texture, a width and a height
 * in WebGL the image size should preferably be a power of two
 */
var tilingSprite = new PIXI.extras.TilingSprite(
    texture,
    app.screen.width,
    app.screen.height
);

app.stage.addChild(tilingSprite);


var count = 0;

// build a rope!
var ropeLength = 918 / numPoints;

var points = [];

for (var i = 0; i < numPoints + 1; i++) {
    points.push(new PIXI.Point(i * ropeLength, 0));
}

var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('snake.png'), points);




//strip.x = -459;

var snakeContainer = new PIXI.Container();
snakeContainer.x = 1280 / 2;
snakeContainer.y = 720 / 2 + 500;

snakeContainer.pivot.set(0.5, 0.5);

snakeContainer.scale.set(1);
app.stage.addChild(snakeContainer);

snakeContainer.addChild(strip);

app.ticker.add(function() {

//    count += 0.01;
    count = (Math.PI * 2) / numPoints;
    snakeContainer.rotation -=0.01;
    // make the snake
    /*
    for (var i = 0; i < points.length; i++) {
        points[i].y = Math.sin((i * 0.3) + count) * 250;
        points[i].x = i * ropeLength + Math.cos((i * 0.1) + count) * 250;
    }
    */

    for(let i = 0; i < points.length; i++){
        points[i].y = 500 * Math.cos(count * i);
        points[i].x = 500 * Math.sin(count * i);
    }
});