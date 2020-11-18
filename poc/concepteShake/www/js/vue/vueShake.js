class VueShake{

	constructor(){
		this.html = document.getElementById("html-vue-shake").innerHTML;
		this.sensibilitee = 15;
	}

	initialiser(){
		var monShakeEvent = new Shake({
			threshold: this.sensibilitee
		});

		// débute l'écoute
		monShakeEvent.start();

		// abonnement a l'event
		window.addEventListener('shake', shakeCallback, false);

		//callback
		function shakeCallback () {
			alert('Shake!');
		}

		// terminer l'écoute
		//monShakeEvent.stop();
	}
	
	afficher(){
		document.getElementsByTagName('body')[0].innerHTML = this.html;
	}
}