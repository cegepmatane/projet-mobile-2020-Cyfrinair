class Application {
    constructor(window, vue1, vue2, vue3){
        this.window = window;
        this.vue1 = vue1;
        this.vue2 = vue2;
        this.vue3 = vue3;
    
        this.capturerMouvements();
    }

    capturerMouvements(){
        this.afficherVue1();
        this.vue1.initialiserActionMouvementGlisseDroiteGaucheVue1(() => this.actionMouvementGlisse());
        this.vue2.initialiserActionMouvementGlisseGaucheDroiteVue2(() => this.actionMouvementGlisseVersDroite());
        this.vue2.initialiserActionMouvementGlisseDroiteGaucheVue2(() => this.actionMouvementGlisseVersGauche());
        this.vue3.initialiserActionMouvement(() => this.actionMouvementGlisse());
    }

    afficherVue1(){
        this.vue1.afficher();
        this.vue1.enGlisse = false;
    }

    afficherVue2(){
        this.vue2.afficher();
        this.vue2.enGlisse = false;
    }

    afficherVue3(){
        this.vue3.afficher();
        this.vue3.enGlisse = false;
    }

    actionMouvementGlisse(){
        this.afficherVue2();
    }

    actionMouvementGlisseVersDroite(){
        this.vue3.afficher();
        this.vue3.enGlisse = false;
    }

    actionMouvementGlisseVersGauche(){
        this.afficherVue1();
        this.capturerMouvements();
    }
}
new Application(window, new Vue1(), new Vue2(), new Vue3());