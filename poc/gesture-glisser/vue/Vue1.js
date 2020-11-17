class Vue1{
    constructor(){
        this.html = document.getElementById("html-vue-1").innerHTML;
        this.mouvement = null;
        this.enGlisse = false;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        this.initialiserCaptureMouvementGlisser();
    }

    initialiserActionMouvement(mouvement){
        this.mouvement = mouvement;
    }

    initialiserCaptureMouvementGlisser(){
        var touchArea = document.getElementById('toucharea');
        var region = new ZingTouch.Region(touchArea);
        var glisse = new ZingTouch.Swipe({
            numInputs: 1,
            maxRestTime: 100,
            escapeVelocity: 0.25
        });

        region.bind(touchArea, glisse, (e) => this.confirmerGlisse(e));
    }

    confirmerGlisse(e){
        var direction = (e.detail.data[0].currentDirection);
        console.log(direction);
        if(direction > 90 && direction <= 180 ) // intervalle qui definit un swipe de droite a gauche
        {
            if(!this.enGlisse){
                this.mouvement();
                this.enGlisse = true;
            }
        }
    }
}