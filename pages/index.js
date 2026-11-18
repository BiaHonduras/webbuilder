import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { categories, templates } from '../data/templates'
import CategoryFilter from '../components/CategoryFilter'
import TemplateCard from '../components/TemplateCard'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? templates
    : templates.filter(t => t.category === activeCategory)

  function handleUseTemplate(template) {
    sessionStorage.setItem('selectedTemplate', JSON.stringify(template))
    window.location.href = '/editor'
  }

  return (
    <>
      <Head>
        <title>WebBuilder — Crea tu página web en minutos</title>
        <meta name="description" content="Crea páginas web profesionales sin código" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gray-900 text-white py-20 px-6 text-center">
          <h1 className="text-5xl font-black mb-4">Crea tu página web</h1>
          <p className="text-xl text-gray-300 mb-2">Elige una plantilla y personalízala en minutos</p>
          <p className="text-gray-500">Sin código · Sin complicaciones</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/editor" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
              Empezar ahora
            </Link>
            <Link href="/dashboard" className="border border-gray-600 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
              Mis proyectos
            </Link>
          </div>
        </div>

        {/* Templates */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Plantillas disponibles</h2>
          <p className="text-gray-500 mb-8">Selecciona una categoría para filtrar</p>
          
          <CategoryFilter 
            categories={categories} 
            active={activeCategory} 
            onSelect={setActiveCategory} 
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(template => (
              <TemplateCard 
                key={template.id} 
                template={template} 
                onUse={handleUseTemplate} 
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
