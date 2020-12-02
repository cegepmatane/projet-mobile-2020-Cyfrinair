class Application{
	
	constructor(window, vueShake){
		this.window = window;
		
		this.vueShake = vueShake;
		
		document.addEventListener("deviceready", () => this.intialiserNavigation(), false);
	}

	intialiserNavigation(){
    		this.window.addEventListener("hashchange", () => this.naviguer());
    		setTimeout(() =>this.naviguer(), 3000);
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