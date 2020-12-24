<?php
class InfoClientDAO
{
    public static function listerInfosClient()
    {
        include "connexion.php";

        $SQL_LISTE_INFOS_CLIENT = "SELECT * FROM infos_client;";
		$requeteListeInfosClient = $basededonnees->prepare($SQL_LISTE_INFOS_CLIENT);
		$resultat = $requeteListeInfosClient->execute();
		$listeInfosClient = $requeteListeInfosClient->fetchAll(PDO::FETCH_OBJ);
		
		return $listeInfosClient;
    }
}
?>