class Application{
    constructor(window, passDAO, vuePrincipal, vueAjouter){
        this.window = window;
        this.passDAO = passDAO;
        this.vuePrincipal = vuePrincipal;
        this.vueAjouter = vueAjouter;

        this.vueAjouter.initialiserAjout(pass => this.ajouterPass(pass));

        this.window.addEventListener("hashchange", () => this.naviguer());
        this.naviguer();
    }

    naviguer(){
        let hash = window.location.hash;

        if(!hash){

            this.vuePrincipal.initialiserPrincipale(this.passDAO.lister());
            this.vuePrincipal.afficher();

        } else if(hash.match(/^#ajouter/))
            this.vueAjouter.afficher();

    }

    ajouterPass(){
        this.passDAO.ajouter(pass);
        this.window.location.hash = "#";
    }
}

new Application(window, new PasswordDAO(), new VuePrincipale(), new VueAjouter());