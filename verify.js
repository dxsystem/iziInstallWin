// Configuración de Izipay
const IZIPAY_CONFIG = {
    API_ENDPOINT: 'https://api.micuentaweb.pe',
    JS_CLIENT_URL: 'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js',
    MERCHANT_ID: '13683161',
    PUBLIC_KEY: '13683161:publickey_wNJlJQEDwS9jzKkBPqmb99vHax098K3amLeoAok44c41N',
    HMAC_SHA256_KEY: 'mSvrekNady1seTjiEY0oU6odyeQVDRZs9wqeZsqVhLYfK'
};

// Función para verificar el pago
async function verifyPayment(params) {
    try {
        // Verificar la firma HMAC-SHA256
        if (!verifySignature(params)) {
            return {
                success: false,
                message: 'Firma inválida'
            };
        }

        // Decodificar la respuesta
        const answer = JSON.parse(atob(params.kr_answer));
        
        // Verificar el estado de la transacción
        if (answer.orderStatus === 'PAID') {
            return {
                success: true,
                transactionId: answer.transactions[0]?.transactionId || '',
                amount: answer.orderDetails?.orderTotalAmount,
                currency: answer.orderDetails?.orderCurrency
            };
        } else {
            return {
                success: false,
                message: 'El pago no fue completado'
            };
        }
    } catch (error) {
        console.error('Error al verificar el pago:', error);
        return {
            success: false,
            message: 'Error al procesar la verificación del pago'
        };
    }
}

// Función para verificar la firma HMAC-SHA256
function verifySignature(params) {
    try {
        const { kr_hash, kr_hash_algorithm, kr_answer } = params;
        
        if (!kr_hash || !kr_hash_algorithm || !kr_answer || kr_hash_algorithm !== 'sha256_hmac') {
            return false;
        }

        // Calcular el hash
        const message = kr_answer;
        const key = IZIPAY_CONFIG.HMAC_SHA256_KEY;
        const computedHash = CryptoJS.HmacSHA256(message, key).toString();

        // Comparar los hashes
        return computedHash === kr_hash;
    } catch (error) {
        console.error('Error al verificar la firma:', error);
        return false;
    }
}

// Exportar las funciones
window.verifyPayment = verifyPayment; 