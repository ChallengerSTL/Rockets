import '../styles/globals.css'
import Head from 'next/head'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import { CartTotalProvider } from '../context/CartTotalProvider'
import { CartItemsProvider } from '../context/CartItemsProvider'
import { ApprovedItemsProvider } from '../context/ApprovedItemsProvider'

import { extendTheme } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }
  const theme = extendTheme({ config });

  return (
    <ChakraProvider>
      <CSSReset/>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ApprovedItemsProvider>
        <CartItemsProvider>
          <CartTotalProvider>
            <Head>
              <title>Rocket Revamp</title>
            </Head>
            <Component {...pageProps} />
          </CartTotalProvider>
        </CartItemsProvider>
      </ApprovedItemsProvider>
    </ChakraProvider>
  )
}

export default MyApp
