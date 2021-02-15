class VueSupprimer{

    constructor(){
        this.html = document.getElementById("html-vue-supprimer").innerHTML;
    }

    afficher(infoClient){
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        this.infoClient = infoClient;

         document.getElementById("site").value = infoClient.site;
         document.getElementById("utilisateur").value = infoClient.utilisateur;
         document.getElementById("description").value = infoClient.description;

        this.formulaire = document.getElementById("formulaire-supprimer");
        this.formulaire.addEventListener("submit", (evenement) => this.supprimerInfoClient(evenement));
    }

    initialiserActionSupprimerInfoClient(actionSupprimer){
        this.actionSupprimer = actionSupprimer;
    }

    supprimerInfoClient(evenement){
        this.actionSupprimer(this.infoClient);
    }
}