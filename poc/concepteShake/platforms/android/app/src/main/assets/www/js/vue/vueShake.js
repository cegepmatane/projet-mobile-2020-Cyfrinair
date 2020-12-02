class VueShake{

	constructor(){
		this.html = document.getElementById("html-vue-shake").innerHTML;
		this.sensibilitee = 15;

		//Créer une instance de Shake.js
		this.monShakeEvent = new Shake({
			threshold: this.sensibilitee
		});
	}

	//definition du callback
	agirRetourShake () {
		alert('Shake!');
	}
	
	afficher(){
		document.getElementsByTagName('body')[0].innerHTML = this.html;

		// abonnement a l'event
		window.addEventListener('shake', () => this.agirRetourShake, false);

		// débute l'écoute
		this.monShakeEvent.start();

		// terminer l'écoute
		//window enlever event listener
		//this.monShakeEvent.stop();
	}
}