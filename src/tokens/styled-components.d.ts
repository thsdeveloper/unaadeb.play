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
        colors: {
            background: string
            white: string
            secondary: string
        }
    }
}