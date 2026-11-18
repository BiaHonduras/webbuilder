import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link key="webnexo-icon" rel="icon" type="image/png" sizes="64x64" href="/webnexo-chip.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
