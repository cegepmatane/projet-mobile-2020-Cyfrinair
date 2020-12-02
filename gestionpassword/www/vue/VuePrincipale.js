class VuePrincipale{

    constructor(){
        this.html = document.getElementById("html-vue-principale").innerHTML;
        this.listePasswordDonnee = null;
    }

    initialiserPrincipale(listePasswordDonnee){
        this.listePasswordDonnee = listePasswordDonnee;
    }

    afficher(){

        console.log("donnne " + this.listePasswordDonnee);
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        let listePassword = document.getElementById("liste-pass");
        const listePasswordItemHTML = listePassword.innerHTML;
        let listePasswordHTMLRemplacement = "";
        console.log("password html " + listePasswordItemHTML);

        for(var numPassword in this.listePasswordDonnee){
            let listePasswordItemHTMLRemplacement = listePasswordItemHTML;
            listePasswordItemHTMLRemplacement = listePasswordItemHTMLRemplacement.replace("{Password.id}", this.listePasswordDonnee[numPassword].id);
            listePasswordItemHTMLRemplacement = listePasswordItemHTMLRemplacement.replace("{Password.website}", this.listePasswordDonnee[numPassword].website);
            listePasswordItemHTMLRemplacement = listePasswordItemHTMLRemplacement.replace("{Password.user}", this.listePasswordDonnee[numPassword].user);
            listePasswordItemHTMLRemplacement = listePasswordItemHTMLRemplacement.replace("{Password.password}", this.listePasswordDonnee[numPassword].password);
            listePasswordItemHTMLRemplacement = listePasswordItemHTMLRemplacement.replace("{Password.description}", this.listePasswordDonnee[numPassword].description);
            listePasswordHTMLRemplacement += listePasswordItemHTMLRemplacement;
        }

        listePassword.innerHTML = listePasswordHTMLRemplacement;
    }
}