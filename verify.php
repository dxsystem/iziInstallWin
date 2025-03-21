<?php
header('Content-Type: application/json');

// Configuración
$hmacKey = "mSvrekNady1seTjiEY0oU6odyeQVDRZs9wqeZsqVhLYfK";

// Obtener datos de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que tenemos todos los datos necesarios
if (!isset($data['kr_hash']) || !isset($data['kr_answer'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Datos incompletos'
    ]);
    exit;
}

// Decodificar la respuesta
$answer = json_decode(base64_decode($data['kr_answer']), true);

// Verificar la firma
$hash = hash_hmac('sha256', $data['kr_answer'], $hmacKey);

if ($hash !== $data['kr_hash']) {
    echo json_encode([
        'success' => false,
        'message' => 'Firma inválida'
    ]);
    exit;
}

// Verificar el estado de la transacción
if ($answer['orderStatus'] === 'PAID') {
    echo json_encode([
        'success' => true,
        'message' => 'Pago procesado correctamente'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'El pago no fue completado'
    ]);
}
?> 