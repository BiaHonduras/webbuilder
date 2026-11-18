export default function TemplateCard({ template, onUse }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border">
      <div 
        className="h-40 flex items-center justify-center text-6xl"
        style={{ background: `linear-gradient(135deg, ${template.colors.primary}22, ${template.colors.secondary}22)` }}
      >
        {template.name.split(' ').map(w => w[0]).join('').slice(0,2)}
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{template.category}</span>
        <h3 className="text-lg font-bold text-gray-800 mt-1">{template.name}</h3>
        <p className="text-sm text-gray-500 mt-2">{template.description}</p>
        <button
          onClick={() => onUse(template)}
          className="mt-4 w-full bg-gray-900 text-white py-2 rounded-xl font-semibold hover:bg-gray-700 transition"
        >
          Usar esta plantilla
        </button>
      </div>
    </div>
  )
}
