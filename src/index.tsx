import React from 'react'

import { StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemeProvider} from 'styled-components/native'

import {AuthProvider} from '~/contexts/auth'
import { theme, defaultTheme } from '~/config/fontConfig'
import Routes from '~/routes'

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <ThemeProvider theme={defaultTheme}>
          <AuthProvider>
            <StatusBar barStyle='light-content' />
            <Routes />
          </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  )
}

export default App