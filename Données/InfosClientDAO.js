class InfosClientDAO{
    
    constructor(){
        this.listeInfosClient = [];
    }

    listerInfosClient(){

        let url = "https://cyfrinair.tikenix.me/ListeInfosClients.php";

        this.listeInfosClient = JSON.parse(url);

        for(let position in this.listeInfosClient){

            let infosClient = new InfosClientDAO(this.listeInfosClient[position].id,
                this.listeInfosClient[position].website,
                this.listeInfosClient[position].user,
                this.listeInfosClient[position].description,
                this.listeInfosClient[position].template,
                this.listeInfosClient[position].type);

                this.listeInfosClient[infosClient.id] = infosClient;
        }

        return this.listeInfosClient;
    }
}