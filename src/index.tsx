import React from 'react'

import { StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemeProvider} from 'styled-components/native'

import { AuthProvider } from '~/contexts/auth'
import { AlertProvider } from '~/contexts/alert'
import { theme, defaultTheme } from '~/config/fontConfig'
import { Alert } from '~/components'
import Routes from '~/routes'

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <ThemeProvider theme={defaultTheme}>
        <AlertProvider>
          <AuthProvider>
            
              <StatusBar barStyle='light-content' translucent />
              <Routes />
              <Alert />
             
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    </PaperProvider>
  )
}

export default App