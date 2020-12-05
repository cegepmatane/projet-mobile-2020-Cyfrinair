// If setImmediate is not implemented we include the polyfill
window.setImmediate || document.write("<script src=js/lib/setImmediate-polyfill.js><\/script>");
	
// If Typed Arrays are not supported we include the polyfill
// https://github.com/inexorabletash/polyfill
window.ArrayBuffer || document.write("<script src=js/lib/typedarray-polyfill.js><\/script>");

// If TextEncoder is not supported we include the polyfill
// https://github.com/inexorabletash/text-encoding
window.TextEncoder || document.write("<script src=js/lib/encoding-polyfill.js><\/script>");

// If Promise is not supported we include the polyfill
// https://github.com/taylorhakes/promise-polyfill
window.Promise || document.write("<script src=js/lib/promise-polyfill.js><\/script>");

// Alias window.crypto.subtle with window.crypto.webkitSubtle if
// the latter but not the former is supported
if (!window.crypto.subtle && window.crypto.webkitSubtle) {
	window.crypto.subtle = window.crypto.webkitSubtle;
}

// If Web Crypto API is not supported we include a JS crypto library
// https://code.google.com/p/crypto-js/
if (!window.crypto.subtle) {
	document.write("<script src=https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/hmac-sha256.js><\/script>");
	document.write("<script src=https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/pbkdf2.js><\/script>");
	document.write("<script src=https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/lib-typedarrays-min.js><\/script>");
}

// If MAX_SAFE_INTEGER (ES6) is not defined, define it
if (!Number.MAX_SAFE_INTEGER) {
	Number.MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
}

// If your borwser needs a lot of polyfills consider upgrading
// to a more modern feature rich browser, if you are a browser
// developer considering adding these much needed features already!
// :D

// Include the scrypt implementation
document.write("<script src=js/lib/pbkdf2.js><\/script>");
document.write("<script src=js/lib/scrypt.js><\/script>");

// Include the MPW class
document.write("<script src=js/lib/mpw.js><\/script>");

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
		let username = document.getElementById('fullname').value;
		let password = document.getElementById('masterpassword').value;

		this.manager.updateMPW(username, password);
	}

	afficher(){
		document.getElementsByTagName('body')[0].innerHTML = this.html;

		document.getElementById('login').addEventListener("click", () => { this.genererCleMaitre(); }, false);
		document.getElementById('testClient1').addEventListener("click", () => { this.manager.getPassword(this.listeClient[0]); }, false);
		document.getElementById('testClient2').addEventListener("click", () => { this.manager.getPassword(this.listeClient[1]); }, false);
	}
}