class VuePrincipale{

    constructor(){
        this.html = document.getElementById("html-vue-principale").innerHTML;
        this.stage = null;
        this.listeInfosClient = null;
        this.modifierElement = null;
        this.supprimerElement = null;

        this.enGlisse = false;
        this.actionMouvementGlisse = null;

        this.manager = new CryptoManager();
        
        this.sensibilitee = 15;
        this.monShakeEvent = new Shake({
			threshold: this.sensibilitee
        });
        
        this.connecter = false;

    }

    initialiserModifierElement(modifierElement){
        this.modifierElement = modifierElement;
    }

    initialiserSupprimerElement(supprimerElement){
            this.supprimerElement = supprimerElement;
    }

    initialiserActionGlisseBasHaut(actionMouvementGlisse){
        this.actionMouvementGlisse = actionMouvementGlisse;
    }

    initialiserCaptureMouvementGlisser(tirable){
        const nombrePointEntree = 1;
        const tempsMouvementGlisse = 100;
        const vitesseMouvement = 0.25;
        let aireToucher = tirable;
        let region = new ZingTouch.Region(aireToucher);
        let glisse = new ZingTouch.Swipe({
            numInputs: nombrePointEntree,
            maxRestTime: tempsMouvementGlisse,
            escapeVelocity: vitesseMouvement
        });

        region.bind(aireToucher, glisse, (evenement) => this.confirmerGlisse(evenement));
    }

    confirmerGlisse(evenement){
        const donneeDuMouvement = 0;
        let direction = (evenement.detail.data[donneeDuMouvement].currentDirection);
        console.log(direction);
        //Indique en degrés la réduction à appliquer sur la direction de swipe
        let reductionSens = 20;
        console.log(evenement.detail.data);
        if(direction > 0 + reductionSens && direction <= 180 - reductionSens )
        {
            if(!this.enGlisse){
                this.actionMouvementGlisse();
                this.enGlisse = true;
            }
        }
    }

    initialiserListeInfosClient(listeInfosClient){
        this.listeInfosClient = listeInfosClient;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        //Gesture swipe vers l'ajout
        let flecheAjout = document.getElementById('toucharea');
        this.initialiserCaptureMouvementGlisser(flecheAjout);

        //Création stage EaselJS
        this.stage = new createjs.Stage("canvas-donnees");
        createjs.Ticker.addEventListener("tick", () => this.update());
        createjs.Ticker.framerate = Configuration.TAUX_RAFRAICHISSEMENT;

        //boutton de connection
        document.getElementById('connection').addEventListener("click", () => { this.connection(); }, false);
        document.getElementById('deconnection').addEventListener("click", () => { this.deconnection(); }, false);

        window.addEventListener('shake', () => { if (this.connecter) {alert("SECOUSSES!"); this.deconnection();} }, false);

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

        //Sans changement de canvas, on appelle directement afficherCadresDonnees()
        this.afficherCadresDonnees(null);
    }

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
        let conteneur = new createjs.Container();
        conteneur.width = this.stage.canvas.width;

        //Construction du cadre
        let forme = new createjs.Shape();
        forme.width = this.stage.canvas.width;
        forme.height = Configuration.HAUTEUR_DONNEE;
        forme.y =  index*(Configuration.HAUTEUR_DONNEE + Configuration.MARGIN_DONNEE);
        forme.graphics.beginFill("grey").drawRect(0, 0, forme.width, forme.height);

        conteneur.addChild(forme);

        let site = this.creerInfo(forme, infosClient.site, Configuration.ALIGNEMENT_GAUCHE, Configuration.POS_GAUCHE);
        let utilisateur = this.creerInfo(forme, infosClient.utilisateur, Configuration.ALIGNEMENT_GAUCHE, Configuration.POS_MILIEU_GAUCHE);
        //let description = this.creerInfo(forme, infosClient.description, Configuration.ALIGNEMENT_DROITE, Configuration.POS_MILIEU_DROITE);

        forme.alpha = 0;
        this.stage.x = -forme.width;
        //Animations de slide gauche-droite et apparition
        createjs.Tween.get(this.stage).to({x:0}, Configuration.DUREE_ANIMATION, createjs.Ease.quadOut);
        createjs.Tween.get(forme).to({alpha:1}, Configuration.DUREE_ANIMATION);

        if (listeMotDePasse != null){
            let motDePasse = this.creerInfo(forme, listeMotDePasse[index + 1], Configuration.ALIGNEMENT_DROITE, Configuration.POS_DROITE);
            this.stage.addChild(forme, site, utilisateur, motDePasse);
        } else {
            this.stage.addChild(forme, site, utilisateur);
        }

        createjs.Touch.enable(this.stage);
        var that = this;

        forme.on("pressmove", function(evt){
            evt.target.x = evt.stageX;
            evt.target.alpha = 1 - evt.target.x / evt.target.width;
            site.alpha = utilisateur.alpha = evt.target.alpha;
        });

        forme.on("pressup", (evt) => {
            if(forme.x > Configuration.DISTANCE_X_MAX_SUPP*forme.width){
                that.supprimerElement(infosClient, index);
            }
            else{
                forme.x = positionInitialeForme;
                evt.target.alpha = 1;
            }
        });

        forme.addEventListener("click", () => this.modifierElement(infosClient));
    }

    connection(){
		let pseudo = document.getElementById('fullname').value;
		let motdepasse = document.getElementById('masterpassword').value;

        document.getElementById('connection').disabled = true;
        let valide = this.manager.mettreAJourMPW(pseudo, motdepasse);
        
        if (valide){
            let listeMotDePasse = [];
            this.manager.obtenirlisteMotDePasse(this.listeInfosClient, (index, data)=>{
                if (listeMotDePasse.length < this.listeInfosClient.length){
                    listeMotDePasse[index] = data;
                }
                if (listeMotDePasse.length == this.listeInfosClient.length){

                    this.connecter = true;
					document.getElementById('deconnection').disabled = false;
                    this.stage.removeAllChildren();
                    this.afficherCadresDonnees(listeMotDePasse);
                }
            });
        } else {
            document.getElementById('connection').disabled = false;
        }
    }

    deconnection(){
        document.getElementById('fullname').value = "";
		document.getElementById('masterpassword').value = "";

        this.connecter = false;
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
        information.mouseChildren = false;
        return information;
    }
}
