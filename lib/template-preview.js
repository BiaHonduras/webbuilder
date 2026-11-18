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
  const cards = [1, 2, 3].map(index => {
    const itemLink = validContact && template.category === 'tienda'
      ? '<a href="https://wa.me/' + contact + '?text=' + escapeHtml(encodeURIComponent('Hola, me interesa ' + variables['item' + index])) + '" target="_blank" rel="noopener">Consultar producto</a>' : ''
    return '<article><h3>' + text('item' + index) + '</h3><p>' + text('detail' + index) + '</p>' + itemLink + '</article>'
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
</style>
<div class="site ${template.category}" style="--ink:${color(colors.primary,'#222222')};--accent:${color(colors.secondary,'#eeeeee')};--bg:${color(colors.bg,'#ffffff')}">
  <header><strong>${text('title')}</strong><a href="#detalle">${text('section')}</a></header>
  <main>
    <section class="hero"><h1>${text('heading')}</h1><p>${text('description')}</p>${action}</section>
    <section class="details" id="detalle"><h2>${text('section')}</h2><div class="items">${cards}</div></section>
  </main>
  <footer><strong>${text('title')}</strong><span>${text('address')} · ${text('hours')}</span></footer>
</div>`
}

export function pageHtml(title, content) {
  return '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + escapeHtml(title) + '</title></head><body>' + content + '</body></html>'
}
