import { BrowserRouter } from 'react-router-dom'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './pages/layout/layout'
import './App.css'

const emotionCache = createCache({
  key: 'emotion-css-cache',
  prepend: true // ensures styles are prepended to the <head>, instead of appended
})

function App () {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default App
