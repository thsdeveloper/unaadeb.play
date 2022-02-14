import React, { useContext, useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import AlertContext from '~/contexts/alert'

export const Alert: React.FC = (): JSX.Element => {
  const { message, type, duration, clear } = useContext(AlertContext)

  const statusBarHeight = getStatusBarHeight()

  useEffect(() => {
    if (message.length) {
      showMessage({
        message: message,
        type: type,
        icon: 'auto',
        duration: duration,
        onHide: () => clear(),
      })
    }
  }, [message, type, duration, clear])

  return <FlashMessage position='top' statusBarHeight={statusBarHeight} />
}
