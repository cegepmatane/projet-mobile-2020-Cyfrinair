class Vue3{
    constructor(){
        this.html = document.getElementById("html-vue-3").innerHTML;
        this.actionMouvementGlisseVersGauche = null;
        this.enGlisse = false;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        this.initialiserCaptureMouvementGlisser();
    }
    

    initialiserActionMouvement(actionMouvementGlisseVersGauche){
        this.actionMouvementGlisseVersGauche = actionMouvementGlisseVersGauche;
    }

    initialiserCaptureMouvementGlisser(){
        const nombrePointEntree = 1;
        const tempsMouvementGlisse = 100;
        const vitesseMouvement = 0.25;
        let touchArea = document.getElementById('toucharea');
        let region = new ZingTouch.Region(touchArea);
        let glisse = new ZingTouch.Swipe({
            numInputs: nombrePointEntree,
            maxRestTime: tempsMouvementGlisse,
            escapeVelocity: vitesseMouvement
        });

        region.bind(touchArea, glisse, (evenement) => this.confirmerGlisse(evenement));
    }

    confirmerGlisse(evenement){
        const donneeDuMouvement = 0;
        var direction = (evenement.detail.data[donneeDuMouvement].currentDirection);
        console.log(direction);
        if(direction > 180 && direction <= 360) // intervalle qui definit un swipe de gauche a droite
        {
            if(!this.enGlisse){
                this.actionMouvementGlisseVersGauche();
                this.enGlisse = true;
            }
        }
    }
}