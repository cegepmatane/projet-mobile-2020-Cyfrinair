class Application
{
    constructor(window, vueDonnees)
    {
        this.window = window;
        this.vueDonnees = vueDonnees;

        this.window.addEventListener("hashchange", () =>this.naviguer());
        this.naviguer();
    }

    naviguer()
    {
        let hash = window.location.hash;
        if(!hash)
        {
            this.vueDonnees.afficher();
            
        }
    }
}

new Application(window, new VueDonnees());