# Description des échanges de données

## Détail des champs du Model *InfosCLient*

- id
- website
- user
- description
- template
- type

## Détail des fonctions du DAO

- __*lister*__ : retourne une liste de __*InfosCLient*__. 
[exemple de liste](https://github.com/cegepmatane/projet-mobile-2020-Cyfrinair/blob/master/Donn%C3%A9es/Description%20des%20%C3%A9changes%20de%20donn%C3%A9es/lister.json)
- __*listerParNom*__ : prend en parametre un nom, retourne un model __*InfosCLient*__.

- __*enregistrerInfosClient*__ : prend en parametre un model __*InfosCLient*__ pour l'enregistrer dans la base de donnée
