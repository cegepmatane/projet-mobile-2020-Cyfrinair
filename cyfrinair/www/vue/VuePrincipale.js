class VuePrincipale{

    constructor(){
        this.html = document.getElementById("html-vue-principale").innerHTML;
        this.stage = null;
        this.listeInfosClient = null;
        this.manager = new CryptoManager();
        this.monShakeEvent = new Shake({
			threshold: this.sensibilitee
		});
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
        document.getElementById('connection').addEventListener("click", () => { this.connection(); }, false);
        document.getElementById('deconnection').addEventListener("click", () => { this.deconnection(); }, false);

        window.addEventListener('shake', () => { alert("SECOUSSES!"); this.deconnection(); }, false);

		// débute l'écoute
		this.monShakeEvent.start();

        this.initialiserElementsGraphiques();
    }

    update()
    {
        this.stage.update();
    }

    initialiserElementsGraphiques()
    {
        this.stage.canvas.width = window.innerWidth;
        //Permet d'adapter la taille du canvas selon le nombre de données à afficher
        this.stage.canvas.height = (Configuration.HAUTEUR_DONNEE + Configuration.MARGIN_DONNEE) * this.listeInfosClient.length;	
        /*
        let image = new Image();
        image.src = "img/lock-shape.svg"; 
        image.addEventListener("load", evenement => this.afficherCadenas(evenement));
        */

        //Sans changement de canvas, on appelle directement afficherCadresDonnees()
        this.afficherCadresDonnees(null);
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

    afficherCadresDonnees(listeMdp)
    {
        //Construction de chaque donnée dans un cadre
        let index = 0;
        this.listeInfosClient.forEach(infosClient => {
            this.afficherDonnee(infosClient, index, listeMdp);
            index++;
        });
    }
    
    afficherDonnee(infosClient, index, listeMotDePasse) 
    {
        //Construction du cadre
        let forme = new createjs.Shape();
        forme.width = this.stage.canvas.width;
        forme.height = Configuration.HAUTEUR_DONNEE;
        forme.y =  index*(Configuration.HAUTEUR_DONNEE + Configuration.MARGIN_DONNEE);
        forme.graphics.beginFill("grey").drawRect(0, 0, forme.width, forme.height);

        let site = this.creerInfo(forme, infosClient.site, Configuration.ALIGNEMENT_GAUCHE, Configuration.POS_GAUCHE);
        let utilisateur = this.creerInfo(forme, infosClient.utilisateur, Configuration.ALIGNEMENT_MILIEU, Configuration.POS_MILIEU_GAUCHE);
        let description = this.creerInfo(forme, infosClient.description, Configuration.ALIGNEMENT_DROITE, Configuration.POS_MILIEU_DROITE);

        forme.alpha = 0;
        this.stage.x = -forme.width;
        //Animations de slide gauche-droite et apparition
        createjs.Tween.get(this.stage).to({x:0}, Configuration.DUREE_ANIMATION, createjs.Ease.quadOut);
        createjs.Tween.get(forme).to({alpha:1}, Configuration.DUREE_ANIMATION);
    
        if (listeMotDePasse != null){
            let motDePasse = this.creerInfo(forme, listeMotDePasse[index + 1], Configuration.ALIGNEMENT_DROITE, Configuration.POS_DROITE);
            this.stage.addChild(forme, site, utilisateur, description, motDePasse);
        } else {
            this.stage.addChild(forme, site, utilisateur, description);
        }
    }

    connection(){
        
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

                    this.stage.removeAllChildren();
                    this.afficherCadresDonnees(listeMotDePasse);
                }
            });
        }
    }

    deconnection(){
        document.getElementById('fullname').value = "";
		document.getElementById('masterpassword').value = "";

        document.getElementById('connection').disabled = false;
        document.getElementById('deconnection').disabled = true;

        this.afficherCadresDonnees(null);
    }

    creerInfo(forme, valeurInfo, alignement, positionnement)
    {
        let information = new createjs.Text(valeurInfo, Configuration.FONT, "white");
        information.textAlign = alignement;
        information.x = forme.x + positionnement * forme.width;
        information.y = forme.y + (forme.height / 2 - information.getMeasuredHeight()/2);
        return information;
    }
}
