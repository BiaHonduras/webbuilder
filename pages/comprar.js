import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

const amounts = new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' })
const labels = { transfer: 'Transferencia', card: 'Tarjeta', pending: 'En revisión', paid: 'Pago aprobado', rejected: 'Pago rechazado' }

export default function Purchase() {
  const [template, setTemplate] = useState('')
  const [email, setEmail] = useState('')
  const [session, setSession] = useState(null)
  const [product, setProduct] = useState(null)
  const [orders, setOrders] = useState([])
  const [method, setMethod] = useState('')
  const [reference, setReference] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('plantilla') || ''
    setTemplate(/^[a-z0-9-]+$/.test(id) ? id : '')
    if (!supabase) return
    const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession)
      setLoading(false)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) { setProduct(null); setOrders([]); return }
    let active = true
    const selected = template
      ? supabase.from('webnexo_products').select('name,amount_hnl,transfer_instructions,card_url').eq('template_id', template).maybeSingle()
      : Promise.resolve({ data: null })
    Promise.all([selected, supabase.from('webnexo_orders').select('id,template_id,method,status,amount_hnl').order('created_at', { ascending: false })])
      .then(([details, history]) => {
        if (!active) return
        setProduct(details.data)
        setOrders(history.data || [])
        if (details.error || history.error) setMessage('No pudimos consultar los datos de compra. Intenta de nuevo más tarde.')
      })
    return () => { active = false }
  }, [session, template])

  async function signIn(event) {
    event.preventDefault()
    setBusy(true)
    const redirect = new URL('/comprar/', window.location.origin)
    if (template) redirect.searchParams.set('plantilla', template)
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: redirect.toString() } })
    setMessage(error ? 'No pudimos enviar el enlace. Revisa el correo o intenta de nuevo.' : 'Revisa tu correo y abre el enlace para entrar a tu cuenta.')
    setBusy(false)
  }

  async function submitPayment(event) {
    event.preventDefault()
    setBusy(true)
    const { data, error } = await supabase.from('webnexo_orders')
      .insert({ template_id: template, method, reference: reference.trim() })
      .select('id,template_id,method,status,amount_hnl').single()
    if (error) setMessage('No se pudo registrar la referencia. Revisa los datos e inténtalo de nuevo.')
    else {
      setOrders(current => [data, ...current])
      setReference('')
      setMessage('Referencia recibida. La descarga se habilitará al verificar el pago.')
    }
    setBusy(false)
  }

  async function download(order) {
    setBusy(true)
    const { data, error } = await supabase.storage.from('webnexo-private-templates').download(order.template_id + '.zip')
    if (error) setMessage('El archivo aún no está disponible. Si el pago ya fue aprobado, comunícate con WebNexo.')
    else {
      const url = URL.createObjectURL(data)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = order.template_id + '.zip'
      anchor.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }
    setBusy(false)
  }

  return (
    <>
      <Head><title>Mi cuenta y compras | WebNexo</title></Head>
      <main className="mx-auto max-w-3xl p-6 sm:p-10">
        <Link href="/" className="font-semibold text-violet-800">Volver al catálogo</Link>
        <h1 className="my-5 text-3xl font-bold">Mi cuenta y compras</h1>
        {loading && <p>Cargando tu cuenta…</p>}
        {!supabase && <p>El portal de compras está en configuración.</p>}
        {!loading && supabase && !session && (
          <form onSubmit={signIn} className="space-y-3 rounded-2xl border p-5">
            <p>Ingresa tu correo para crear tu cuenta o iniciar sesión con un enlace.</p>
            <label className="block">Correo electrónico<input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} className="mt-1 block w-full rounded-lg border p-2" /></label>
            <button disabled={busy} className="rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white disabled:opacity-50">Enviar enlace de acceso</button>
          </form>
        )}
        {session && <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-sm"><span>{session.user.email}</span><button type="button" className="underline" onClick={() => { setMessage(''); supabase.auth.signOut() }}>Cerrar sesión</button></div>
          {template && !product && <p className="mb-5">La compra de esta plantilla aún no está disponible.</p>}
          {product && <section className="mb-7 space-y-4 rounded-2xl border p-5">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>Total a pagar: <strong>{amounts.format(product.amount_hnl)}</strong></p>
            <form onSubmit={submitPayment} className="space-y-4">
              <label className="block">Método de pago<select required value={method} onChange={event => { setMethod(event.target.value); setReference('') }} className="mt-1 block w-full rounded-lg border p-2">
                <option value="">Selecciona un método</option>
                {product.transfer_instructions && <option value="transfer">Transferencia bancaria</option>}
                {product.card_url && <option value="card">Tarjeta</option>}
              </select></label>
              {method === 'transfer' && <p className="whitespace-pre-line rounded-lg bg-slate-50 p-3">{product.transfer_instructions}</p>}
              {method === 'card' && <a href={product.card_url} target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white">Abrir portal de pago con tarjeta</a>}
              {method && <>
                <label className="block">Referencia del pago<input required minLength={4} maxLength={120} autoComplete="off" value={reference} onChange={event => setReference(event.target.value)} className="mt-1 block w-full rounded-lg border p-2" /></label>
                <button disabled={busy} className="rounded-lg border px-4 py-2 font-semibold disabled:opacity-50">Enviar referencia para revisión</button>
              </>}
            </form>
          </section>}
          <h2 className="mb-3 text-xl font-bold">Mis órdenes</h2>
          {orders.length === 0 && <p>Aún no tienes órdenes.</p>}
          <ul className="space-y-3">{orders.map(order => (
            <li key={order.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
              <div><strong>{order.template_id}</strong><p>{labels[order.method]} · {amounts.format(order.amount_hnl)} · {labels[order.status]}</p></div>
              {order.status === 'paid' && <button disabled={busy} type="button" onClick={() => download(order)} className="rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white disabled:opacity-50">Descargar ZIP</button>}
            </li>
          ))}</ul>
        </>}
        {message && <p role="status" className="mt-5 rounded-lg bg-violet-50 p-3">{message}</p>}
      </main>
    </>
  )
}
