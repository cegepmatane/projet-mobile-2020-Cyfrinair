class Vue2{
    constructor(){
        this.html = document.getElementById("html-vue-2").innerHTML;
        this.mouvementD = null;
        this.mouvementG = null;
        this.enGlisse = false;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        this.initialiserCaptureMouvementGlisser();
    }

    initialiserActionMouvementD(mouvementD){
        this.mouvementD = mouvementD;
    }
    initialiserActionMouvementG(mouvementG){
        this.mouvementG = mouvementG;
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
        if(direction > 90 && direction <= 180)
        {
            if(!this.enGlisse){
                this.mouvementD();
                this.enGlisse = true;
            }
        }
        else if(direction > 180 && direction <= 360)
        {
            if(!this.enGlisse){
                this.mouvementG();
                this.enGlisse = true;
            }
        }
    }
}