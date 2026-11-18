import { useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { categories, templates } from '../data/templates'
import CategoryFilter from '../components/CategoryFilter'
import TemplateCard from '../components/TemplateCard'
import { pageHtml, renderTemplate } from '../lib/template-preview'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  const filtered = activeCategory === 'all' ? templates : templates.filter(template => template.category === activeCategory)
  const salesNumber = process.env.NEXT_PUBLIC_WEBBUILDER_WHATSAPP ?? ''

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
        <title>WebBuilder | Plantillas para emprendimientos</title>
        <meta name="description" content="Explora plantillas web para emprendimientos en Honduras. Personaliza tu diseño antes de publicarlo." />
      </Head>
      <main className="min-h-screen bg-[#f6f4ed] text-stone-950">
        <header className="border-b border-stone-200">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
            <Link href="/" className="text-lg font-black tracking-tight">WebBuilder</Link>
            <Link href="/dashboard" className="text-sm font-semibold underline underline-offset-4">Mis proyectos</Link>
          </nav>
        </header>
        <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <h1 className="max-w-3xl text-5xl font-black leading-none tracking-tight sm:text-7xl">Una página web para tu negocio.</h1>
          <p className="mt-5 max-w-xl text-lg text-stone-700">Elige una plantilla, prueba tus textos y colores, y prepara el sitio para publicarlo.</p>
          <a href="#plantillas" className="mt-7 inline-block rounded-full bg-emerald-900 px-6 py-3 font-semibold text-white">Explorar plantillas</a>
        </section>
        <section id="plantillas" className="mx-auto max-w-6xl px-5 pb-16">
          <h2 className="mb-5 text-3xl font-bold">Plantillas por categoría</h2>
          <CategoryFilter categories={categories} active={activeCategory} onSelect={setActiveCategory} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(template => <TemplateCard key={template.id} template={template} category={categories.find(category => category.id === template.category)?.name} onUse={handleUseTemplate} onPreview={handlePreview} />)}
          </div>
          <p className="mt-8 text-sm text-stone-700">Los precios sugeridos incluyen personalización, una ronda de ajustes y publicación inicial. Dominio, alojamiento y mantenimiento se cotizan por separado.</p>
        </section>
      </main>
      <dialog ref={dialog} onClose={() => setSelected(null)} aria-label="Vista previa de plantilla" className="w-[95vw] max-w-5xl rounded-2xl p-0 backdrop:bg-black/60">
        {selected && <>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
            <strong>{selected.name}</strong>
            <button autoFocus onClick={() => dialog.current.close()} className="rounded-full border px-4 py-2">Cerrar</button>
          </div>
          <iframe title={'Demo de ' + selected.name} sandbox="allow-popups" srcDoc={pageHtml(selected.name, renderTemplate(selected))} className="h-[60vh] w-full border-0" />
          <div className="flex flex-wrap items-center gap-3 border-t p-4">
            <button onClick={() => handleUseTemplate(selected)} className="rounded-full bg-emerald-900 px-4 py-2 font-semibold text-white">Personalizar</button>
            {/^[1-9]\d{9,14}$/.test(salesNumber) && selected.price && <a target="_blank" rel="noopener" className="rounded-full border px-4 py-2" href={'https://wa.me/' + salesNumber + '?text=' + encodeURIComponent('Hola, quiero publicar mi sitio con la plantilla ' + selected.name + '. Mi negocio es: ')}>Solicitar publicación</a>}
            {selected.source && <a href={selected.sourceUrl} target="_blank" rel="noopener" className="text-sm underline">Referencia de diseño · {selected.source}</a>}
          </div>
        </>}
      </dialog>
    </>
  )
}
