export const categories = [
  {
    "id": "restaurante",
    "name": "Gastronomía"
  },
  {
    "id": "tienda",
    "name": "Tiendas"
  },
  {
    "id": "servicios",
    "name": "Servicios"
  },
  {
    "id": "portfolio",
    "name": "Portafolios"
  },
  {
    "id": "lanzamiento",
    "name": "Tecnología"
  },
  {
    "id": "blog",
    "name": "Blogs y revistas"
  },
  {
    "id": "bienestar",
    "name": "Belleza y bienestar"
  },
  {
    "id": "turismo",
    "name": "Turismo"
  },
  {
    "id": "eventos",
    "name": "Eventos"
  },
  {
    "id": "educacion",
    "name": "Educación"
  }
]

const presets = [
  ['mesa-cacao', 'Mesa Cacao', 'restaurante', 'Menú digital, horarios y reservas por WhatsApp.', 'Ombra', 'https://github.com/xocothemes/ombra', ['#f9e9d3', '#d6a66e', '#2a1715'], 'Sabores que reúnen', 'Menú de temporada', ['Entradas', 'Platos fuertes', 'Postres'], 'Reservar mesa'],
  ['mercado-local', 'Mercado Local', 'tienda', 'Productos, precios y pedidos por WhatsApp.', 'Shop Homepage', 'https://startbootstrap.github.io/startbootstrap-shop-homepage/', ['#243a2c', '#88b491', '#eff7eb'], 'Hecho cerca de ti', 'Colección destacada', ['Café de origen', 'Chocolate artesanal', 'Caja de regalo'], 'Consultar por WhatsApp'],
  ['estudio-norte', 'Estudio Norte', 'servicios', 'Servicios, horarios y contacto para cotizaciones.', 'AstroWind', 'https://github.com/onwidget/astrowind', ['#192646', '#9ac1ff', '#eef3ff'], 'Soluciones para tu negocio', 'Cómo te ayudamos', ['Consulta inicial', 'Plan personalizado', 'Seguimiento'], 'Pedir cotización'],
  ['luz-estudio', 'Luz Estudio', 'portfolio', 'Portafolio de proyectos y contacto profesional.', 'Agency', 'https://startbootstrap.github.io/startbootstrap-agency/', ['#392831', '#e7a9bc', '#fff0f4'], 'Historias en imágenes', 'Trabajo seleccionado', ['Retratos', 'Marcas', 'Eventos'], 'Consultar disponibilidad'],
  ['pulso-digital', 'Pulso Digital', 'lanzamiento', 'Una página para presentar un producto o curso.', 'Rainblur', 'https://tailwindtoolbox.github.io/Rainblur-Landing-Page/', ['#f4ecff', '#c6a8ff', '#24183e'], 'Tu idea, en marcha', 'Lo que encontrarás', ['Aprende a tu ritmo', 'Material práctico', 'Acompañamiento'], 'Pedir información'],
  ['cuaderno-abierto', 'Cuaderno Abierto', 'blog', 'Presentación editorial para artículos y guías.', 'AstroPaper', 'https://astro-paper.pages.dev/', ['#302a20', '#ceab65', '#fbf4e5'], 'Notas para compartir', 'Publicaciones recientes', ['Primeros pasos', 'Ideas para tu negocio', 'Recursos favoritos'], 'Contactar al autor'],
]

const sampleDetails = {
  restaurante: ['Opciones para compartir', 'Especialidades de la casa', 'Algo dulce para terminar'],
  tienda: ['Ver presentación', 'Disponible por pedido', 'Consulta disponibilidad'],
  servicios: ['Cuéntanos qué necesitas', 'Recibe una propuesta a tu medida', 'Revisamos los resultados contigo'],
  portfolio: ['Sesiones personales', 'Fotografía de producto', 'Cobertura de momentos especiales'],
  lanzamiento: ['Lecciones breves', 'Ejercicios descargables', 'Resuelve tus dudas'],
  blog: ['Una guía para comenzar', 'Experiencias y aprendizajes', 'Herramientas que vale la pena guardar'],
}


