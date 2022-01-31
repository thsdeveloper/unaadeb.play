import { PlatformOSType } from 'react-native'
import { DefaultTheme as ThemeDefault } from 'styled-components/native'
import { configureFonts, DefaultTheme } from 'react-native-paper'
import { Fonts, Font } from 'react-native-paper/lib/typescript/types'

import { themes } from '~/tokens'

export type AditionalFonts = {
    bold?: Font
}

type IFontConfigProps = {
    [platform in PlatformOSType | 'default']?: Fonts & AditionalFonts
}

export const fontConfig: IFontConfigProps = {
    ios: {
        regular: {
            fontFamily: 'Inter-Regular',
            fontWeight: '400',
        },
        bold: {
            fontFamily: 'Rajdhani-Bold',
            fontWeight: '700',
        },
        medium: {
            fontFamily: 'Inter-Medium',
            fontWeight: '500',
        },
        light: {
            fontFamily: 'Inter-Light',
            fontWeight: '300',
        },
        thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: '200',
        },
    },
    android: {
        regular: {
            fontFamily: 'Inter-Regular',
            fontWeight: '400',
          },
          bold: {
            fontFamily: 'Rajdhani-Bold',
            fontWeight: '700',
          },
          medium: {
            fontFamily: 'Inter-Medium',
            fontWeight: '500',
          },
          light: {
            fontFamily: 'Inter-Light',
            fontWeight: '300',
          },
          thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: '200',
        },
    }, 
    default: {
        regular: {
            fontFamily: 'Inter-Regular',
            fontWeight: '400',
          },
          bold: {
            fontFamily: 'Rajdhani-Bold',
            fontWeight: '700',
          },
          medium: {
            fontFamily: 'Inter-Medium',
            fontWeight: '500',
          },
          light: {
            fontFamily: 'Inter-Light',
            fontWeight: '300',
          },
          thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: '200',
        },
    }
  }

  export const defaultTheme:ThemeDefault = themes.dark

  export const theme: ReactNativePaper.Theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
    dark: true,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
<<<<<<< Updated upstream
      background: defaultTheme.colors.background,
      primary: '#000',
      accent: '#D0D0D0',
      text: '#fff',
=======
      background: defaultTheme.colors.light,
      primary: defaultTheme.colors.secondary,
      accent: defaultTheme.colors.secondary,
      text: defaultTheme.colors.brown,
>>>>>>> Stashed changes
    },
  }
