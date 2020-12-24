class VueCrypto{

	constructor(){
		this.html = document.getElementById("html-vue-crypto").innerHTML;
		this.manager = new CryptoManager();

		this.listeClient = [
			new InfosClient(23,
			"www.facebook.com",
			"GirardL@mail.com",
			"Compte facebook de Girard",
			"long",
			"Authentication"), 
			new InfosClient(59,
			"www.youtube.com",
			"GirardL@mail.com",
			"Compte youtube de Girard",
			"long",
			"Authentication")
		];
	}

	genererCleMaitre(){
		let pseudo = document.getElementById('fullname').value;
		let motdepasse = document.getElementById('masterpassword').value;

		this.manager.mettreAJourMPW(pseudo, motdepasse);
	}

	afficher(){
		document.getElementsByTagName('body')[0].innerHTML = this.html;

		document.getElementById('connection').addEventListener("click", () => { this.genererCleMaitre(); }, false);
		document.getElementById('testClient1').addEventListener("click", () => { this.manager.obtenirPassword(this.listeClient[0]); }, false);
		document.getElementById('testClient2').addEventListener("click", () => { this.manager.obtenirPassword(this.listeClient[1]); }, false);
	}
}