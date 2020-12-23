class CryptoManager{

	constructor(){
		this.mpw;
	}
	
	mettreAJourMPW(pseudo, motdepasse) {
		
		if (pseudo == "" ||
			motdepasse == "") {
			this.mpw = null;
			alert("Veuillez remplir les champs!");
			return false;
		} else {
			this.mpw = new MPW(pseudo, motdepasse, 3);
			alert("session : " + pseudo + " ouverte!");
			return true;
		}
	}

	obtenirlisteMotDePasse(listeclient, callback) {
		if (listeclient.length >= 2){
            let listeMotDePasse = [];
            for (let i=1; i < listeclient.length; i++){
                listeMotDePasse[i] = this.obtenirPassword(listeclient[i], i, callback);
			}
		} else { return false; }
	}

	obtenirPassword(client, index, callback) {
		
		if (!this.mpw) {
			alert("Veuillez vous connecter!");
			return;
		}

		let value;
		switch (client.type){
			case "Authentication" :
				value = this.mpw.generateAuthentication(client.site, client.id, client.description, client.template);
				break;
			case "Identification" :
				value = this.mpw.generateIdentification(client.site, client.id, client.description, client.template);
				break;
			case "Recovery" :
				value = this.mpw.generateRecovery(client.site, client.id, client.description, client.template);
				break;
			default : 
				console.log("type invalide!");
		}

		value.then(function (motdepasse) {
			callback(index, motdepasse);
		}, function (err) {
			console.log(err);
			return 0;
		});
	}
}