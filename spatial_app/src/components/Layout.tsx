import { PropsWithChildren } from 'react'
import Head from 'next/head'

interface Props {
  title?: string,
  transparent?: boolean
}

const Layout = (props: PropsWithChildren<Props>) => {


  return (

    <div>
      <Head>
        <title>{props.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
      </header>
      <main>
        {props.children}
      </main>
    </div>
  )
}

export default Layout