import { useState, useEffect } from 'react'
import Head from 'next/head'
import { supabase } from '../lib/supabase'
import { pageHtml, renderTemplate } from '../lib/template-preview'

export default function Editor() {
  const [template, setTemplate] = useState(null)
  const [variables, setVariables] = useState({})
  const [colors, setColors] = useState({})
  const [previewHtml, setPreviewHtml] = useState('')
  const [saving, setSaving] = useState(false)
  const [projectId, setProjectId] = useState(null)

  useEffect(() => {
    const selected = sessionStorage.getItem('selectedTemplate')
    if (selected) {
      const t = JSON.parse(selected)
      setTemplate(t)
      setVariables(t.variables)
      setColors(t.colors)
      updatePreview(t, t.variables, t.colors)
    } else {
      window.location.href = '/'
    }
  }, [])

  function updatePreview(tpl, vars, cols) {
    setPreviewHtml(renderTemplate(tpl, vars, cols, window.location.origin))
  }

  function handleVariableChange(key, value) {
    const newVars = { ...variables, [key]: value }
    setVariables(newVars)
    updatePreview(template, newVars, colors)
  }

  function handleColorChange(key, value) {
    const newColors = { ...colors, [key]: value }
    setColors(newColors)
    updatePreview(template, variables, newColors)
  }

  async function saveProject() {
    setSaving(true)
    try {
      const session = await supabase.auth.getSession()
      if (session.error) throw session.error
      const projectData = {
        template_id: template.id,
        custom_name: variables.title || variables.brand || template.name,
        custom_colors: colors,
        custom_text: variables,
        custom_html: previewHtml,
        is_published: false,
        user_id: session.data.session?.user?.id || 'anonymous',
      }
      const projects = supabase.from('projects')
      const result = projectId
        ? await projects.update(projectData).eq('id', projectId).select('id').single()
        : await projects.insert(projectData).select('id').single()
      if (result.error) throw result.error
      setProjectId(result.data.id)
      alert('Proyecto guardado')
    } catch {
      alert('No se pudo guardar el proyecto. Puedes exportar el HTML para conservar tus cambios.')
    } finally {
      setSaving(false)
    }
  }

  function exportHTML() {
    const title = variables.title || variables.brand || template.name
    const fullHTML = pageHtml(title, previewHtml)
    
    const blob = new Blob([fullHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-') || template.slug}.html`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  if (!template) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>

  const variableFields = Object.keys(variables).map(key => ({
    key,
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    value: variables[key]
  }))

  return (
    <>
      <Head>
        <title>Editor — {template.name}</title>
      </Head>

      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow px-6 py-3 flex flex-wrap gap-2 justify-between items-center">
          <h1 className="font-bold text-lg text-gray-800">{template.name}</h1>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={exportHTML}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
            >
              Exportar HTML
            </button>
            <button 
              onClick={saveProject}
              disabled={saving || !supabase}
              title={supabase ? undefined : 'Configura Supabase para guardar proyectos'}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar Proyecto'}
            </button>
            <a href="/" className="px-4 py-2 text-gray-500 hover:text-gray-700">← Volver</a>
          </div>
        </div>

        <div className="flex flex-1 flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-80 md:shrink-0 bg-white shadow-lg overflow-y-auto p-6">
            <h2 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wide">Colores</h2>
            <div className="space-y-3 mb-8">
              {Object.keys(colors).map(key => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={colors[key]}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-10 h-8 rounded cursor-pointer"
                    />
                    <span className="text-xs text-gray-500 w-20">{colors[key]}</span>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wide">Contenido</h2>
            <div className="space-y-4">
              {variableFields.map(({ key, label, value }) => (
                <div key={key}>
                  <label className="block text-sm text-gray-600 mb-1">{label}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleVariableChange(key, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <iframe
                srcDoc={pageHtml(variables.title || template.name, previewHtml)}
                title="Preview"
                className="w-full h-[800px] border-0"
                sandbox="allow-popups"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
