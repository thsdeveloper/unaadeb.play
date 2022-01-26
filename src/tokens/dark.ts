import { DefaultTheme } from 'styled-components/native'

export const darkTheme: DefaultTheme = {
    text: {
        font: {
            bold: 'Rajdhani-Bold',
            light: 'Inter-Light',
            regular: 'Inter-Regular',
            medium: 'Inter-Medium',
            thin: 'Inter-Thin',
        },
        default: {
          color: '#fff',
          size: '12px',
          sizeNumber: 12,
        },
        small: {
          color: '#fff',
          size: '10px',
          sizeNumber: 10,
        },
        h1: {
          color: '#fff',
          size: '35px',
          sizeNumber: 35,
        },
        h2: {
          color: '#fff',
          size: '18px',
          sizeNumber: 18,
        },
    },
    colors: {
        background: '#0E1647',
        white: '#fff',
        secondary: '#E51C44',
    }
}