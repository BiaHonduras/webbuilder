import { mkdir, readFile, writeFile } from 'node:fs/promises'

const source = await readFile(new URL('../data/catalog.js', import.meta.url), 'utf8')
const { catalog } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'))
const paths = new Set(catalog.flatMap(template => [template.image, template.thumbnail]).filter(Boolean))
const output = new URL('../public/gallery-images/', import.meta.url)

await mkdir(output, { recursive: true })

async function cachePhoto(path) {
  const match = /^\/gallery-images\/([0-9a-f-]+)-(560|1200)\.jpg$/.exec(path)
  if (!match) throw new Error('Ruta de imagen inválida: ' + path)
  const [, photoId, width] = match
  const destination = new URL(photoId + '-' + width + '.jpg', output)
  const remote = new URL('https://images.unsplash.com/photo-' + photoId)
  remote.search = new URLSearchParams({ fit: 'crop', fm: 'jpg', w: width, q: '80' })
  const existing = await readFile(destination).catch(() => null)
  if (existing?.[0] === 255 && existing?.[1] === 216) return true

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(remote, { signal: AbortSignal.timeout(6500) })
      if (!response.ok) {
        if (response.status === 404) break
        continue
      }
      const bytes = Buffer.from(await response.arrayBuffer())
      if (bytes[0] !== 255 || bytes[1] !== 216) continue
      await writeFile(destination, bytes)
      return true
    } catch {
      // The gallery renders a color background when a photo is unavailable.
    }
  }
  console.warn('Imagen no disponible durante la compilación: ' + path)
  return false
}

const queue = [...paths]
let cached = 0
await Promise.all(Array.from({ length: 8 }, async () => {
  while (queue.length) {
    if (await cachePhoto(queue.shift())) cached += 1
  }
}))
console.log('Imágenes del catálogo disponibles: ' + cached + '/' + paths.size)
