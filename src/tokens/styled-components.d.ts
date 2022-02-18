declare module 'styled-components' {
  export interface DefaultTheme {
    text: {
      font?: {
        bold: string
        light: string
        regular: string
        medium: string
        thin: string
      }

      default: {
        color: string
        size: string
        sizeNumber: number
        fontFamily: string
      }
      small: {
        color: string
        size: string
        sizeNumber: number
      }
      h1: {
        color: string
        size: string
        sizeNumber: number
      }
      h2: {
        color: string
        size: string
        sizeNumber: number
      }
    }
    input: {
      text: string
      textSize: string
      placeholder: string
      underline: string
      placeholderSize: string
      errorColor: string
      borderColor: string
      padding: string
      borderRadius: string
    }
    colors: {
      background: string
      white: string
      secondary: string
      light: string
      brown: string
      blueLight: string
      black: string
      green: string
      orange: string
    }
  }
}
