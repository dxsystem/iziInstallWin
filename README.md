# Página de Respuesta de Izipay para InstallWin#

Esta es la página de respuesta para los pagos procesados a través de Izipay en InstallWin#.

## Configuración

1. Sube estos archivos a tu servidor web
2. Asegúrate de que PHP esté instalado y configurado
3. Verifica que el módulo mod_rewrite de Apache esté habilitado
4. Configura las claves de Izipay en `verify.php`

## Estructura de Archivos

- `index.html`: Página principal que muestra el estado del pago
- `verify.php`: Script que verifica la autenticidad del pago
- `.htaccess`: Configuración de Apache para seguridad y redirecciones
- `README.md`: Este archivo

## Seguridad

- Todas las solicitudes son forzadas a HTTPS
- Se verifica la firma HMAC-SHA256 de cada transacción
- Se implementan headers de seguridad básicos
- No se almacena información sensible

## Personalización

Puedes personalizar el diseño modificando el CSS en `index.html`. Los colores actuales están basados en la paleta de InstallWin#.

## Soporte

Para soporte, contacta a soporte@edudigital.pro 