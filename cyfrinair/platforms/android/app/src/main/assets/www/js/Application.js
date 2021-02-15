class Application{
	
	constructor(window, vuePrincipale, vueAjouter, vueModifier, vueSupprimer, infosClientDAO){
        this.window = window;
        this.vuePrincipale = vuePrincipale;
        this.vueAjouter = vueAjouter;
        this.vueModifier = vueModifier;
        this.vueSupprimer = vueSupprimer;
        this.infosClientDAO = infosClientDAO;

		//Callbacks pour l'affichage
        this.vuePrincipale.initialiserModifierElement(modifier => this.modifierInfosClient(modifier));
        this.vuePrincipale.initialiserSupprimerElement((infoClient, index) => this.naviguerSupprimerInfoClient(infoClient, index));

        //Callbacks DAO
        this.vueSupprimer.initialiserActionSupprimerInfoClient(infoClient => this.actionSupprimerInfoClient(infoClient));

		//lancement android
		//document.addEventListener("deviceready", () => this.intialiserNavigation(), false);
		//lancement dans le navigateur
		//this.window.addEventListener("hashchange", () => this.naviguer());
        //this.naviguer();

        this.afficherVuePrincipale();
        this.capturerMouvements();
	}

	modifierInfosClient(infosClient){
	    this.vueModifier.afficher(infosClient);
	}

	naviguerSupprimerInfoClient(infosClient){
	    this.vueSupprimer.afficher(infosClient);
	}

	actionSupprimerInfoClient(infoClient){
	    this.infosClientDAO.supprimerInfoClient(infoClient);
	}

    capturerMouvements(){
        //Initialisation des swipes possibles depuis la vue principale
        this.vuePrincipale.initialiserActionGlisseBasHaut(() => this.actionMouvementGlisseVersBas());
        //Le swipe vers la gauche se fait sur les items pour les supprimer
        this.vueAjouter.initialiserActionGlisseHautBas(() => this.actionMouvementGlisseVersHaut());
    }

    afficherVuePrincipale(){
        this.infosClientDAO.listerInfosClient((listeInfosClient)=>{
            this.vuePrincipale.initialiserListeInfosClient(listeInfosClient);
            this.vuePrincipale.afficher();
        });

        this.vuePrincipale.enGlisse = false;
    }

    afficherVueAjouter(){
        this.vueAjouter.afficher();
        this.vueAjouter.enGlisse = false;
    }

    actionMouvementGlisseVersBas(){
        this.afficherVueAjouter();
    }

    actionMouvementGlisseVersHaut(){
        this.afficherVuePrincipale();
    }

    actionMouvementGlisseVersGauche(infosClient){
        this.afficherVueSupprimer(infosClient);
    }

    /*
	intialiserNavigation(){
    		this.window.addEventListener("hashchange", () => this.naviguer());
    		setTimeout(() =>this.naviguer(), 3000);
    }
	
	naviguer(){
        let hash = window.location.hash;

        if(!hash){
            this.infosClientDAO.listerInfosClient((data)=>{
                this.vuePrincipale.initialiserListeInfosClient(data);
                this.vuePrincipale.afficher();
                //this.vuePrincipale.enGlisse = false;}
            });
        } 
        else if(hash.match(/^#ajouter/))
        {
            this.vueAjouter.afficher();
        }
        else
        {
            this.vueModifier.afficher();
        }

	}
	
	ajouterPass(){
        this.passDAO.ajouterPass(pass);
        this.window.location.hash = "#";
    }
    */
}

new Application(window,
                new VuePrincipale(),
                new VueAjouter(),
                new VueModifier(),
                new VueSupprimer(),
                new InfosClientDAO());