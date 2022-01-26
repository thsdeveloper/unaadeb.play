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
    colors: {
        background: '#0E1647',
        white: '#fff',
        secondary: '#E51C44',
    }
}