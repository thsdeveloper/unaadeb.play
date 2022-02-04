import React from 'react'
import { StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemeProvider } from 'styled-components/native'
import { Alert } from '~/components'
import { defaultTheme, theme } from '~/config/fontConfig'
import { AlertProvider } from '~/contexts/alert'
import { AuthProvider } from '~/contexts/auth'
import Routes from '~/routes'



const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <ThemeProvider theme={defaultTheme}>
        <AlertProvider>
          <AuthProvider>
            
              <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />
              <Routes />
              <Alert />
             
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    </PaperProvider>
  )
}

export default App