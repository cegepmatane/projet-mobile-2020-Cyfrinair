class VuePrincipale{

    constructor(){
        this.html = document.getElementById("html-vue-principale").innerHTML;
        this.stage = null;
        this.listeInfosClient = null;
    }

    initialiserListeInfosClient(listeInfosClient){
        this.listeInfosClient = listeInfosClient;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        /*
        let listePassword = document.getElementById("liste-pass");
        const listePasswordItemHTML = listePassword.innerHTML;
        let listePasswordHTMLRemplacement = "";
        //console.log("password html " + listePasswordItemHTML);

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
        */

        //Création stage EaselJS
        this.stage = new createjs.Stage("canvas-donnees");
        createjs.Ticker.addEventListener("tick", () => this.update());
        createjs.Ticker.framerate = Configuration.TAUX_RAFRAICHISSEMENT;

        this.initialiserElementsGraphiques();
    }

    update()
    {
        this.stage.update();
    }

    initialiserElementsGraphiques()
    {
        /*
        let image = new Image();
        image.src = "img/lock-shape.svg"; 
        image.addEventListener("load", evenement => this.afficherCadenas(evenement));
        */

        //Sans changement de canvas, on appelle directement afficherCadresDonnees()
        this.afficherCadresDonnees();
    }

    /*
    afficherCadenas(evenement)
    {
        let imageCadenas = evenement.target;
        let cadenas = new createjs.Bitmap(imageCadenas);
    
        cadenas.scale = Configuration.SCALE_CADENAS;
        //Permet de centrer le cadenas en X et le positionner au dessus du canvas pour animation
        cadenas.x = (this.stage.canvas.width - cadenas.scale * cadenas.image.width) / 2;
        cadenas.y = -cadenas.image.height;
    
        //Centrer le cadenas en Y
        let centreY = (this.stage.canvas.height - cadenas.scale * cadenas.image.height) / 2;
        
        //Animation descendre
        createjs.Tween.get(cadenas)
            .to({y:centreY}, Configuration.DUREE_ANIMATION, createjs.Ease.bounceOut)
            .call(() => this.afficherCadresDonnees());

        this.stage.addChild(cadenas);
    }
    */

    afficherCadresDonnees()
    {
        //Changement de canvas dans la vue
        //this.stage = new createjs.Stage("canvas-donnees");

        this.stage.canvas.width = window.innerWidth;
        //Permet d'adapter la taille du canvas selon le nombre de données à afficher
        this.stage.canvas.height = (Configuration.HAUTEUR_DONNEE + Configuration.MARGIN_DONNEE) * this.listeInfosClient.length;	
        //Construction de chaque donnée dans un cadre
        let index = 0;
        this.listeInfosClient.forEach(infosClient => {
            this.afficherDonnee(infosClient, index);
            index++;
        });
    }
    
    afficherDonnee(infosClient, index) 
    {
        //Construction du cadre
        // let cadre = new createjs.Container();
        //Fond du cadre
        let forme = new createjs.Shape();
        forme.width = this.stage.canvas.width;
        forme.height = Configuration.HAUTEUR_DONNEE;
        forme.y =  index*(Configuration.HAUTEUR_DONNEE + Configuration.MARGIN_DONNEE);
        forme.graphics.beginFill("grey").drawRect(0, 0, forme.width, forme.height);
        
        //Donnée: site web
        let site = new createjs.Text("Site: " + infosClient.site, Configuration.FONT, "black");
        site.textAlign = "left";
        site.x = forme.x + 0.05 * forme.width;
        site.y = forme.y + (forme.height/2 - site.getMeasuredHeight()/2);
    
        //Donnée: mot de passe
        let utilisateur = new createjs.Text("Utilisateur: " + infosClient.utilisateur, Configuration.FONT, "black");
        utilisateur.textAlign = "right";
        utilisateur.x = forme.x + 0.95 * forme.width;
        utilisateur.y = forme.y + (forme.height / 2 - utilisateur.getMeasuredHeight()/2);
    
        //Ajout des éléments au cadre
        // cadre.addChild(forme, site, mdp);

        // //Animations de slide gauche-droite
        this.stage.x = -forme.width;
        createjs.Tween.get(this.stage)
            .to({x:0}, Configuration.DUREE_ANIMATION, createjs.Ease.quadOut);

        // //Apparition
        forme.alpha = 0;
        createjs.Tween.get(forme)
            .to({alpha:1}, Configuration.DUREE_ANIMATION);
    
        this.stage.addChild(forme, site, utilisateur);
    }
}




{/* <ul id="liste-pass">
<li>
  <div class="item">
      <table class="t1">
          <tr>
              <th>Site web</th>
              <th>User</th>
              <th>Mot de passe</th>
              <th>Description</th>
              <th>Modifier</th>
          </tr>
              
          <div class="boite">
              <tr>
                  <td>{Password.website}</td>
                  <td>{Password.user}</td>
                  <td>{Password.password}</td>
                  <td>{Password.description}</td>
                  <td><a href="#pass/{Password.id}" class="liste-pass-item">Modifier</a></td>
              </tr>
          </div>
      </table>       
  </div>
</li>
</ul> */}