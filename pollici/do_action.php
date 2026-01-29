<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['value']) || !isset($data['type'])) {
    echo json_encode(['result' => 'Dati mancanti']);
    exit;
}

$wsdl = "http://localhost/conversion_soap/conversion.wsdl";

try {
    $client = new SoapClient($wsdl, [
        'trace' => true,
        'cache_wsdl' => WSDL_CACHE_NONE
    ]);

    $params = [
        'value' => $data['value'],
        'conversionType' => $data['type']
    ];

    $response = $client->__soapCall("convert", [$params]);

    echo json_encode(['result' => $response->result]);

} catch (Exception $e) {
    echo json_encode(['result' => 'Errore: ' . $e->getMessage()]);
}
