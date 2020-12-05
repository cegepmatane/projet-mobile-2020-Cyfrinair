class Application{
	
	constructor(window, vueCrypto){
		this.window = window;
		
		this.vueCrypto = vueCrypto;
		
		document.addEventListener("deviceready", () => this.intialiserNavigation(), false);
	}

	intialiserNavigation(){
    		this.window.addEventListener("hashchange", () => this.naviguer());
    		setTimeout(() =>this.naviguer(), 3000);
    }
	
	naviguer(){
		let hash = window.location.hash;
		
		if (!hash){
			this.vueCrypto.afficher();
		}
	}
}

new Application(window, new VueCrypto());