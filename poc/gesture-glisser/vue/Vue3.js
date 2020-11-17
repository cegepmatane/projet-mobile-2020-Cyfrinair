class Vue3{
    constructor(){
        this.html = document.getElementById("html-vue-3").innerHTML;
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
        if(direction > 180 && direction <= 360) // intervalle qui definit un swipe de gauche a droite
        {
            if(!this.enGlisse){
                this.mouvement();
                this.enGlisse = true;
            }
        }
    }
}