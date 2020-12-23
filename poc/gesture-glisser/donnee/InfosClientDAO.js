class InfosClientDAO{
    
    constructor(){
        this.listeInfosClient = [];
    }

    initialiserListeInfosClient(listeInfosClient){
        console.log("initialiserListeInfosClient"+listeInfosClient);
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
        this.getJSON('https://cyfrinair.tikenix.me/ListeInfosClients.php',
        (erreur, data) => {
          if (erreur !== null) {
            alert('Something went wrong: ' + erreur);
          } else {
            var listeInfosClient = [];
            for(let position in data){

              let infosClient = new InfosClient(data[position].id,
                  data[position].site,
                  data[position].utilisateur,
                  data[position].description,
                  data[position].template,
                  data[position].type);

              console.log(infosClient);

              listeInfosClient[infosClient.id] = infosClient;
            }

            listeInfosClientDonnee(listeInfosClient);
          }
        });
    }
}