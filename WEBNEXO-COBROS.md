# Activar compras en WebNexo

## Configurar el proyecto

1. Usa un proyecto Supabase reservado para WebNexo. Aplica la migración de `supabase/migrations` y verifica que el bucket `webnexo-private-templates` sea privado. Confirma que otras políticas de Storage no otorguen acceso general a ese bucket.
2. En Cloudflare Pages configura `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` con la URL y la clave pública del proyecto. En Supabase Auth habilita el acceso por correo y autoriza los enlaces de retorno a `https://webnexo-awy.pages.dev/comprar/`, incluida la variante con el parámetro de plantilla. Configura un remitente para enviar los enlaces a compradores.
3. En Storage, carga el ZIP de cada producto con el nombre `identificador.zip` en la raíz del bucket. Por ejemplo, `brasa-urbana.zip`. Los ZIP de venta no deben guardarse en la carpeta pública ni en un repositorio público.
4. En `webnexo_products`, registra el identificador, nombre, importe en lempiras y medios de pago. Para transferencia, registra las instrucciones bancarias; para tarjeta, ingresa el enlace HTTPS del comercio (por ejemplo un enlace Compra Click con el importe del producto). Activa el producto cuando su archivo y sus medios de pago estén listos.

## Aprobar pagos

Después de recibir una referencia, localiza la orden pendiente en `webnexo_orders`. Comprueba en el banco o proveedor que el pago fue recibido por el monto y moneda acordados y corresponde a esa orden. Registra el identificador bancario o del proveedor en `verified_payment_id` y cambia `status` a `paid`. El identificador verificado debe ser único para impedir reutilizar un pago. Para un pago inválido, marca `rejected`. El cliente puede recargar su cuenta para ver el estado y descargar.

La pasarela procesa los datos de tarjeta. La referencia del cliente y su regreso al portal no aprueban una compra. Esta versión requiere revisión manual tanto para tarjeta como para transferencias.

## Verificación antes de publicar

- Usuario sin sesión: el archivo privado no se puede descargar.
- Usuario con orden pendiente: el archivo sigue bloqueado.
- Usuario con orden pagada: puede descargar su ZIP.
- Otra cuenta: no puede consultar la orden ni descargar el ZIP sin su propio pago aprobado.

El repositorio público y los despliegues históricos pueden conservar versiones de las plantillas ya distribuidas. Guarda las entregas comerciales nuevas en el bucket privado y revisa los despliegues históricos de Pages y Workers si necesitas cerrar las rutas anteriores.
