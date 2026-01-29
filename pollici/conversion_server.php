<?php
// conversion_server.php

// Funzione di conversione
function convert($value, $type) {
    switch (strtolower($type)) {
        case 'celsius_to_fahrenheit':
            return ($value * 9/5) + 32;
        case 'fahrenheit_to_celsius':
            return ($value - 32) * 5/9;
        case 'meters_to_feet':
            return $value * 3.28084;
        case 'feet_to_meters':
            return $value / 3.28084;
        default:
            throw new Exception("Tipo di conversione sconosciuto");
    }
}

// Creare il server SOAP
$server = new SoapServer("conversion.wsdl");

$server->addFunction("convert");

try {
    $server->handle();
} catch (Exception $e) {
    echo "Errore: " . $e->getMessage();
}
?>
