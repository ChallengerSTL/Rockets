import '../styles/globals.css'
import Head from 'next/head'
import { ChakraProvider, CSSReset, ColorModeScript, extendTheme } from '@chakra-ui/react'

import { TeamNameProvider } from '../context/TeamNameProvider'
import { CartTotalProvider } from '../context/CartTotalProvider'
import { CartItemsProvider } from '../context/CartItemsProvider'
import { ApprovedItemsProvider } from '../context/ApprovedItemsProvider'

import TeamNamePrompt from './components/team/TeamNamePrompt'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({ config })

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <ApprovedItemsProvider>
        <CartItemsProvider>
          <CartTotalProvider>
            <TeamNameProvider>
              <Head>
                <title>Rocket Revamp</title>
              </Head>

              {/* Show once when no team name is set */}
              <TeamNamePrompt />

              <Component {...pageProps} />
            </TeamNameProvider>
          </CartTotalProvider>
        </CartItemsProvider>
      </ApprovedItemsProvider>
    </ChakraProvider>
  )
}

export default MyApp
