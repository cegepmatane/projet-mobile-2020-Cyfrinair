class VueAjouter{
    
    constructor(){
        this.html = document.getElementById("html-vue-ajouter").innerHTML;
        this.ajouterPass = null;

        this.enGlisse = false;
        this.actionMouvementGlisse = null;
    }

    initialiserActionGlisseHautBas(actionMouvementGlisse){
        this.actionMouvementGlisse = actionMouvementGlisse;
    }

    initialiserCaptureMouvementGlisser(){
        const nombrePointEntree = 1;
        const tempsMouvementGlisse = 100;
        const vitesseMouvement = 0.25;
        let aireToucher = document.getElementById('toucharea');
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
        if(direction > 225 && direction <= 315 ) //intervalle qui definit un swipe de haut en bas
        {
            if(!this.enGlisse){
                this.actionMouvementGlisse();
                this.enGlisse = true;
            }
        }
    }


    initialiserAjout(ajouterPass){
        this.ajouterPass = ajouterPass;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        //Gesture swipe
        this.initialiserCaptureMouvementGlisser();

        //document.getElementById("form-ajouter").addEventListener("submit", evenement => this.enregistrer(evenement));
    }

    enregistrer(evenement){
        evenement.preventDefault();

        let website = doument.getElementById("password-website").value;
        let user = doument.getElementById("password-user").value;
        let password = genererPassword();
        let description = doument.getElementById("password-description").value;

        this.ajouterPass(new Password(website, user, password, description, null))
    }

}