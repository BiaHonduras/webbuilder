import { useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { categories, templates } from '../data/templates'
import TemplateCard from '../components/TemplateCard'
import { pageHtml, renderTemplate, quoteUrl } from '../lib/template-preview'

const categoryNames = Object.fromEntries(categories.map(({ id, name }) => [id, name]))
const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const downloads = [
  ['Editorial', 'https://html5up.net/editorial'],
  ['Phantom', 'https://html5up.net/phantom'],
  ['Massively', 'https://html5up.net/massively'],
  ['Solid State', 'https://html5up.net/solid-state'],
  ['Agency', 'https://startbootstrap.com/theme/agency'],
  ['Creative', 'https://startbootstrap.com/theme/creative'],
  ['Freelancer', 'https://startbootstrap.com/theme/freelancer'],
  ['Shop Homepage', 'https://startbootstrap.com/template/shop-homepage'],
]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  const filtered = templates.filter(template =>
    (activeCategory === 'all' || template.category === activeCategory) &&
    normalize([template.name, categoryNames[template.category], template.description].join(' ')).includes(normalize(query.trim()))
  )

  function handleUseTemplate(template) {
    sessionStorage.setItem('selectedTemplate', JSON.stringify(template))
    window.location.assign('/editor')
  }

  function handlePreview(template) {
    setSelected(template)
    dialog.current.showModal()
  }

  return (
    <>
      <Head>
        <title>WebNexo | Plantillas web para tu negocio</title>
        <meta name="description" content="Explora plantillas web para emprendimientos en Honduras, prueba una demo y cotiza por WhatsApp." />
      </Head>
      <main className="min-h-screen bg-[#f9f8fd] text-slate-950">
        <header className="border-b border-violet-100 bg-white">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
            <Link href="/" className="text-xl font-black tracking-tight text-violet-800">WebNexo</Link>
            <div className="flex items-center gap-4 text-sm font-semibold">
              <Link href="/dashboard" className="text-slate-700 hover:text-violet-800">Mis proyectos</Link>
              <a href={quoteUrl()} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-violet-700 px-4 py-2 text-white hover:bg-violet-800">Cotizar</a>
            </div>
          </nav>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <section className="rounded-3xl bg-gradient-to-br from-[#e9deff] via-[#f2e8ff] to-[#d9f3f6] px-5 py-12 text-center sm:px-12 sm:py-16">
            <h1 className="text-4xl font-black tracking-tight text-indigo-950 sm:text-6xl">Encuentra el diseño para tu web</h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-700 sm:text-lg">Explora la galería, prueba una demo y cotiza la plantilla que elijas por WhatsApp.</p>
            <div className="mx-auto mt-7 flex max-w-xl items-center gap-3 rounded-xl border border-violet-200 bg-white px-4 shadow-sm focus-within:ring-2 focus-within:ring-violet-600">
              <label htmlFor="template-search" className="sr-only">Buscar plantillas</label>
              <span aria-hidden="true" className="text-2xl text-violet-700">⌕</span>
              <input id="template-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Busca un estilo, negocio o categoría" className="w-full bg-transparent py-3 text-slate-900 outline-none placeholder:text-slate-500" />
            </div>
          </section>

          <section id="plantillas" className="py-9" aria-labelledby="gallery-title">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 id="gallery-title" className="text-2xl font-bold tracking-tight">Galería de plantillas</h2>
              <p className="text-sm text-slate-600" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'plantilla' : 'plantillas'}</p>
            </div>
            <div className="my-5 flex flex-wrap gap-2" aria-label="Categorías">
              {[{ id: 'all', name: 'Todas' }, ...categories].map(({ id, name }) => (
                <button key={id} type="button" aria-pressed={activeCategory === id} onClick={() => setActiveCategory(id)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeCategory === id ? 'border-violet-700 bg-violet-700 text-white' : 'border-violet-100 bg-white text-slate-700 hover:border-violet-400'}`}>{name}</button>
              ))}
            </div>
            {filtered.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map(template => <TemplateCard key={template.id} template={template} category={categoryNames[template.category]} onPreview={handlePreview} />)}
            </div> : <p className="rounded-xl border border-violet-100 bg-white p-6">No encontramos plantillas para esa búsqueda. Prueba otra palabra o elige otra categoría.</p>}
          </section>
          <details className="rounded-2xl border border-violet-100 bg-white p-5">
            <summary className="cursor-pointer font-semibold">Plantillas gratuitas para descargar</summary>
            <p className="mt-3 text-sm text-slate-700">Enlaces a los autores originales. HTML5 UP requiere atribución y Start Bootstrap publica estas plantillas bajo MIT.</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {downloads.map(([name, url]) => <li key={name}><a className="inline-block rounded-lg border px-3 py-2 text-sm text-violet-800 hover:underline" href={url} target="_blank" rel="noopener noreferrer">{name}</a></li>)}
            </ul>
          </details>
        </div>
      </main>

      <dialog ref={dialog} onClose={() => setSelected(null)} aria-label="Vista previa de plantilla" className="w-[95vw] max-w-5xl rounded-2xl p-0 backdrop:bg-slate-900/70">
        {selected && <>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
            <strong>{selected.name}</strong>
            <button type="button" autoFocus onClick={() => dialog.current.close()} className="rounded-lg border px-4 py-2 text-sm">Cerrar</button>
          </div>
          <iframe title={'Demo de ' + selected.name} sandbox="allow-popups allow-popups-to-escape-sandbox" srcDoc={pageHtml(selected.name, renderTemplate(selected))} className="h-[60vh] w-full border-0" />
          <div className="flex flex-wrap items-center gap-3 border-t p-4">
            <a href={quoteUrl(selected)} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white">Cotizar</a>
            <button type="button" onClick={() => handleUseTemplate(selected)} className="rounded-lg border px-4 py-2 font-semibold">Personalizar</button>
            {selected.source && <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline">Referencia de diseño · {selected.source}</a>}
          </div>
        </>}
      </dialog>
    </>
  )
}
