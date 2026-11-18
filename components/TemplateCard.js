import { pageHtml, renderTemplate } from '../lib/template-preview'

const money = new Intl.NumberFormat('es-HN', { maximumFractionDigits: 0 })

export default function TemplateCard({ template, category, onUse, onPreview }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="relative h-48 overflow-hidden bg-stone-100" aria-hidden="true">
        <iframe
          title={'Miniatura de ' + template.name}
          tabIndex={-1}
          sandbox=""
          loading="lazy"
          srcDoc={pageHtml(template.name, renderTemplate(template))}
          className="pointer-events-none absolute left-0 top-0 h-[600px] w-[200%] origin-top-left scale-50 border-0"
        />
      </div>
      <div className="p-5">
        <p className="text-sm text-stone-600">{category}</p>
        <h3 className="mt-1 text-2xl font-bold">{template.name}</h3>
        <p className="mt-2 text-sm text-stone-700">{template.description}</p>
        {template.price && <p className="mt-4 font-bold">L {money.format(template.price)} <span className="text-sm font-normal text-stone-600">con publicaci�n inicial</span></p>}
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={() => onPreview(template)} className="rounded-full border border-stone-300 px-4 py-2 font-semibold">Ver demo</button>
          <button onClick={() => onUse(template)} className="rounded-full bg-emerald-900 px-4 py-2 font-semibold text-white">Personalizar</button>
        </div>
      </div>
    </article>
  )
}
