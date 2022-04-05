import React from 'react'

import { StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemeProvider } from 'styled-components/native'
import { TrackProvider } from '~/contexts/track'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import codePush from 'react-native-code-push'

import { AuthProvider } from '~/contexts/auth'
import { AlertProvider } from '~/contexts/alert'
import { theme, defaultTheme } from '~/config/fontConfig'
import { Alert, PlayerMinimalist } from '~/components'
import Routes from '~/routes'

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <ThemeProvider theme={defaultTheme}>
        <AlertProvider>
          <AuthProvider>
            <BottomSheetModalProvider>
              <TrackProvider>
                <StatusBar
                  barStyle='light-content'
                  translucent
                  backgroundColor={'transparent'}
                />
                <Routes />
                <PlayerMinimalist />
                <Alert />
              </TrackProvider>
            </BottomSheetModalProvider>
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    </PaperProvider>
  )
}

export default codePush(codePushOptions)(App)
