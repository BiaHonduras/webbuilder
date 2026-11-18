export function checkoutUrl(templateId) {
  return '/comprar/?plantilla=' + encodeURIComponent(templateId)
}

export function quoteUrl(template) {
  const subject = template ? 'la plantilla ' + template.name : 'una página web con WebNexo'
  return 'https://wa.me/50494596869?text=' + encodeURIComponent('Hola, me interesa cotizar ' + subject + '.')
}
