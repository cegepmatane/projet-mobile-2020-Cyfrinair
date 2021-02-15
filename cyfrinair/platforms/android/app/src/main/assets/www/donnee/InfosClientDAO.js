class InfosClientDAO{

    constructor(){
      this.listeInfosClient = [];
      this.URL_LISTE = "https://cyfrinair.freehv.me/ListeInfosClients.php";
      this.URL_SUPPRIMER = "https://cyfrinair.freehv.me/SupprimerInfoClient.php";
    }

    initialiserListeInfosClient(listeInfosClient){
      //console.log("initialiserListeInfosClient"+listeInfosClient);
      this.listeInfosClient = listeInfosClient;
    }

    getJSON(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.send();
    };

    listerInfosClient(listeInfosClientDonnee){
        this.getJSON(this.URL_LISTE, (erreur, data) => {
          if (erreur !== null) {
            alert('Erreur InfosClientDAO::listerInfosClient: ' + erreur);
          }
          else {
            var listeInfosClient = [];
            for(let position in data){
              let infosClient = new InfosClient(data[position].id,
                  data[position].site,
                  data[position].utilisateur,
                  data[position].description,
                  data[position].template,
                  data[position].type);

              listeInfosClient[infosClient.id] = infosClient;
            }
            listeInfosClientDonnee(listeInfosClient);
          }
        });
    }

    postJSON(url, params) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url, true);
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.send(params);
     };

    supprimerInfoClient(infoClient){
        console.log("Suppression de " + infoClient.constructor.name + " num." + infoClient.id);
        this.postJSON(this.URL_SUPPRIMER, "id=" + infoClient.id);
    }
}