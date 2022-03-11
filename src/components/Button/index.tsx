import React from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { useTheme } from 'styled-components/native'
import Icon from 'react-native-vector-icons/AntDesign'

import { fontPixel } from '~/utils/responsive'
import * as S from './styles'

interface IconProps {
  name?: string
  size?: number
  color?: string
  bordered?: boolean
  borderColor?: string
}

export interface IButtonProps {
  text: string
  icon?: IconProps
  color?: string
  mode?: 'contained' | 'outlined' | 'text' | 'rounded'
  upperCase?: boolean
  textSize?: number
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export const Button: React.FC<IButtonProps> = ({
  text,
  icon,
  color,
  mode = 'contained',
  upperCase = false,
  loading = false,
  disabled = false,
  textSize,
  onPress,
  style,
}): JSX.Element => {
  const { colors } = useTheme()

  const labelStyle = {
    fontSize: textSize || fontPixel(16),
    fontWeight: 'normal',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    flex: 1,
    justifyContent: 'space-between',
  }

  const styleContent = !!icon && {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'center',
  }

  const renderIcons = () => {
    const { size, name, color, bordered = true, borderColor } = icon || {}
    return (
      name && (
        <S.ViewIcon bordered={bordered} borderColor={borderColor}>
          <Icon
            name={name}
            size={(size && fontPixel(size)) || fontPixel(16)}
            color={color || colors.white}
          />
        </S.ViewIcon>
      )
    )
  }

  if (mode === 'rounded') {
    return (
      <S.ButtonRounded color={color} onPress={onPress}>
        {icon?.name && !loading && (
          <Icon
            name={icon?.name}
            size={(icon?.size && fontPixel(icon?.size)) || fontPixel(16)}
            color={icon?.color || colors.white}
          />
        )}
        {loading && <S.Loading size='small' />}
        <S.ButtonRoundedText>{text}</S.ButtonRoundedText>
      </S.ButtonRounded>
    )
  }

  return (
    <S.Button
      uppercase={upperCase}
      mode={mode}
      color={!color ? colors.secondary : color}
      icon={icon && renderIcons}
      labelStyle={labelStyle}
      contentStyle={[styleContent, style]}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
    >
      {text}
    </S.Button>
  )
}
