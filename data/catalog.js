export const categories = [
  { id: 'restaurante', name: 'Restaurantes' },
  { id: 'tienda', name: 'Cat�logos' },
  { id: 'servicios', name: 'Servicios' },
  { id: 'portfolio', name: 'Portafolios' },
  { id: 'lanzamiento', name: 'Lanzamientos' },
  { id: 'blog', name: 'Blogs' },
]

const presets = [
  ['mesa-cacao', 'Mesa Cacao', 'restaurante', 3490, 'Men� digital, horarios y reservas por WhatsApp.', 'Ombra', 'https://github.com/xocothemes/ombra', ['#f9e9d3', '#d6a66e', '#2a1715'], 'Sabores que re�nen', 'Men� de temporada', ['Entradas', 'Platos fuertes', 'Postres'], 'Reservar mesa'],
  ['mercado-local', 'Mercado Local', 'tienda', 2990, 'Productos, precios y pedidos por WhatsApp.', 'Shop Homepage', 'https://startbootstrap.github.io/startbootstrap-shop-homepage/', ['#243a2c', '#88b491', '#eff7eb'], 'Hecho cerca de ti', 'Colecci�n destacada', ['Caf� de origen', 'Chocolate artesanal', 'Caja de regalo'], 'Consultar por WhatsApp'],
  ['estudio-norte', 'Estudio Norte', 'servicios', 2490, 'Servicios, horarios y contacto para cotizaciones.', 'AstroWind', 'https://github.com/onwidget/astrowind', ['#192646', '#9ac1ff', '#eef3ff'], 'Soluciones para tu negocio', 'C�mo te ayudamos', ['Consulta inicial', 'Plan personalizado', 'Seguimiento'], 'Pedir cotizaci�n'],
  ['luz-estudio', 'Luz Estudio', 'portfolio', 3490, 'Portafolio de proyectos y contacto profesional.', 'Agency', 'https://startbootstrap.github.io/startbootstrap-agency/', ['#392831', '#e7a9bc', '#fff0f4'], 'Historias en im�genes', 'Trabajo seleccionado', ['Retratos', 'Marcas', 'Eventos'], 'Consultar disponibilidad'],
  ['pulso-digital', 'Pulso Digital', 'lanzamiento', 2490, 'Una p�gina para presentar un producto o curso.', 'Rainblur', 'https://tailwindtoolbox.github.io/Rainblur-Landing-Page/', ['#f4ecff', '#c6a8ff', '#24183e'], 'Tu idea, en marcha', 'Lo que encontrar�s', ['Aprende a tu ritmo', 'Material pr�ctico', 'Acompa�amiento'], 'Pedir informaci�n'],
  ['cuaderno-abierto', 'Cuaderno Abierto', 'blog', 3990, 'Presentaci�n editorial para art�culos y gu�as.', 'AstroPaper', 'https://astro-paper.pages.dev/', ['#302a20', '#ceab65', '#fbf4e5'], 'Notas para compartir', 'Publicaciones recientes', ['Primeros pasos', 'Ideas para tu negocio', 'Recursos favoritos'], 'Contactar al autor'],
]

const sampleDetails = {
  restaurante: ['Opciones para compartir', 'Especialidades de la casa', 'Algo dulce para terminar'],
  tienda: ['L 180', 'L 120', 'L 350'],
  servicios: ['Cu�ntanos qu� necesitas', 'Recibe una propuesta a tu medida', 'Revisamos los resultados contigo'],
  portfolio: ['Sesiones personales', 'Fotograf�a de producto', 'Cobertura de momentos especiales'],
  lanzamiento: ['Lecciones breves', 'Ejercicios descargables', 'Resuelve tus dudas'],
  blog: ['Una gu�a para comenzar', 'Experiencias y aprendizajes', 'Herramientas que vale la pena guardar'],
}

export const catalog = presets.map(([id, name, category, price, description, source, sourceUrl, palette, heading, section, items, action]) => ({
  id, slug: id, name, category, price, description, source, sourceUrl,
  colors: { primary: palette[0], secondary: palette[1], bg: palette[2] },
  variables: {
    title: name, heading, description, section,
    item1: items[0], item2: items[1], item3: items[2],
    detail1: sampleDetails[category][0], detail2: sampleDetails[category][1], detail3: sampleDetails[category][2],
    action, whatsapp: '', address: 'Honduras', hours: 'Lunes a s�bado',
  },
  format: 'catalog',
}))
