class $ES6 { constructor() { let b = true; this.b = b; } }
const [canES6] = ((...args) => args)(new $ES6().b);