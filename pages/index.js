import { useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { categories, catalog } from '../data/catalog'
import TemplateCard from '../components/TemplateCard'
import { checkoutUrl, quoteUrl } from '../lib/checkout-links'

const categoryNames = Object.fromEntries(categories.map(({ id, name }) => [id, name]))
const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const templates = [
  ...catalog,
  { id: 'noir-elegante', name: 'Noir', category: 'servicios', description: 'Diseño oscuro y minimalista.', colors: { bg: '#171624', primary: '#171624', secondary: '#756480' }, variables: { heading: 'Elegancia sin tiempo' } },
  { id: 'bloom-warm', name: 'Bloom', category: 'servicios', description: 'Estilo cálido para marcas de bienestar.', colors: { bg: '#f6e4d9', primary: '#643c46', secondary: '#d7a18b' }, variables: { heading: 'Crece a tu ritmo' } },
  { id: 'prism-creativo', name: 'Prism', category: 'portfolio', description: 'Portafolio de estilo dinámico y creativo.', colors: { bg: '#272443', primary: '#272443', secondary: '#ab62b6' }, variables: { heading: 'Diseño con personalidad' } },
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

  function handlePreview(template) {
    setSelected(template)
    dialog.current.showModal()
  }

  return (
    <>
      <Head>
        <title>WebNexo | El diseño perfecto para tu emprendimiento</title>
        <meta name="description" content="Explora plantillas web para emprendimientos en Honduras, consulta una vista previa y cotiza por WhatsApp." />
      </Head>
      <main className="min-h-screen bg-[#f2f5fa] text-slate-950">
        <header className="border-b border-white/10 bg-[#080e1e] text-white">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
            <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-black tracking-tight"><span className="webnexo-mark" aria-hidden="true" />WebNexo</Link>
            <div className="flex items-center gap-4 text-sm font-semibold">
              <Link href="/comprar/" className="text-slate-200 hover:text-cyan-300">Mi cuenta</Link>
              <a href={quoteUrl()} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-cyan-300 px-4 py-2 text-slate-950 hover:bg-cyan-200">Cotizar</a>
            </div>
          </nav>
        </header>

        <section className="webnexo-hero" aria-labelledby="webnexo-lema">
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:py-24">
            <div>
              <h1 id="webnexo-lema" className="max-w-3xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl xl:text-7xl">
                El diseño perfecto para tu <span className="text-cyan-300">emprendimiento</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
                Explora plantillas web por categoría y encuentra una para tu negocio.
              </p>
              <div className="mt-8 flex max-w-lg items-center gap-3 rounded-xl border border-cyan-200/30 bg-[#101b30] px-4 focus-within:ring-2 focus-within:ring-cyan-300">
                <label htmlFor="template-search" className="sr-only">Buscar plantillas</label>
                <span aria-hidden="true" className="webnexo-search-icon" />
                <input id="template-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Busca un estilo, negocio o categoría" className="min-w-0 w-full bg-transparent py-3.5 text-white outline-none placeholder:text-slate-300" />
              </div>
              <a href="#plantillas" className="mt-5 inline-flex rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-200">Explorar plantillas <span aria-hidden="true" className="ml-2">↓</span></a>
            </div>
            <div className="webnexo-showcase hidden lg:block" aria-hidden="true">
              <div className="webnexo-window">
                <div className="webnexo-window-bar"><i /><i /><i /><span /></div>
                <div className="webnexo-window-body">
                  {['trazo-estudio', 'brasa-urbana', 'ruta-montana'].map(id => {
                    const item = catalog.find(template => template.id === id)
                    return item && <div key={id} className="webnexo-window-tile" style={{ backgroundImage: `linear-gradient(0deg, #071021, transparent 76%), url("${item.thumbnail}")` }}><span>{item.name}</span></div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="webnexo-gallery">
          <section id="plantillas" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12" aria-labelledby="gallery-title">
            <div className="webnexo-gallery-banner relative isolate flex min-h-[9rem] flex-wrap content-end items-end justify-between gap-3 overflow-hidden rounded-2xl border border-sky-200/70 px-5 py-5 sm:px-7">
              <h2 id="gallery-title" className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Galería de plantillas</h2>
              <p className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'plantilla' : 'plantillas'}</p>
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
        </div>
      </main>

      <dialog ref={dialog} onClose={() => setSelected(null)} aria-label="Vista previa de plantilla" className="w-[95vw] max-w-5xl rounded-2xl p-0 backdrop:bg-slate-900/70">
        {selected && <>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
            <strong>{selected.name}</strong>
            <button type="button" autoFocus onClick={() => dialog.current.close()} className="rounded-lg border px-4 py-2 text-sm">Cerrar</button>
          </div>
          <div className="flex min-h-[16rem] items-end overflow-hidden bg-slate-900 p-6 text-white sm:min-h-[24rem]" style={{ background: selected.image ? `linear-gradient(transparent, #161428dd), url("${selected.image}") center / cover` : `linear-gradient(135deg, ${selected.colors.primary}, ${selected.colors.secondary})` }}><p className="max-w-xl text-3xl font-bold sm:text-5xl">{selected.variables.heading}</p></div>
          <div className="flex flex-wrap items-center gap-3 border-t p-4">
            <a href={quoteUrl(selected)} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white">Cotizar</a>
            <Link href={checkoutUrl(selected.id)} className="rounded-lg border px-4 py-2 font-semibold">Comprar plantilla</Link>
          </div>
        </>}
      </dialog>
    </>
  )
}
