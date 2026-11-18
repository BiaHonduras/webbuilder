export const categories = [
  { id: 'restaurante', name: 'Restaurantes', icon: '🍽️' },
  { id: 'tienda', name: 'Tiendas', icon: '🛒' },
  { id: 'servicios', name: 'Servicios', icon: '⚙️' },
  { id: 'portfolio', name: 'Portafolios', icon: '💼' },
]

export const templates = [
  {
    id: 'rest-001',
    name: 'Restaurante Clásico',
    slug: 'restaurante-clasico',
    category: 'restaurante',
    description: 'Elegante para restaurantes y cafeterías',
    colors: { primary: '#c0392b', secondary: '#f39c12', bg: '#fffbeb' },
    variables: {
      title: 'Mi Restaurante',
      tagline: 'Sabores auténticos desde 1990',
      heroText: 'Una experiencia culinaria inolvidable',
      ctaText: 'Reservar Mesa',
      phone: '+52 555 123 4567',
      address: 'Av. Principal #123, Ciudad',
    },
    html: `<section class="min-h-screen bg-[var(--bg)] font-sans">
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-[var(--primary)]">RESTAURANTE_NAME</h1>
    <a href="#" class="bg-[var(--primary)] text-white px-6 py-2 rounded-full">CONTACTO</a>
  </header>
  <main class="text-center py-20 px-6">
    <h2 class="text-5xl font-bold text-gray-800 mb-4">HERO_TEXT</h2>
    <p class="text-xl text-gray-600 mb-8">TAGLINE</p>
    <a href="#" class="bg-[var(--secondary)] text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition">CTA_TEXT</a>
    <div class="mt-12 text-gray-500">
      <p>📍 ADDRESS</p>
      <p>📞 PHONE</p>
    </div>
  </main>
</section>`
  },
  {
    id: 'tienda-001',
    name: 'Tienda Online',
    slug: 'tienda-online',
    category: 'tienda',
    description: 'Perfecta para e-commerce y tiendas',
    colors: { primary: '#2563eb', secondary: '#16a34a', bg: '#f0f9ff' },
    variables: {
      title: 'Mi Tienda',
      tagline: 'Los mejores productos al mejor precio',
      heroText: 'Compra ahora y recibe en casa',
      ctaText: 'Ver Productos',
      phone: '+52 555 987 6543',
      address: 'Calle Comercio #456',
    },
    html: `<section class="min-h-screen bg-[var(--bg)] font-sans">
  <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold">TIENDA_NAME</h1>
    <nav class="hidden md:flex gap-6">
      <a href="#" class="hover:text-blue-200">Productos</a>
      <a href="#" class="hover:text-blue-200">Ofertas</a>
      <a href="#" class="hover:text-blue-200">Contacto</a>
    </nav>
    <button class="bg-white text-blue-600 px-4 py-2 rounded-full">Carrito (0)</button>
  </header>
  <main class="text-center py-20 px-6">
    <h2 class="text-5xl font-bold text-gray-800 mb-4">HERO_TEXT</h2>
    <p class="text-xl text-gray-600 mb-8">TAGLINE</p>
    <a href="#" class="bg-[var(--secondary)] text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition">CTA_TEXT</a>
    <div class="mt-12 grid grid-cols-3 gap-6 max-w-4xl mx-auto">
      ${[1,2,3].map(i => `<div class="bg-white rounded-xl shadow p-6"><div class="h-32 bg-gray-200 rounded-lg mb-4"></div><h3 class="font-semibold">Producto ${i}</h3><p class="text-blue-600 font-bold">$${i * 299}</p></div>`).join('')}
    </div>
  </main>
</section>`
  },
  {
    id: 'servicios-001',
    name: 'Servicios Profesionales',
    slug: 'servicios-profesionales',
    category: 'servicios',
    description: 'Para freelancers y profesionales',
    colors: { primary: '#7c3aed', secondary: '#0ea5e9', bg: '#faf5ff' },
    variables: {
      title: 'Tu Servicio',
      tagline: 'Soluciones profesionales a tu medida',
      heroText: 'Llevamos tu proyecto al siguiente nivel',
      ctaText: 'Solicitar Cotización',
      phone: '+52 555 111 2222',
      address: 'Oficina Central #789',
    },
    html: `<section class="min-h-screen bg-[var(--bg)] font-sans">
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-purple-600">SERVICIO_NAME</h1>
    <a href="#" class="bg-purple-600 text-white px-6 py-2 rounded-full">COTIZAR</a>
  </header>
  <main class="py-20 px-6 max-w-5xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-5xl font-bold text-gray-800 mb-4">HERO_TEXT</h2>
      <p class="text-xl text-gray-600">TAGLINE</p>
      <a href="#" class="inline-block mt-8 bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700 transition">CTA_TEXT</a>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      ${['Consultoría','Desarrollo','Soporte'].map(s => `
        <div class="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⭐</div>
          <h3 class="text-xl font-bold mb-2">${s}</h3>
          <p class="text-gray-600">Servicio profesional de alta calidad.</p>
        </div>
      `).join('')}
    </div>
    <div class="mt-16 text-center text-gray-500">
      <p>📍 ADDRESS</p>
      <p>📞 PHONE</p>
    </div>
  </main>
</section>`
  },
  {
    id: 'portfolio-001',
    name: 'Portafolio Creativo',
    slug: 'portafolio-creativo',
    category: 'portfolio',
    description: 'Ideal para diseñadores y creativos',
    colors: { primary: '#0f172a', secondary: '#f59e0b', bg: '#ffffff' },
    variables: {
      title: 'Mi Portafolio',
      tagline: 'Diseñador & Desarrollador',
      heroText: 'Creo experiencias digitales únicas',
      ctaText: 'Ver Proyectos',
      phone: '+52 555 333 4444',
      address: 'Remoto / Global',
    },
    html: `<section class="min-h-screen bg-white font-sans">
  <header class="p-6 flex justify-between items-center border-b">
    <h1 class="text-2xl font-black text-slate-900">PORTFOLIO_NAME</h1>
    <nav class="flex gap-8 text-slate-600">
      <a href="#" class="hover:text-slate-900">Trabajos</a>
      <a href="#" class="hover:text-slate-900">Sobre mí</a>
      <a href="#" class="hover:text-slate-900">Contacto</a>
    </nav>
  </header>
  <main class="max-w-6xl mx-auto px-6 py-20">
    <p class="text-amber-500 font-semibold mb-2">TAGLINE</p>
    <h2 class="text-6xl font-black text-slate-900 mb-8 leading-tight">HERO_TEXT</h2>
    <a href="#" class="inline-block bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-800 transition">CTA_TEXT</a>
    <div class="mt-16 grid md:grid-cols-2 gap-8">
      ${[1,2,3,4].map(i => `<div class="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xl">Proyecto ${i}</div>`).join('')}
    </div>
  </main>
</section>`
  },
]
