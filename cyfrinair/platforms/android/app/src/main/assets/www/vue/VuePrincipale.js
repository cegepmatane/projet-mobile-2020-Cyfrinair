class VuePrincipale{

    constructor(){
        this.html = document.getElementById("html-vue-principale").innerHTML;
        this.stage = null;
        this.listeInfosClient = null;
        this.manager = new CryptoManager();
    }

    initialiserListeInfosClient(listeInfosClient){
        this.listeInfosClient = listeInfosClient;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        //Création stage EaselJS
        this.stage = new createjs.Stage("canvas-donnees");
        createjs.Ticker.addEventListener("tick", () => this.update());
        createjs.Ticker.framerate = Configuration.TAUX_RAFRAICHISSEMENT;

        //boutton de connection
        document.getElementById('connection').addEventListener("click", () => { this.genererCleMaitre(); }, false);
        document.getElementById('deconnection').addEventListener("click", () => { this.deconnection(); }, false);

        this.initialiserElementsGraphiques();
    }

    update()
    {
        this.stage.update();
    }

    initialiserElementsGraphiques()
    {
        /*
        let image = new Image();
        image.src = "img/lock-shape.svg"; 
        image.addEventListener("load", evenement => this.afficherCadenas(evenement));
        */

        //Sans changement de canvas, on appelle directement afficherCadresDonnees()
        this.afficherCadresDonnees();
    }

    /*
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
    */

    afficherCadresDonnees()
    {
        //Changement de canvas dans la vue
        //this.stage = new createjs.Stage("canvas-donnees");

        this.stage.canvas.width = window.innerWidth;
        //Permet d'adapter la taille du canvas selon le nombre de données à afficher
        this.stage.canvas.height = (Configuration.HAUTEUR_DONNEE + Configuration.MARGIN_DONNEE) * this.listeInfosClient.length;	
        //Construction de chaque donnée dans un cadre
        let index = 0;
        this.listeInfosClient.forEach(infosClient => {
            this.afficherDonnee(infosClient, index, null);
            index++;
        });
    }
    
    afficherDonnee(infosClient, index, listeMotDePasse) 
    {
        //Construction du cadre
        // let cadre = new createjs.Container();
        //Fond du cadre
        let forme = new createjs.Shape();
        forme.width = this.stage.canvas.width;
        forme.height = Configuration.HAUTEUR_DONNEE;
        forme.y =  index*(Configuration.HAUTEUR_DONNEE + Configuration.MARGIN_DONNEE);
        forme.graphics.beginFill("grey").drawRect(0, 0, forme.width, forme.height);
        
        //Donnée: site web
        let site = new createjs.Text("Site: " + infosClient.site, Configuration.FONT, "black");
        site.textAlign = Configuration.ALIGNEMENT_GAUCHE;
        site.x = forme.x + Configuration.POS_GAUCHE * forme.width;
        site.y = forme.y + (forme.height/2 - site.getMeasuredHeight()/2);
    
        //Donnée: utilisateur
        let utilisateur = new createjs.Text("Utilisateur: " + infosClient.utilisateur, Configuration.FONT, "black");
        utilisateur.textAlign = Configuration.ALIGNEMENT_MILIEU;
        utilisateur.x = forme.x + Configuration.POS_MILIEU * forme.width;
        utilisateur.y = forme.y + (forme.height / 2 - utilisateur.getMeasuredHeight()/2);
    
         //Donnée: description
         let description = new createjs.Text("Description: " + infosClient.description, Configuration.FONT, "black");
         description.textAlign = Configuration.ALIGNEMENT_DROITE;
         description.x = forme.x + Configuration.POS_DROITE * forme.width;
         description.y = forme.y + (forme.height / 2 - description.getMeasuredHeight()/2);

        //let info = creerInfo(forme, texte, alignement, position, )

        //Ajout des éléments au cadre
        // cadre.addChild(forme, site, mdp);

        forme.alpha = 0;
        this.stage.x = -forme.width;
        //Animations de slide gauche-droite et apparition
        createjs.Tween.get(this.stage)
            .to({x:0}, Configuration.DUREE_ANIMATION, createjs.Ease.quadOut);
        createjs.Tween.get(forme)
            .to({alpha:1}, Configuration.DUREE_ANIMATION);
    
        if (listeMotDePasse != null){
            let motdepasse = new createjs.Text("Mot De Passe: " + listeMotDePasse[index + 1], Configuration.FONT, "black");
            motdepasse.textAlign = "right";
            motdepasse.x = forme.x + 0.95 * forme.width;
            motdepasse.y = forme.y + (forme.height / 2 - motdepasse.getMeasuredHeight()/2);
            this.stage.addChild(forme, site, utilisateur, motdepasse);
        } else {
            this.stage.addChild(forme, site, utilisateur);
        }
    }

    genererCleMaitre(){
        
		let pseudo = document.getElementById('fullname').value;
		let motdepasse = document.getElementById('masterpassword').value;

        let valide = this.manager.mettreAJourMPW(pseudo, motdepasse);
        
        if (valide){
            document.getElementById('connection').disabled = true;
            document.getElementById('deconnection').disabled = false;
        
            let listeMotDePasse = [];
            this.manager.obtenirlisteMotDePasse(this.listeInfosClient, (index, data)=>{
                if (listeMotDePasse.length < this.listeInfosClient.length){
                    listeMotDePasse[index] = data;
                }
                if (listeMotDePasse.length == this.listeInfosClient.length){
                    console.log("FINI!!");

                    this.stage.removeAllChildren();

                    let index = 0;
                    this.listeInfosClient.forEach(infosClient => {
                        this.afficherDonnee(infosClient, index, listeMotDePasse);
                        index++;
                    });

                }
            });
        }
    }

    deconnection(){
        document.getElementById('fullname').value = "";
		document.getElementById('masterpassword').value = "";

        document.getElementById('connection').disabled = false;
        document.getElementById('deconnection').disabled = true;

        let index = 0;
        this.listeInfosClient.forEach(infosClient => {
            this.afficherDonnee(infosClient, index, null);
            index++;
        });
    }
}
