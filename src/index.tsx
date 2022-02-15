import React from 'react'

import { StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemeProvider } from 'styled-components/native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

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
            <BottomSheetModalProvider>
              <StatusBar
                barStyle='light-content'
                translucent
                backgroundColor={'transparent'}
              />
              <Routes />
              <Alert />
            </BottomSheetModalProvider>
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    </PaperProvider>
  )
}

export default App
