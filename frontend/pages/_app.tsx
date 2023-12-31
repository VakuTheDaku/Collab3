import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className='min-h-screen bg-black'>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </div>
  )
}
