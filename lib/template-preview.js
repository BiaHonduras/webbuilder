const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => entities[char])
}

function color(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(value ?? '') ? value : fallback
}

export function renderTemplate(template, variables = template.variables, colors = template.colors) {
  if (template.format !== 'catalog') {
    const replacements = Object.fromEntries(Object.entries(variables).map(([key, value]) => [
      key.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase(), escapeHtml(value),
    ]))
    return template.html.replace(/\b[A-Z][A-Z0-9_]+\b/g, token => replacements[token] ?? token)
      .replace(/var\(--(primary|secondary|bg)\)/gi, (_, key) => color(colors[key.toLowerCase()], '#ffffff'))
  }

  const text = key => escapeHtml(variables[key])
  const number = String(variables.whatsapp ?? '').replace(/\D/g, '')
  const contact = number.length === 8 ? '504' + number : number
  const validContact = /^[1-9]\d{9,14}$/.test(contact)
  const layout = /^[a-z]+$/.test(template.layout ?? '') ? template.layout : ''
  const photo = template.image ? '<figure class="hero-photo"><img src="' + escapeHtml(template.image) + '" alt=""></figure>' : ''
  const cards = [1, 2, 3].map(index => {
    const itemLink = validContact && template.category === 'tienda'
      ? '<a href="https://wa.me/' + contact + '?text=' + escapeHtml(encodeURIComponent('Hola, me interesa ' + variables['item' + index])) + '" target="_blank" rel="noopener">Consultar producto</a>' : ''
    return '<article><h3>' + text('item' + index) + '</h3>' + (variables['detail' + index] ? '<p>' + text('detail' + index) + '</p>' : '') + itemLink + '</article>'
  }).join('')
  const action = validContact
    ? '<a class="button" href="https://wa.me/' + contact + '" target="_blank" rel="noopener">' + text('action') + '</a>'
    : '<a class="button" href="#detalle">Ver detalles</a>'
  return `
<style>
  *{box-sizing:border-box}body{margin:0}a{color:inherit}
  .site{padding:0 clamp(1rem,6vw,5rem);min-height:100vh;background:var(--bg);color:var(--ink);font:1rem/1.5 system-ui,sans-serif}
  .site header,.site footer{padding:1.5rem 0;border-bottom:1px solid currentColor;display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}
  .hero{padding:clamp(3rem,10vw,8rem) 0}.hero h1{font-size:clamp(2.6rem,8vw,6rem);line-height:1;letter-spacing:-.055em;margin:0;max-width:14ch}
  .hero p{max-width:40ch}.button{display:inline-block;padding:.75rem 1rem;border-radius:2rem;background:var(--accent);color:#201c24;text-decoration:none;font-weight:700}
  .details{padding:2rem 0 4rem}.details h2{font-size:2rem}
  .items{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,14rem),1fr));gap:1rem}
  article{border:1px solid currentColor;border-radius:1rem;padding:1.2rem}
  .restaurante h1,.blog h1,.portfolio h1{font-family:Georgia,serif;font-weight:400}
  .restaurante .hero,.lanzamiento .hero{text-align:center}.restaurante .hero h1,.lanzamiento .hero h1,.restaurante .hero p,.lanzamiento .hero p{margin-inline:auto}
  .blog .items{display:block}.blog article{border:0;border-top:1px solid currentColor;border-radius:0;padding-inline:0}
  .portfolio article{min-height:10rem;background:var(--accent);color:#201c24}
  .tienda article p{font-weight:700}
  .hero-photo{margin:0;min-width:0;background:var(--accent);overflow:hidden}.hero-photo img{display:block;width:100%;height:100%;object-fit:cover}
  .split .hero,.rail .hero,.offset .hero{display:grid;grid-template-columns:1fr 1fr;gap:clamp(1rem,5vw,5rem);align-items:center;text-align:left}
  .split .hero h1,.split .hero p,.offset .hero h1,.offset .hero p{margin-inline:0}
  .split .hero-photo{height:clamp(15rem,39vw,30rem);border-radius:9rem 9rem 1rem 1rem}
  .rail .hero-photo{grid-column:1;grid-row:1;height:24rem}.rail .hero-copy{grid-column:2;grid-row:1}.rail .items{display:block}.rail article{border-radius:0;border-width:0 0 1px;padding-inline:0}
  .offset .hero-photo{height:26rem;border-radius:2rem;box-shadow:.8rem .8rem var(--accent)}
  .cover .hero{position:relative;isolation:isolate;display:grid;place-items:center;text-align:center;min-height:30rem;margin:1.5rem 0;padding-inline:1rem;color:white}
  .cover .hero h1,.cover .hero p{margin-inline:auto}.cover .hero-photo{position:absolute;inset:0;z-index:-2}.cover .hero::before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.62);z-index:-1}
  .editorial .hero{padding-top:3rem}.editorial .hero h1{font-family:Georgia,serif;font-weight:400;max-width:none}.editorial .hero-photo,.gallery .hero-photo,.grid .hero-photo,.mono .hero-photo{height:clamp(12rem,35vw,25rem);margin-top:2rem}
  .editorial article,.mono article{border:0;border-top:1px solid currentColor;border-radius:0}
  .poster .hero{background:var(--accent);color:#242033;margin:1.5rem 0;padding:clamp(1.5rem,6vw,5rem)}.poster .hero h1{font-weight:950;text-transform:uppercase}.poster .hero-photo{height:15rem;margin-top:2rem;mix-blend-mode:multiply}.poster .button{background:#29243b;color:white}
  .grid .hero-copy{text-align:center}.grid .hero h1,.grid .hero p{margin-inline:auto}.grid article{border:0;background:var(--accent);color:#23202a}
  .gallery .hero{text-align:center}.gallery .hero h1,.gallery .hero p{margin-inline:auto}.gallery article{background:var(--accent);color:#23202a;min-height:9rem}
  .mosaic .hero{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;gap:.75rem}.mosaic .hero-copy{padding:2rem;background:var(--accent);color:#242033}.mosaic article:nth-child(2){background:var(--accent);color:#242033}
  .mono .hero h1{font-family:monospace}.mono .hero-photo img{filter:grayscale(100%)}.mono .items{display:block}
  @media(max-width:680px){.split .hero,.offset .hero,.rail .hero,.mosaic .hero{grid-template-columns:1fr}.rail .hero-copy,.rail .hero-photo{grid-column:auto;grid-row:auto}.rail .hero-photo,.offset .hero-photo,.mosaic .hero-photo{height:16rem}}
</style>
<div class="site ${template.category} ${layout}" style="--ink:${color(colors.primary,'#222222')};--accent:${color(colors.secondary,'#eeeeee')};--bg:${color(colors.bg,'#ffffff')}">
  <header><strong>${text('title')}</strong><a href="#detalle">${text('section')}</a></header>
  <main>
    <section class="hero"><div class="hero-copy"><h1>${text('heading')}</h1><p>${text('description')}</p>${action}</div>${photo}</section>
    <section class="details" id="detalle"><h2>${text('section')}</h2><div class="items">${cards}</div></section>
  </main>
  <footer><strong>${text('title')}</strong><span>${[variables.address, variables.hours].filter(Boolean).map(escapeHtml).join(' · ')}</span></footer>
</div>`
}

export function pageHtml(title, content) {
  return '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + escapeHtml(title) + '</title></head><body>' + content + '</body></html>'
}

export function quoteUrl(template) {
  const message = template
    ? 'Hola, me interesa cotizar una página web con la plantilla ' + template.name + '.'
    : 'Hola, me interesa cotizar una página web con WebNexo.'
  return 'https://wa.me/50494596869?text=' + encodeURIComponent(message)
}
