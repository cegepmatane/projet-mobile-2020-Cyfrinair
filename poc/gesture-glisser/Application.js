class Application {
    constructor(window, vue1, vue2, vue3){
        this.window = window;
        this.vue1 = vue1;
        this.vue2 = vue2;
        this.vue3 = vue3;
       
        this.capturerMouvements();
    }

    capturerMouvements(){
        this.afficherVue();
        this.vue1.initialiserActionMouvement(() => this.mouvement());
        this.vue2.initialiserActionMouvementD(() => this.mouvement2());
        this.vue2.initialiserActionMouvementG(() => this.afficherVue());
        this.vue3.initialiserActionMouvement(() => this.mouvement());
    }

    afficherVue(){
        this.vue1.afficher();
        this.vue1.enGlisse = false;
    }

    mouvement(){
        //console.log("app--> mouvement");
        this.vue2.afficher();
        this.vue2.enGlisse = false;
    }
    mouvement2(){
        //console.log("app--> mouvement2");
        this.vue3.afficher();
        this.vue3.enGlisse = false;
    }
    mouvement3(){
        //console.log("app--> mouvement3");
        this.vue1.afficher();
        this.capturerMouvements();
    }
}

new Application(window, new Vue1(), new Vue2(), new Vue3());