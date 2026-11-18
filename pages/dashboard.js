import { useState, useEffect } from 'react'
import Head from 'next/head'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    if (!supabase) {
      setLoading(false)
      return
    }
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setProjects(data)
    setLoading(false)
  }

  async function togglePublish(project) {
    const newPublished = !project.is_published
    await supabase
      .from('projects')
      .update({ is_published: newPublished })
      .eq('id', project.id)
    loadProjects()
  }

  async function deleteProject(id) {
    if (!confirm('¿Eliminar este proyecto?')) return
    await supabase.from('projects').delete().eq('id', id)
    loadProjects()
  }

  function downloadProject(project) {
    const blob = new Blob([project.custom_html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.custom_name.toLowerCase().replace(/\s+/g, '-')}.html`
    a.click()
  }

  return (
    <>
      <Head>
        <title>Mis Proyectos — WebBuilder</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gray-900 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-black mb-2">Mis Proyectos</h1>
            <p className="text-gray-400">Gestiona y exporta tus páginas web</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {!loading && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">{supabase ? 'No tienes proyectos aún' : 'El guardado de proyectos requiere configurar Supabase.'}</p>
              <a href="/" className="text-blue-600 font-semibold hover:underline">Crear uno nuevo →</a>
            </div>
          )}

          <div className="grid gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{project.custom_name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Creado el {new Date(project.created_at).toLocaleDateString()}
                    {project.is_published && <span className="ml-3 text-green-600 font-semibold">● Publicado</span>}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => downloadProject(project)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-semibold"
                  >
                    Descargar HTML
                  </button>
                  <button
                    onClick={() => togglePublish(project)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      project.is_published 
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {project.is_published ? 'Despublicar' : 'Publicar'}
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-semibold"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-700 transition">
              + Crear nueva página
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
