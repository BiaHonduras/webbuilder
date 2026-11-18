import Link from 'next/link'

export default function AccountLink() {
  return <main className="mx-auto max-w-xl p-8"><h1 className="text-2xl font-bold">Mi cuenta de WebNexo</h1><p className="mt-3">Consulta tus órdenes y descarga tus compras aprobadas en tu cuenta.</p><Link href="/comprar/" className="mt-4 inline-block underline">Ir a mi cuenta</Link></main>
}
