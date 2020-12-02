<?php
	include "accesseur/InfoClientDAO.php";
	$infoClientDAO = new InfoClientDAO();
	$listeInfosClient = $infoClientDAO->listerInfosClient();
    //print_r($listeInfosClient);
    
    $fichierJSON = json_encode($listeInfosClient);
    echo $fichierJSON;
?>