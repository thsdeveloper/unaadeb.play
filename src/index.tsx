import React from 'react'

import { StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemeProvider} from 'styled-components/native'

import { theme, defaultTheme } from './config/fontConfig'
import Pages from './pages'

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <ThemeProvider theme={defaultTheme}>
          <StatusBar barStyle='light-content' />
          <Pages />
      </ThemeProvider>
    </PaperProvider>
  )
}

export default App