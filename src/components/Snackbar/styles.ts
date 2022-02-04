import styled from 'styled-components/native'
import { Snackbar as NPSnackbar } from 'react-native-paper'

type SnackbarType = 'default' | 'success' | 'info' | 'warning' | 'error'

const getSnackbarStyle = (props: SnackbarType) => {
  const style = {
    success: '#4caf50',
    info: '#1D2766',
    warning: '#e09f3e',
    error: '#f44336',
    default: '#000',
  }
  return style[props] || style.default
}

export const Snackbar = styled(NPSnackbar).attrs((props: SnackbarType) => ({
  wrapperStyle: {
    marginBottom: 20,
  }, style: {
    backgroundColor: '#4caf50',
  }
}))``