<?php
// do_action.php

// Imposta l'header come JSON
header('Content-Type: application/json');

// Ottieni i dati JSON inviati
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['value']) || !isset($input['type'])) {
    echo json_encode(['result' => 'Dati mancanti']);
    exit;
}

$value = $input['value'];
$type = $input['type'];

// Percorso del WSDL
$wsdl_url = "http://https://lozizz.github.io/Tps/pollici/conversion.wsdl";

// Creare il client SOAP
try {
    $client = new SoapClient($wsdl_url);
    $params = [
        'value' => $value,
        'conversionType' => $type
    ];
    $response = $client->convert($params);
    echo json_encode(['result' => $response->result]);
} catch (Exception $e) {
    echo json_encode(['result' => 'Errore: ' . $e->getMessage()]);
}
?>