const existingCatalog = presets.map(([id, name, category, description, source, sourceUrl, palette, heading, section, items, action]) => ({
  id, slug: id, name, category, description, source, sourceUrl,
  colors: { primary: palette[0], secondary: palette[1], bg: palette[2] },
  variables: {
    title: name, heading, description, section,
    item1: items[0], item2: items[1], item3: items[2],
    detail1: sampleDetails[category][0], detail2: sampleDetails[category][1], detail3: sampleDetails[category][2],
    action, whatsapp: '', address: 'Honduras', hours: 'Lunes a sábado',
  },
  format: 'catalog',
}))

const designs = [
  ["Brasa Urbana","restaurante","split","Cocina al fuego, sin prisa","Cortes, vegetales a las brasas y coctelería de temporada.","Menú de la casa","Entradas|Platos al fuego|Cocteles","faf1e6 30231d eaa66c","1551218808-94e220e084d2"],
  ["Café Origen","restaurante","editorial","Un buen día empieza aquí","Café de especialidad, pan recién horneado y un lugar para quedarte.","Nuestra carta","Café filtrado|Panadería|Brunch","f4e9d5 33291f d6a579","1501339847302-ac426a4a7cbb"],
  ["Jardín Vegano","restaurante","cover","Comer verde nunca fue tan rico","Cocina vegetal con ingredientes de temporada.","De la huerta a tu mesa","Bowls|Bebidas naturales|Postres","eff4e6 173527 cee389","1512621776951-a57141f2eefd"],
  ["Casa Lino","tienda","gallery","Texturas para vivir despacio","Textiles, cerámica y objetos para vestir tu hogar.","Colecciones","Mesa|Dormitorio|Objetos","f7f0ea 4b342b e7ac92","1600210492486-724fe5c67fb0"],
  ["Verde Mercado","tienda","grid","Pequeños cambios, grandes hábitos","Productos reutilizables y cuidado cotidiano.","Explora el catálogo","Hogar|Cuidado personal|Regalos","e8f1e8 122e29 afdcae",""],
  ["Forma Taller","tienda","poster","Objetos hechos para durar","Piezas artesanales producidas en pequeños lotes.","Piezas del taller","Cerámica|Madera|Edición limitada","f8e8db 28222b f6a57e",""],
  ["Atlas Consultores","servicios","rail","Decisiones claras para crecer","Consultoría estratégica para equipos y negocios en expansión.","Áreas de consultoría","Estrategia|Operaciones|Análisis","edf1ff 18284b a9bcfe",""],
  ["Claro Legal","servicios","mono","Asesoría que puedes entender","Acompañamiento legal para personas y emprendimientos.","Cómo podemos ayudarte","Contratos|Gestiones|Consultas","faf6e9 293127 d5b869",""],
  ["Nodo Creativo","servicios","offset","Ideas que encuentran su forma","Diseño, comunicación y estrategia para marcas con personalidad.","El estudio","Identidad|Campañas|Contenido","f6eeff 24164c e4b5ff",""],
  ["Marco Norte","portfolio","cover","Historias que merecen una imagen","Fotografía de retrato, viajes y proyectos editoriales.","Colecciones de fotografía","Retrato|Paisaje|Editorial","1d252c f5f2e9 fcc66b",""],
  ["Trazo Estudio","portfolio","mosaic","Espacios para la vida real","Portafolio de arquitectura e interiores.","Obras seleccionadas","Residencial|Interiores|Conceptos","f0eee8 252c2a bfd2b7","1486406146926-c627a92ad1ab"],
  ["Prisma Visual","portfolio","poster","Diseño con voz propia","Selección de proyectos de identidad, ilustración y animación.","Portafolio","Identidad visual|Ilustración|Motion","f8efff 341851 dc9fff",""],
  ["Órbita SaaS","lanzamiento","grid","Más claridad para tu equipo","Presentación de una plataforma para organizar proyectos.","Descubre la plataforma","Tableros|Reportes|Colaboración","ecedff 231856 b1a7fc",""],
  ["Bit Sprint","lanzamiento","split","Pon tu trabajo en marcha","Landing para una app de productividad independiente.","Funcionalidades","Tareas|Calendario|Integraciones","18212e eaf5ff 82e9e3",""],
  ["Voltio Labs","lanzamiento","offset","Un reto bien resuelto","Página de lanzamiento de un estudio de prototipos y software.","Qué construimos","Prototipos|Producto|Automatización","fff3ce 302914 f0ce60",""],
  ["Notas del Sur","blog","editorial","Historias desde el camino","Revista de viajes, cultura y vida cotidiana.","Últimas historias","Crónicas|Guías|Entrevistas","fff5e9 302323 f4b394",""],
  ["Punto y Coma","blog","mono","Leer cambia el ritmo","Blog para reseñas, recomendaciones y conversaciones sobre libros.","Lecturas recientes","Reseñas|Ensayos|Recomendados","eff0f4 252638 cdcbd8",""],
  ["La Buena Mesa","blog","mosaic","Recetas que se quedan","Diario gastronómico con recetas para cocinar y compartir.","Del recetario","Desayunos|Comidas|Dulces","fff0e5 3a2324 f8bca6","1490645935967-10de6ba17061"],
  ["Calma Studio","bienestar","cover","Regálate un momento de calma","Un espacio de masajes y rutinas de cuidado personal.","Experiencias","Masajes|Rituales|Cuidado facial","f5e8e2 3b3031 e8b4a8",""],
  ["Botánica Spa","bienestar","rail","Vuelve a lo esencial","Tratamientos inspirados en ingredientes botánicos.","Cuidado personal","Facial|Corporal|Bienestar","eff5e8 253c34 bcd49f",""],
  ["Aura Salón","bienestar","gallery","Un estilo hecho para ti","Salón de belleza con servicios de corte, color y peinado.","Servicios del salón","Corte|Color|Peinado","ffeaf0 4e2937 f4a9c6",""],
  ["Ruta Montaña","turismo","split","La aventura empieza arriba","Excursiones guiadas y rutas de naturaleza.","Explora las rutas","Senderismo|Miradores|Fin de semana","e8eee3 203629 c3df89",""],
  ["Costa Clara","turismo","mosaic","Vuelve al mar","Escapadas con hospedaje, paseos y actividades al aire libre.","Escapadas","Habitaciones|Paseos|Reservas","e8f2f2 174054 96ddeb","1500534623283-312aade485b7"],
  ["Posada Tierra","turismo","editorial","Un lugar donde respirar","Alojamiento rural, comida local y descanso lejos del ruido.","Planea tu visita","Habitaciones|Desayuno|Alrededores","f3e5d3 49352a d8ad7b",""],
  ["Día Dorado","eventos","gallery","Celebra lo que importa","Organización de bodas y celebraciones íntimas.","Celebraciones","Bodas|Aniversarios|Producción","f7efe5 48392d f5cf96",""],
  ["Festival Pulso","eventos","poster","Una ciudad que suena","Programa de música, talleres y experiencias en vivo.","Agenda del festival","Cartel|Talleres|Ubicación","f5e5ff 321545 e893ff","1506157786151-b8491531f063"],
  ["Encuentro Uno","eventos","rail","Conecta con nuevas ideas","Conferencia para negocios y comunidades creativas.","Programa","Charlas|Paneles|Inscripción","edf0ff 242955 aab6fd",""],
  ["Aula Abierta","educacion","offset","Aprende haciendo","Cursos cortos para desarrollar habilidades a tu ritmo.","Cursos disponibles","Diseño|Tecnología|Negocios","e9f6f5 173b41 95e2d9",""],
  ["Semilla Aprende","educacion","grid","Crecer también se aprende","Talleres creativos para niñas, niños y familias.","Actividades","Arte|Lectura|Ciencia","fff0e4 4e3324 f8b97b",""],
  ["Método Claro","educacion","mono","Un paso a la vez","Clases personalizadas y recursos de estudio para avanzar con confianza.","Cómo te acompañamos","Tutorías|Guías|Evaluaciones","f3f1ff 242448 c6bcff",""],
  ["Nexo Automatiza","lanzamiento","mono","Menos tareas, más tiempo","Sitio para servicios de automatización, integraciones y operaciones digitales.","Soluciones digitales","Flujos de trabajo|Integraciones|Reportes","eaf7ff 17334b 75e6ec",""],
  ["Código Base","lanzamiento","rail","Construye tu próximo producto","Página para un equipo de desarrollo web y aplicaciones a la medida.","Servicios de desarrollo","Aplicaciones web|APIs|Mantenimiento","172139 e9f6ff 9abfff",""],
  ["Escudo Digital","lanzamiento","cover","Protege lo que te conecta","Presentación para consultorías de seguridad digital empresarial.","Áreas de protección","Evaluaciones|Capacitación|Respuesta","1b2733 e7f5ff 9ce3c2",""],
  ["Taller Móvil","servicios","grid","Vuelve a conectar","Sitio para reparación de teléfonos, computadoras y dispositivos de oficina.","Servicios técnicos","Diagnóstico|Reparación|Soporte","e9f0f8 203b59 8eb9ed",""],
  ["Casa Serena","bienestar","split","Haz espacio para ti","Página para estudios de yoga y programas de movimiento consciente.","Clases y sesiones","Yoga|Movilidad|Meditación","f6efe7 473c30 edcfa0",""],
  ["Punto Fermento","restaurante","mosaic","Pan con tiempo y cuidado","Menú visual para panaderías artesanales y pedidos por encargo.","Horneamos para ti","Masa madre|Pastelería|Encargos","f8edde 4c3023 eaa775","1501339847302-ac426a4a7cbb"],
  ["Mercado Raíz","tienda","editorial","Lo local tiene historia","Catálogo para productores de alimentos y comercios de barrio.","Productos del mercado","Canastas|Conservas|Regalos","eef3de 30402d bbd08c","1512621776951-a57141f2eefd"],
  ["Óptica de Autor","portfolio","offset","Una mirada propia","Portafolio creativo para estudios de fotografía comercial y audiovisual.","Trabajos seleccionados","Producto|Retratos|Video","f1ecfa 392b5b c8a8ec",""],
  ["Bitácora Caribe","turismo","gallery","Descubre la costa a tu ritmo","Sitio para operadores de viajes, excursiones y experiencias costeras.","Explora el destino","Excursiones|Estadías|Guías","eef7fa 13424c a8e0e2","1500534623283-312aade485b7"],
  ["Foro Impulso","eventos","poster","Aquí se encuentran las ideas","Landing para foros de emprendimiento y encuentros profesionales.","Programa del encuentro","Conferencias|Talleres|Inscripción","ecedff 28274b b8afff",""],
  ["Campus Digital","educacion","rail","Aprende para crear","Página para academias de programación y cursos de habilidades digitales.","Programas de estudio","Programación|Diseño digital|Mentoría","e8f0ff 1d355a a1c6ff","1519389950473-47ba0277781c"],
]

