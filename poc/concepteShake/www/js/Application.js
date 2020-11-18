class Application{
	
	constructor(window, vueShake){
		this.window = window;
		
		this.vueShake = vueShake;
		
		this.window.addEventListener("hashchange", () => this.naviguer());
		
		this.naviguer();
	}
	
	naviguer(){
		let hash = window.location.hash;
		
		if (!hash){
			this.vueShake.afficher();
			this.vueShake.initialiser();
		}
	}
}

new Application(window, new VueShake());