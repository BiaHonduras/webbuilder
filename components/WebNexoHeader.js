import Link from 'next/link'
import { quoteUrl } from '../lib/checkout-links'

export default function WebNexoHeader({ account = false }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080e1e] text-white">
      <nav aria-label="Navegación principal" className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-black tracking-tight">
          <span className="webnexo-mark" aria-hidden="true" />WebNexo
        </Link>
        <div className="flex items-center gap-3 text-sm font-semibold sm:gap-4">
          <Link href="/comprar/" aria-current={account ? 'page' : undefined} className={account ? 'text-cyan-300' : 'text-slate-200 hover:text-cyan-300'}>Mi cuenta</Link>
          <a href={quoteUrl()} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-cyan-300 px-3 py-2 text-slate-950 hover:bg-cyan-200 sm:px-4">Cotizar</a>
        </div>
      </nav>
    </header>
  )
}