const photography = {
  "restaurante": "1530026405186-ed1f139313f8",
  "tienda": "1441986300917-64674bd600d8",
  "servicios": "1497366811353-6870744d04b2",
  "portfolio": "1500530855697-b586d89ba3ee",
  "lanzamiento": "1519389950473-47ba0277781c",
  "blog": "1455390582262-044cdead277a",
  "bienestar": "1540555700478-4be289fbecef",
  "turismo": "1464822759023-fed622ff2c3b",
  "eventos": "1511795409834-ef04bbd61622",
  "educacion": "1503676260728-1c00da094a0b"
}

const gallery = designs.map(([name, category, layout, heading, description, section, items, palette, image]) => {
  const id = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(' ', '-')
  const [bg, primary, secondary] = palette.split(' ').map(value => '#' + value)
  const [item1, item2, item3] = items.split('|')
  const photoId = image || photography[category]
  const photoPath = '/gallery-images/' + photoId
  return {
    id, slug: id, name, category, layout, description,
    colors: { bg, primary, secondary },
    image: photoPath + '-1200.jpg',
    thumbnail: photoPath + '-560.jpg',
    variables: { title: name, heading, description, section, item1, item2, item3, detail1: '', detail2: '', detail3: '', action: 'Contáctanos', whatsapp: '', address: 'Honduras', hours: '' },
    format: 'catalog',
  }
})

export const catalog = [...gallery, ...existingCatalog]
