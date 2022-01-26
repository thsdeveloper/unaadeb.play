import React from 'react'
import { useTheme } from 'styled-components/native'
import Icon from 'react-native-vector-icons/AntDesign'

import * as S from './styles'

interface IconProps {
  name?: string
  size?: number
  color?: string
}

interface IButtonProps {
  text: string
  icon?: IconProps
  color?: string
  mode?: 'contained' | 'outlined' | 'text'
  upperCase?: boolean
  textSize?: number
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
}

export const Button : React.FC<IButtonProps> = ({
  text,
  icon,
  color,
  mode = 'contained',
  upperCase = false,
  loading = false,
  disabled = false,
  textSize,

  onPress
}):JSX.Element => {
  const { colors } = useTheme()

  const labelStyle = {
    fontSize: textSize || 16,
    fontWeight: 'normal',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    flex: 1,
    justifyContent: 'space-between',
  }

  const styleContent = !!icon ? {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'center',
  } : {}

  const renderIcons =  () => {
    const {size, name, color} = icon || {}
    return name && (<S.ViewIcon><Icon name={name} size={size || 16} color={color || colors.white} /></S.ViewIcon>)
  }

  return (
    <S.Button 
      uppercase={upperCase} 
      mode={mode} 
      color={!color ? colors.secondary : color} 
      icon={icon && renderIcons}
      labelStyle={labelStyle}
      contentStyle={styleContent}
      loading={loading}
      disabled={disabled}
      onPress={onPress}>
        {text}
    </S.Button>
  )
}