class Vue1{
    constructor(){
        this.html = document.getElementById("html-vue-1").innerHTML;
        this.actionMouvementGlisse = null;
        this.enGlisse = false;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        this.initialiserCaptureMouvementGlisser();
    }

    initialiserActionMouvementGlisseDroiteGaucheVue1(actionMouvementGlisse){
        this.actionMouvementGlisse = actionMouvementGlisse;
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
        let direction = (evenement.detail.data[donneeDuMouvement].currentDirection);
        console.log(direction);
        if(direction > 90 && direction <= 180 ) //intervalle qui definit un swipe de droite a gauche
        {
            if(!this.enGlisse){
                this.actionMouvementGlisse();
                this.enGlisse = true;
            }
        }
    }
}