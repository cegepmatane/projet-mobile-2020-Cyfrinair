var stage;
var canvas;
var indexCanvas = 0;

var donnees = [
    {
        site : "Facebook",
        mdp : "robinet56!"
    },
    {
        site : "LinkedIn",
        mdp : "m0nBoul0t"
    },
    {
        site : "Google",
        mdp : "b3stD3v3v3r"
    },
    {
        site : "Omnivox",
        mdp : "d3c@Mo!"
    },
    {
        site : "Minecraft",
        mdp : "cr@ft007"
    }
];

const DUREE_ANIMATION = 500;
const HAUTEUR_DONNEE = 100;
const MARGIN_DONNEE = 30;
const FONT = "20pt Arial";

function initialiser() {
    canvas = document.getElementsByTagName("canvas");
    stage = new createjs.Stage(canvas[indexCanvas]);

    createjs.Ticker.on("tick", update);
    createjs.Ticker.framerate = 60;

    let image = new Image();
    image.src = "img/lock-shape.svg"; 
    image.onload = afficherCadenas;
}

function update()
{
    stage.update();
}

function afficherCadenas(evt)
{
    let image = evt.target;
    let bitmap = new createjs.Bitmap(image);

    bitmap.scale = 0.3;
    //L'image se trouve au dessus du canvas
    bitmap.x = (stage.canvas.width - bitmap.scale * bitmap.image.width) / 2;
    bitmap.y = -bitmap.image.height;

    //Animation descendre
    let centerY = (stage.canvas.height - bitmap.scale * bitmap.image.height) / 2;
    createjs.Tween.get(bitmap)
        .to({y:centerY}, DUREE_ANIMATION, createjs.Ease.circOut)
        .call(changerStage);

    stage.addChild(bitmap);
}

function changerStage()
{
    indexCanvas++;
    stage = new createjs.Stage(canvas[indexCanvas]);

    afficherCadresDonnees();
}


function afficherCadresDonnees()
{
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    let indexDonnee = 0;
    donnees.forEach(donnee => {
        afficherDonnee(donnee, indexDonnee);
        indexDonnee++;
    });
}

function afficherDonnee(donnee, indexDonnee) 
{
    let forme = new createjs.Shape();
    forme.width = stage.canvas.width;
    forme.height = HAUTEUR_DONNEE;
    forme.y =  indexDonnee*(HAUTEUR_DONNEE + MARGIN_DONNEE);

    forme.graphics.beginFill("white").drawRect(0, 0, forme.width, forme.height);
    
    let site = new createjs.Text("Site: " + donnee.site, FONT, "black");
    site.textAlign = "left";
    site.x = forme.x + 0.05*forme.width;
    site.y = forme.y + (forme.height/2 - site.getMeasuredHeight()/2);

    let mdp = new createjs.Text("Mot de passe: " + donnee.mdp, FONT, "black");
    mdp.textAlign = "right";
    mdp.x = forme.x + 0.95*forme.width;
    mdp.y = forme.y + (forme.height/2 - mdp.getMeasuredHeight()/2);

    stage.x = -forme.width;
    createjs.Tween.get(stage)
        .to({x:0}, DUREE_ANIMATION, createjs.Ease.circOut);

    //Animation apparition
    forme.alpha = 0;
    createjs.Tween.get(forme)
        .to({alpha:1}, DUREE_ANIMATION);

    stage.addChild(forme, site, mdp);
}
