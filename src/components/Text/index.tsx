import React from 'react'
import { TextProps, Platform } from 'react-native'
import styled from 'styled-components/native'

import { fontConfig } from '~/config/fontConfig'
import { fontPixel } from '~/utils/responsive'

export interface ITextProps extends TextProps {
  note?: boolean
  uppercase?: boolean
  customColor?: string
  fontWeight?: 'thin' | 'light' | 'regular' | 'medium' | 'bold'
  size?: number
  lineHeight?: number
}

const getFontFamily = (fontWeight: Pick<ITextProps, 'fontWeight'>) => {
  const fonts = fontConfig[Platform.OS] || fontConfig.default

  switch (fontWeight) {
    case 'thin':
      return fonts?.thin?.fontFamily
    case 'light':
      return fonts?.light?.fontFamily
    case 'regular':
      return fonts?.regular?.fontFamily
    case 'medium':
      return fonts?.medium?.fontFamily
    case 'bold':
      return fonts?.bold?.fontFamily
    default:
      return fonts?.regular?.fontFamily
  }
}

const RNText = styled.Text<ITextProps>`
  color: ${({ theme, customColor }: ITextProps | any) =>
    !!customColor ? customColor : theme.text.default.color};
  font-size: ${({ size, theme }: ITextProps | any) =>
    fontPixel(size) || fontPixel(theme.text.default.sizeNumber)}px;
  text-transform: ${({ uppercase }: ITextProps) =>
    uppercase ? 'uppercase' : 'none'};
  font-family: ${({ fontWeight, theme }: ITextProps | any) =>
    fontWeight ? getFontFamily(fontWeight) : theme.text.default.fontFamily};
  ${({ fontWeight }: ITextProps) => fontWeight && `font-weight: ${fontWeight};`}
  ${({ lineHeight }: ITextProps) =>
    lineHeight && `line-height:${lineHeight || 30}px;`}
`

export const Text: React.FC<ITextProps> = ({
  children,
  ...props
}): JSX.Element => <RNText {...props}>{children}</RNText>
