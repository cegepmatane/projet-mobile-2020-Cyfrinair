class CryptoManager{

	constructor(){
		this.mpw;
	}
	
	mettreAJourMPW(pseudo, motdepasse) {
		
		if (pseudo == "" ||
			motdepasse == "") {
			this.mpw = null;
			alert("Veuillez remplir les champs!");
		} else {
			this.mpw = new MPW(pseudo, motdepasse, 3);

			alert("session : " + pseudo + " ouverte!");
		}
	}

	obtenirPassword(client) {
		
		if (!this.mpw) {
			alert("Veuillez vous connecter!");
			return;
		}
		
		let value;
		switch (client.type){
			case "Authentication" :
				value = this.mpw.generateAuthentication(client.website, client.id, client.description, client.template);
				break;
			case "Identification" :
				value = this.mpw.generateIdentification(client.website, client.id, client.description, client.template);
				break;
			case "Recovery" :
				value = this.mpw.generateRecovery(client.website, client.id, client.description, client.template);
				break;
			default : 
				console.log("type invalide!");
		}

		value.then(function (motdepasse) {
			//mot de passe generer
			alert(motdepasse);
		}, function (err) {
			alert(err.message);
			console.log(err);
		});
	}
}