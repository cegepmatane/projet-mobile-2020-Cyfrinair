class Application{
	
	constructor(window, vuePrincipale, vueAjouter, vueModifier, infosClientDAO){
        this.window = window;
        this.vuePrincipale = vuePrincipale;
        this.vueAjouter = vueAjouter;
        this.vueModifier = vueModifier;
        this.infosClientDAO = infosClientDAO;
		
		
		//Callbacks
        //this.vueAjouter.initialiserAjout(pass => this.ajouterPass(pass));

		//lancement android
		//document.addEventListener("deviceready", () => this.intialiserNavigation(), false);
		//lancement dans le navigateur
		//this.window.addEventListener("hashchange", () => this.naviguer());
        //this.naviguer();

        this.afficherVuePrincipale();
        //Intégration gesture swipe vers le bas
        this.capturerMouvements();
	}

    capturerMouvements(){
        this.vuePrincipale.initialiserActionGlisseBasHaut(() => this.actionMouvementGlisseVersBas());
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

new Application(window, new VuePrincipale(), new VueAjouter(), new VueModifier(), new InfosClientDAO());