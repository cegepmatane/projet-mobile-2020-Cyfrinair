class VueDonnees
{
    constructor()
    {
        this.donnees = [
            {site : "Facebook", mdp : "robinet56!"},
            {site : "LinkedIn", mdp : "m0nBoul0t"},
            {site : "Google", mdp : "b3stD3v3v3r"},
            {site : "Omnivox",  mdp : "d3c@Mo!"},
            {site : "Minecraft", mdp : "cr@ft007"},
            {site : "Minecraft", mdp : "cr@ft007"},
            {site : "Omnivox",  mdp : "d3c@Mo!"},
            {site : "Omnivox",  mdp : "d3c@Mo!"},
            {site : "Google", mdp : "b3stD3v3v3r"},
            {site : "Google", mdp : "b3stD3v3v3r"},
            {site : "Facebook", mdp : "robinet56!"},
            {site : "Facebook", mdp : "robinet56!"},
            {site : "Facebook", mdp : "robinet56!"},
            {site : "Facebook", mdp : "robinet56!"}
        ];

        this.html = document.getElementById("html-vue-donnees").innerHTML;
        this.stage = null;
    }

    afficher()
    {
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        this.stage = new createjs.Stage("canvas-header");
        createjs.Ticker.addEventListener("tick", () => this.update());
        createjs.Ticker.framerate = Configuration.TAUX_RAFRAICHISSEMENT;

        this.initialiserElementsGraphiques();
    }

    update()
    {
        this.stage.update();
    }

    initialiserElementsGraphiques()
    {
        let image = new Image();
        image.src = "img/lock-shape.svg"; 
        image.addEventListener("load", evenement => this.afficherCadenas(evenement));
    }

    afficherCadenas(evenement)
    {
        let imageCadenas = evenement.target;
        let cadenas = new createjs.Bitmap(imageCadenas);
    
        cadenas.scale = Configuration.SCALE_CADENAS;
        //Permet de centrer le cadenas en X et le positionner au dessus du canvas pour animation
        cadenas.x = (this.stage.canvas.width - cadenas.scale * cadenas.image.width) / 2;
        cadenas.y = -cadenas.image.height;
    
        //Centrer le cadenas en Y
        let centreY = (this.stage.canvas.height - cadenas.scale * cadenas.image.height) / 2;
        
        //Animation descendre
        createjs.Tween.get(cadenas)
            .to({y:centreY}, Configuration.DUREE_ANIMATION, createjs.Ease.bounceOut)
            .call(() => this.afficherCadresDonnees());

        this.stage.addChild(cadenas);
    }

    afficherCadresDonnees()
    {
        //Changement de canvas dans la vue
        this.stage = new createjs.Stage("canvas-donnees");

        this.stage.canvas.width = window.innerWidth;
        //Permet d'adapter la taille du canvas selon le nombre de données à afficher
        this.stage.canvas.height = (Configuration.HAUTEUR_DONNEE + Configuration.MARGIN_DONNEE) * this.donnees.length;	
    
        let indexDonnee = 0;
        //Construction de chaque donnée dans un cadre
        this.donnees.forEach(donnee => {
            this.afficherDonnee(donnee, indexDonnee);
            indexDonnee++;

        });
    }
    
    afficherDonnee(donnee, indexDonnee) 
    {
        //Construction du cadre
      // let cadre = new createjs.Container();

        //Fond du cadre
        let forme = new createjs.Shape();
        forme.width = this.stage.canvas.width;
        forme.height = Configuration.HAUTEUR_DONNEE;
        forme.y =  indexDonnee*(Configuration.HAUTEUR_DONNEE + Configuration.MARGIN_DONNEE);
        forme.graphics.beginFill("white").drawRect(0, 0, forme.width, forme.height);
        
        //Donnée: site web
        let site = new createjs.Text("Site: " + donnee.site, Configuration.FONT, "black");
        site.textAlign = "left";
        site.x = forme.x + 0.05 * forme.width;
        site.y = forme.y + (forme.height/2 - site.getMeasuredHeight()/2);
    
        //Donnée: mot de passe
        let mdp = new createjs.Text("Mot de passe: " + donnee.mdp, Configuration.FONT, "black");
        mdp.textAlign = "right";
        mdp.x = forme.x + 0.95 * forme.width;
        mdp.y = forme.y + (forme.height / 2 - mdp.getMeasuredHeight()/2);
    
        //Ajout des éléments au cadre
        // cadre.addChild(forme, site, mdp);

        // //Animations de slide gauche-droite
        this.stage.x = -forme.width;
        createjs.Tween.get(this.stage)
            .to({x:0}, Configuration.DUREE_ANIMATION, createjs.Ease.quadOut);

        // //Apparition
        forme.alpha = 0;
        createjs.Tween.get(forme)
            .to({alpha:1}, Configuration.DUREE_ANIMATION);
    
        this.stage.addChild(forme, site, mdp);
    }
 
}