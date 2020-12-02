class Vue2{
    constructor(){
        this.html = document.getElementById("html-vue-2").innerHTML;
        this.actionMouvementGlisseVersDroite = null;
        this.actionMouvementGlisseVersGauche = null;
        this.enGlisse = false;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        this.initialiserCaptureMouvementGlisser();
    }

    initialiserActionMouvementGlisseGaucheDroiteVue2(actionMouvementGlisseVersDroite){
        this.actionMouvementGlisseVersDroite = actionMouvementGlisseVersDroite;
    }
    initialiserActionMouvementGlisseDroiteGaucheVue2(actionMouvementGlisseVersGauche){
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
        if(direction > 90 && direction <= 180)
        {
            if(!this.enGlisse){
                this.actionMouvementGlisseVersDroite();
                this.enGlisse = true;
            }
        }
        else if(direction > 180 && direction <= 360)
        {
            if(!this.enGlisse){
                this.actionMouvementGlisseVersGauche();
                this.enGlisse = true;
            }
        }
    }
}