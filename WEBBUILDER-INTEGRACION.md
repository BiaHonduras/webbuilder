# Catálogo WebBuilder

Estos archivos corresponden a BiaHonduras/webbuilder, sobre el commit 140d896740b06118a8fb27a6036d5a47d32d3ccb. Copia las carpetas components, data, lib y pages del paquete sobre la raíz del repositorio y revisa el diff antes de integrar.

El catálogo añade seis diseños predeterminados y conserva Noir, Bloom y Prism. Los nuevos diseños están escritos para el editor existente y enlazan a los proyectos de código abierto como referencias visuales. Los ejemplos traen tres elementos editables por diseño. La personalización comercial de un menú o catálogo más grande, las fotos, el carrito y los artículos individuales requieren trabajo adicional.

Configura NEXT_PUBLIC_WEBBUILDER_WHATSAPP con el número de ventas en formato internacional (solo dígitos, por ejemplo el prefijo 504 seguido de los ocho dígitos). Así aparece Solicitar publicación en las fichas con precio. El WhatsApp del negocio final se configura en el editor, en el campo Whatsapp. Exportar HTML genera una página independiente que puedes subir a un alojamiento estático.

Ejecuta npm install y npm run build con la configuración de Supabase existente. En la portada, filtra por categoría, abre una demo, prueba los campos y colores en el editor y exporta el HTML antes de desplegar. El flujo de publicación inicia una conversación por WhatsApp. La publicación del sitio personalizado se completa subiendo el HTML exportado.
