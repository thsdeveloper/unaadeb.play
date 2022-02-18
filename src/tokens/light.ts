import { DefaultTheme } from 'styled-components/native'

export const lightTheme: DefaultTheme = {
  text: {
    font: {
      bold: 'Rajdhani-Bold',
      light: 'Inter-Light',
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      thin: 'Inter-Thin',
    },
    default: {
      color: '#444',
      size: '12px',
      sizeNumber: 12,
      fontFamily: 'Inter-Regular',
    },
    small: {
      color: '#999',
      size: '10px',
      sizeNumber: 10,
    },
    h1: {
      color: '#000',
      size: '27px',
      sizeNumber: 27,
    },
    h2: {
      color: '#999',
      size: '16px',
      sizeNumber: 16,
    },
  },
  input: {
    text: '#fff',
    textSize: '12px',
    placeholder: '#ccc',
    underline: '#ccc',
    placeholderSize: '10px',
    errorColor: '#ccc',
    borderColor: '#ccc',
    padding: '0px',
    borderRadius: '10px',
  },
  colors: {
    background: '#0E1647',
    white: '#fff',
    secondary: '#E51C44',
    light: '#DDE3F0',
    brown: '#4F4F4F',
    blueLight: '#1D2766',
    black: '#000',
    green: '#32BD50',
    orange: '#FFCA28',
  },
}
