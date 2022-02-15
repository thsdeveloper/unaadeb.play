import React from 'react'
import { StyleProp, ViewStyle, ViewProps } from 'react-native'

import * as S from './styles'

interface IProps extends ViewProps {
  description: string
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  showIcon?: boolean
}

export const NotFound: React.FC<IProps> = ({
  description,
  style,
  children,
  showIcon = true,
  ...props
}): JSX.Element => {
  return (
    <S.Container style={style} {...props}>
      {showIcon && <S.ErrorIcon />}
      <S.ErrorDescription>{description}</S.ErrorDescription>
      {children}
    </S.Container>
  )
}
