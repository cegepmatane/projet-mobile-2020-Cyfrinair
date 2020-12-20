class Application{
    constructor(window, passDAO, vuePrincipal, vueAjouter, vueModifier){
        this.window = window;
        this.passDAO = passDAO;
        this.vuePrincipal = vuePrincipal;
        this.vueAjouter = vueAjouter;
        this.vueModifier = vueModifier;

        this.vueAjouter.initialiserAjout(pass => this.ajouterPass(pass));

        this.window.addEventListener("hashchange", () => this.naviguer());
        this.naviguer();
    }

    naviguer(){
        let hash = window.location.hash;

        if(!hash){

            this.vuePrincipal.initialiserPrincipale(this.passDAO.lister());
            this.vuePrincipal.afficher();

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

new Application(window, new PasswordDAO(), new VuePrincipale(), new VueAjouter(), new VueModifier());