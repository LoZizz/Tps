<?php
// conversion_server.php

function convert($params) {

    $value = $params->value;
    $type  = $params->conversionType;

    switch (strtolower($type)) {
        case 'celsius_to_fahrenheit':
            $result = ($value * 9 / 5) + 32;
            break;

        case 'fahrenheit_to_celsius':
            $result = ($value - 32) * 5 / 9;
            break;

        case 'meters_to_feet':
            $result = $value * 3.28084;
            break;

        case 'feet_to_meters':
            $result = $value / 3.28084;
            break;

        default:
            throw new SoapFault("Client", "Tipo di conversione sconosciuto");
    }

    return ['result' => $result];
}

$server = new SoapServer("conversion.wsdl");
$server->addFunction("convert");
$server->handle();
