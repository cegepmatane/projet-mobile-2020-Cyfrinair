var stage;

var indexCanvas = 0;
var canvas;

var images = [
    {
        source : "lock-shape.svg",
    },
    {
        source : "paper.svg",
    },
    {
        source : "user-flat.svg",
    },
    {
        source : "simple-gears.svg",
    }
];

const DUREE_ANIMATION = 500;


function initialiser() {
    canvas = document.getElementsByTagName("canvas");
    stage = new createjs.Stage(canvas[indexCanvas]);

    createjs.Ticker.on("tick", update);
    createjs.Ticker.framerate = 60;

    chargerImages();
}

function update()
{
    stage.update();
}

function chargerImages()
{
    //Creation fond
    let fond = new createjs.Shape();
    fond.graphics.beginFill("rgba(255,255,255,0)").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    stage.addChild(fond);

    let image = new Image();

    image.src = "img/" + images[indexCanvas].source;
    image.onload = gererChargementImage;

    if(canvas[indexCanvas + 1] != null)
        setTimeout(changerStage, DUREE_ANIMATION);
}

function gererChargementImage(evt) {
    var image = evt.target;
    var bitmap = new createjs.Bitmap(image);

    bitmap.scale = 0.3;

    //L'image se trouve au dessus du canvas
    bitmap.x = (stage.canvas.width - bitmap.scale * bitmap.image.width) / 2;
    bitmap.y = -bitmap.image.height;

    //Animation descendre
    let centerY = (stage.canvas.height - bitmap.scale * bitmap.image.height) / 2;
    createjs.Tween.get(bitmap)
        .to({y:centerY}, DUREE_ANIMATION, createjs.Ease.circOut);

    //Animation apparition
    bitmap.alpha = 0;
    createjs.Tween.get(bitmap)
        .to({alpha:1}, DUREE_ANIMATION);

    stage.addChild(bitmap);

}

function changerStage()
{
    indexCanvas++;
    stage = new createjs.Stage(canvas[indexCanvas]);
    console.log(indexCanvas);
    chargerImages();

}
