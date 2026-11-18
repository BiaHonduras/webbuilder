export const templates = [

  // ══════════════════════════════════════════════════════
  // 1. NOIR — La más elegante, minimalismo premium
  // ══════════════════════════════════════════════════════
  {
    id: 'noir-elegante',
    name: 'Noir',
    slug: 'noir-elegante',
    description: 'Minimalismo oscuro. Para marcas que quieren transmitir exclusividad y sofisticación.',
    colors: { primary: '#ffffff', secondary: '#c9a84c', bg: '#0a0a0a' },
    variables: {
      brand: 'NOIR',
      tagline: 'Elegancia sin tiempo',
      heroTitle: 'Lo extraordinario\nempieza aquí',
      heroSub: 'Diseñamos experiencias que trascienden lo ordinario',
      ctaText: 'Descubrir más',
      featuresTitle: 'Nuestro compromiso',
      feature1Title: 'Calidad artesanal',
      feature1Desc: 'Cada detalle es pensado con precisión y dedicación meticulosa',
      feature2Title: 'Exclusividad',
      feature2Desc: 'Servicios diseñados para quienes buscan lo único e irrepetible',
      feature3Title: 'Personalización',
      feature3Desc: 'Adaptamos cada solución a tus necesidades específicas',
      contactTitle: 'Hablemos',
      contactEmail: 'hola@noir.com',
      address: 'Av. Presidente Masaryk 400, Ciudad de México',
    },
    html: `<div style="background:#0a0a0a;color:#fff;font-family:'Segoe UI',system-ui,sans-serif;min-height:100vh">
  <nav style="display:flex;justify-content:space-between;align-items:center;padding:2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.06)">
    <span style="font-size:1.1rem;letter-spacing:.3em;font-weight:300;text-transform:uppercase">BRAND</span>
    <div style="display:flex;gap:2.5rem;font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;opacity:.5">
      <span>Inicio</span><span>Servicios</span><span>Contacto</span>
    </div>
  </nav>
  <main style="padding:0 4rem">
    <section style="min-height:70vh;display:flex;flex-direction:column;justify-content:center;max-width:800px">
      <p style="color:#c9a84c;font-size:.75rem;letter-spacing:.4em;text-transform:uppercase;margin-bottom:2rem">EST. 2024</p>
      <h1 style="font-size:clamp(3rem,8vw,6rem);font-weight:200;line-height:1.05;letter-spacing:-.02em;margin-bottom:2rem">
        HERO_TITLE<br><span style="opacity:.3">en letras mayúsculas</span>
      </h1>
      <p style="font-size:1.1rem;opacity:.45;line-height:1.8;max-width:480px;margin-bottom:3rem">HERO_SUB</p>
      <div style="display:flex;gap:1.5rem;align-items:center">
        <a href="#" style="background:#c9a84c;color:#0a0a0a;padding:1rem 2.5rem;text-decoration:none;font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;font-weight:600">CTA_TEXT</a>
        <span style="opacity:.3;font-size:.8rem;letter-spacing:.1em">— Scroll</span>
      </div>
    </section>
    <section style="padding:8rem 0;border-top:1px solid rgba(255,255,255,0.06)">
      <p style="color:#c9a84c;font-size:.7rem;letter-spacing:.4em;text-transform:uppercase;margin-bottom:4rem">FEATURES_TITLE</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4rem">
        ${['feature1','feature2','feature3'].map(f => `
          <div>
            <div style="width:40px;height:1px;background:#c9a84c;margin-bottom:2rem"></div>
            <h3 style="font-size:.9rem;letter-spacing:.15em;text-transform:uppercase;margin-bottom:1rem;font-weight:400">${f.toUpperCase()}_TITLE</h3>
            <p style="opacity:.4;line-height:1.8;font-size:.9rem">${f.toUpperCase()}_DESC</p>
          </div>
        `).join('')}
      </div>
    </section>
    <footer style="padding:4rem 0;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;opacity:.4;font-size:.8rem">
      <span>© 2024 BRAND</span>
      <div style="text-align:right">
        <p>CONTACT_EMAIL</p>
        <p style="margin-top:.5rem">ADDRESS</p>
      </div>
    </footer>
  </main>
</div>`
  },

  // ══════════════════════════════════════════════════════
  // 2. BLOOM — Elegante pero cálida, orgánica
  // ══════════════════════════════════════════════════════
  {
    id: 'bloom-warm',
    name: 'Bloom',
    slug: 'bloom-elegante',
    description: 'Elegancia orgánica. Paleta cálida con formas suaves. Ideal para spas, boutiques y marcas lifestyle.',
    colors: { primary: '#b5651d', secondary: '#e8d5c4', bg: '#faf6f1' },
    variables: {
      brand: 'Bloom Studio',
      tagline: 'Bienestar & Estilo',
      heroTitle: 'Cuida lo que te hace brillar',
      heroSub: 'Productos naturales diseñados para realzar tu belleza interior y exterior',
      ctaText: 'Explorar productos',
      aboutTitle: 'Nuestra historia',
      aboutText: 'Nacimos de la idea de que la belleza verdadera viene de lo natural. Cada producto es formulado con ingredientes cuidadosamente seleccionados, respetando tanto tu piel como el medio ambiente.',
      servicesTitle: 'Qué ofrecemos',
      service1: 'Skincare Natural',
      service1Desc: 'Rutinas personalizadas con ingredientes orgánicos certificados',
      service2: 'Aromaterapia',
      service2Desc: 'Blend de esencias esenciales para balancear cuerpo y mente',
      service3: 'Consultoría',
      service3Desc: 'Asesoría personalizada para encontrar tu rutina ideal',
      address: 'Calle Jardines #45, Col. Del Valle',
      phone: '+52 555 234 5678',
    },
    html: `<div style="background:#faf6f1;font-family:'Segoe UI',system-ui,sans-serif;min-height:100vh;color:#3a2a1a">
  <nav style="display:flex;justify-content:space-between;align-items:center;padding:2rem 4rem">
    <span style="font-size:1.3rem;font-weight:300;letter-spacing:.1em">BRAND</span>
    <div style="display:flex;gap:2rem;font-size:.85rem;opacity:.6">
      <span>Inicio</span><span>Nosotros</span><span>Servicios</span>
    </div>
  </nav>
  <main style="padding:0 4rem">
    <section style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;min-height:70vh;padding:4rem 0">
      <div>
        <p style="color:#b5651d;font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;margin-bottom:1.5rem">TAGLINE</p>
        <h1 style="font-size:clamp(2.5rem,5vw,4rem);font-weight:300;line-height:1.15;margin-bottom:1.5rem">HERO_TITLE</h1>
        <p style="opacity:.55;line-height:1.9;margin-bottom:2.5rem;font-size:.95rem">HERO_SUB</p>
        <a href="#" style="background:#b5651d;color:#fff;padding:1rem 2.5rem;text-decoration:none;font-size:.8rem;letter-spacing:.15em;display:inline-block;border-radius:50px">CTA_TEXT</a>
      </div>
      <div style="background:#e8d5c4;border-radius:200px 200px 20px 20px;height:500px;display:flex;align-items:end;justify-content:center;padding-bottom:2rem;font-size:.8rem;opacity:.5">
        🌸 Tu imagen aquí
      </div>
    </section>
    <section style="padding:6rem 0;text-align:center">
      <h2 style="font-size:2rem;font-weight:300;margin-bottom:1rem">ABOUT_TITLE</h2>
      <p style="max-width:500px;margin:0 auto;opacity:.55;line-height:1.9;font-size:.95rem">ABOUT_TEXT</p>
    </section>
    <section style="padding:4rem 0;border-top:1px solid rgba(181,101,29,0.15)">
      <h3 style="text-align:center;font-weight:300;margin-bottom:4rem;font-size:1.2rem;letter-spacing:.1em;text-transform:uppercase">SERVICES_TITLE</h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3rem">
        ${['service1','service2','service3'].map(s => `
          <div style="text-align:center;padding:2rem">
            <div style="width:60px;height:60px;border-radius:50%;background:#e8d5c4;margin:0 auto 1.5rem;display:flex;align-items:center;justify-content:center;font-size:1.5rem">🌿</div>
            <h4 style="font-size:.9rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.8rem;font-weight:500">${s.toUpperCase()}_TITLE</h4>
            <p style="opacity:.5;font-size:.85rem;line-height:1.7">${s.toUpperCase()}_DESC</p>
          </div>
        `).join('')}
      </div>
    </section>
    <footer style="padding:4rem;text-align:center;border-top:1px solid rgba(181,101,29,0.15);font-size:.85rem;opacity:.5">
      <p>DIRECCION</p>
      <p style="margin-top:.5rem">TELEFONO</p>
    </footer>
  </main>
</div>`
  },

  // ══════════════════════════════════════════════════════
  // 3. PRISM — Creativo, colorido, vibrante
  // ══════════════════════════════════════════════════════
  {
    id: 'prism-creativo',
    name: 'Prism',
    slug: 'prism-creativo',
    description: 'Explosión de color. Diseño dinámico y energético para creativos, agencias y marcas jóvenes.',
    colors: { primary: '#6366f1', secondary: '#ec4899', bg: '#0f0f1a' },
    variables: {
      brand: 'PRISM',
      tagline: 'Creatividad sin límites',
      heroTitle: 'Creamos cosas increíbles',
      heroSub: 'Somos un estudio creativo especializado en diseño digital, branding y desarrollo web para marcas audaces.',
      ctaText: 'Ver nuestro trabajo',
      stats: ['150+', 'Proyectos', '45+', 'Clientes', '8+', 'Años'],
      workTitle: 'Trabajos recientes',
      work1: 'Rediseño marca Café Aurora',
      work2: 'App fintech NeoBank',
      work3: 'E-commerce Moda Urbana',
      work4: 'Identidad visual StartupX',
      contactTitle: '¿Tienes un proyecto?',
      contactText: 'Nos encantaría escucharte. Escríbenos y hagamos algo genial juntos.',
      email: 'hola@prism.studio',
    },
    html: `<div style="background:#0f0f1a;font-family:'Segoe UI',system-ui,sans-serif;min-height:100vh;color:#fff">
  <nav style="display:flex;justify-content:space-between;align-items:center;padding:2rem 4rem">
    <span style="font-size:1.5rem;font-weight:800;letter-spacing:-.05em">BRAND<span style="color:#ec4899">.</span></span>
    <div style="display:flex;gap:2rem;font-size:.85rem;opacity:.6">
      <span>Work</span><span>About</span><span>Contact</span>
    </div>
  </nav>
  <main style="padding:0 4rem">
    <section style="padding:6rem 0">
      <p style="color:#6366f1;font-size:.75rem;letter-spacing:.3em;text-transform:uppercase;margin-bottom:1.5rem">TAGLINE</p>
      <h1 style="font-size:clamp(3rem,7vw,5.5rem);font-weight:800;line-height:1;margin-bottom:1.5rem;letter-spacing:-.03em">
        HERO_TITLE<br>
        <span style="background:linear-gradient(90deg,#6366f1,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent">con estilo</span>
      </h1>
      <p style="opacity:.45;max-width:500px;line-height:1.8;margin-bottom:2.5rem;font-size:.95rem">HERO_SUB</p>
      <a href="#" style="background:linear-gradient(90deg,#6366f1,#ec4899);color:#fff;padding:1rem 2.5rem;text-decoration:none;font-size:.8rem;font-weight:600;letter-spacing:.1em;border-radius:50px;display:inline-block">CTA_TEXT</a>
    </section>
    <section style="padding:4rem 0;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06)">
      ${['150+', 'Proyectos', '45+', 'Clientes', '8+', 'Años', '∞', 'Ideas'].map((v,i) => `
        <div style="text-align:center;padding:2rem 0">
          <p style="font-size:2.5rem;font-weight:800;background:linear-gradient(135deg,#6366f1,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${v}</p>
          <p style="opacity:.4;font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;margin-top:.5rem">${['PROYECTOS','CLIENTES','AÑOS','IDEAS'][Math.floor(i/2)]}</p>
        </div>
      `).join('')}
    </section>
    <section style="padding:6rem 0">
      <h2 style="font-size:1.5rem;font-weight:600;margin-bottom:3rem;letter-spacing:.05em">WORK_TITLE</h2>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem">
        ${['work1','work2','work3','work4'].map((w, i) => `
          <div style="background:linear-gradient(${i%2===0?135:225}deg,rgba(99,102,241,.2),rgba(236,72,153,.2));border-radius:16px;padding:3rem;display:flex;align-items:center;justify-content:center;min-height:200
