import { pageHtml, renderTemplate, quoteUrl } from '../lib/template-preview'

export default function TemplateCard({ template, category, onPreview }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <button type="button" onClick={() => onPreview(template)} aria-label={'Ver demo de ' + template.name} className="relative block aspect-[16/10] w-full overflow-hidden text-left" style={{ backgroundColor: template.colors.bg }}>
        {template.thumbnail ? <>
          <img src={template.thumbnail} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" />
          <div className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/25 to-transparent p-5 text-white ${['editorial','mono','rail'].includes(template.layout) ? 'items-start' : 'items-center text-center'}`}>
            <span className="text-xs font-medium">{template.name}</span>
            <span className={`mt-1 max-w-[20ch] text-2xl font-bold leading-tight ${['editorial','cover','gallery'].includes(template.layout) ? 'font-serif' : ''}`}>{template.variables.heading}</span>
          </div>
        </> : <iframe title={'Miniatura de ' + template.name} tabIndex={-1} sandbox="" loading="lazy" srcDoc={pageHtml(template.name, renderTemplate(template))} className="pointer-events-none absolute left-0 top-0 h-[600px] w-[200%] origin-top-left scale-50 border-0" />}
      </button>
      <div className="p-5">
        <p className="text-xs font-semibold text-violet-700">{category}</p>
        <h3 className="mt-1 text-lg font-bold text-slate-950">{template.name}</h3>
        <p className="mt-1 min-h-[2.5rem] text-sm text-slate-600">{template.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => onPreview(template)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">Ver demo</button>
          <a href={quoteUrl(template)} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800">Cotizar</a>
        </div>
      </div>
    </article>
  )
}
