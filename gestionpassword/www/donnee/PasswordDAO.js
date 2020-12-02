class PasswordDAO{
    constructor(){
        this.listePassword = [
            {id:0, website:"Netflix", user:"bob@gmail.com", password:"1hfdjf1h8741fhjkhdf1fh", description:"mon compte Netflix"},
            {id:1, website:"Gmail", user:"bob@gmail.com", password:"duif108f97hdsuifhsidug", description:"mon compte Google"},
            {id:2, website:"Omnivox", user:"184854322", password:"gohaigh719g8dfh19g1ef1", description:"mon compte Omnivox"}
        ]
    }

    lister(){
        for(let position in this.listePassword){

            let password = new Password(
                this.listePassword[position].id,
                this.listePassword[position].website,
                this.listePassword[position].user,
                this.listePassword[position].password,
                this.listePassword[position].description                
            );

            this.listePassword[password.id] = password;
        }
        
        console.log("listePassword");
        console.log(this.listePassword);

        return this.listePassword;
    }

    ajouter(password){

        if(this.listePassword.length > 0)
            password.id = this.listePassword[this.listePassword.length-1].id + 1;
        else
            password.id = 0;

        this.listePassword[password.id] = password;
    }

    // modifier(password){
        //TODO
    // }
}