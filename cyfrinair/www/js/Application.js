class Application{
	
	constructor(window, vuePrincipale, vueAjouter, vueModifier, infosClientDAO){
        this.window = window;
        this.vuePrincipale = vuePrincipale;
        this.vueAjouter = vueAjouter;
        this.vueModifier = vueModifier;
        this.infosClientDAO = infosClientDAO;
		
		
		//Callbacks
        this.vueAjouter.initialiserAjout(pass => this.ajouterPass(pass));

		//lancement android
		document.addEventListener("deviceready", () => this.intialiserNavigation(), false);

		//lancement dans le navigateur
		//this.window.addEventListener("hashchange", () => this.naviguer());
        //this.naviguer();
	}

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
}

new Application(window, new VuePrincipale(), new VueAjouter(), new VueModifier(), new InfosClientDAO());