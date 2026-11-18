import { useState, useEffect } from 'react'
import Head from 'next/head'
import { supabase } from '../lib/supabase'

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
    let html = tpl.html
    // Reemplazar variables de texto
    Object.entries(vars).forEach(([key, value]) => {
      html = html.replace(new RegExp(key.toUpperCase(), 'g'), value)
    })
    // Reemplazar colores CSS
    Object.entries(cols).forEach(([key, value]) => {
      html = html.replace(new RegExp(`var\\(--${key.toUpperCase()}\\)`, 'gi'), value)
    })
    setPreviewHtml(html)
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
    const session = await supabase.auth.getSession()
    
    const projectData = {
      template_id: template.id,
      custom_name: variables.title || template.name,
      custom_colors: colors,
      custom_text: variables,
      custom_html: previewHtml,
      is_published: false,
      user_id: session.data.session?.user?.id || 'anonymous',
    }

    if (projectId) {
      await supabase.from('projects').update(projectData).eq('id', projectId)
    } else {
      const { data, error } = await supabase.from('projects').insert([projectData]).select()
      if (data) setProjectId(data[0].id)
    }
    setSaving(false)
    alert('Proyecto guardado ✓')
  }

  function exportHTML() {
    const fullHTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${variables.title}</title>
  <script src="https://cdn.jsdelivr.net/npm/tailwindcss@2/dist/tailwind.min.js"><\/script>
</head>
<body>
${previewHtml}
</body>
</html>`
    
    const blob = new Blob([fullHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${variables.title.toLowerCase().replace(/\s+/g, '-')}.html`
    a.click()
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
        <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
          <h1 className="font-bold text-lg text-gray-800">{template.name}</h1>
          <div className="flex gap-3">
            <button 
              onClick={exportHTML}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
            >
              Exportar HTML
            </button>
            <button 
              onClick={saveProject}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar Proyecto'}
            </button>
            <a href="/" className="px-4 py-2 text-gray-500 hover:text-gray-700">← Volver</a>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 bg-white shadow-lg overflow-y-auto p-6">
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
                srcDoc={previewHtml}
                title="Preview"
                className="w-full h-[800px] border-0"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
