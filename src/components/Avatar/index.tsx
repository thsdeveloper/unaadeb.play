import React from 'react'
import { ImageSourcePropType, StyleProp, ViewStyle, TextStyle} from 'react-native'
import { useTheme } from 'styled-components/native'
import { Avatar as NPAvatar } from 'react-native-paper'

import * as S from './styles'

export interface IAvatarImageProps {
  source:  ImageSourcePropType | ((props: { size: number }) => React.ReactNode)
  size?: number
  type?: 'circle' | 'square'
  style?: StyleProp<ViewStyle>
}

interface IAvatarTextProps {
  label: string
  size?: number
  color?: string
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  theme?: ReactNativePaper.Theme
}

export const Image : React.FC<IAvatarImageProps> = ({
  source,
  size = 48,
  style, 
  type = 'square'
}):JSX.Element => {

  if(type === 'square'){
    return <S.ViewAvatar size={size} style={style}><S.AvatarImage source={source} /></S.ViewAvatar>
  }

  return <NPAvatar.Image source={source} size={size} style={style} />
  
}

export const Text : React.FC<IAvatarTextProps> = ({
  label,
  size = 48,
  color,
  style,
  theme,
  labelStyle,
}):JSX.Element => {
  const { colors } = useTheme()
 
  return <NPAvatar.Text 
    label={label} 
    size={size} 
    color={color || colors.white} 
    style={[{borderRadius: 10},style]} 
    theme={theme} 
    labelStyle={labelStyle} 
  />
  
}