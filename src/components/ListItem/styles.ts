import styled from 'styled-components/native'

import { TextProps } from './'

export const ListText = styled.Text`
  font-size: ${({size}:TextProps) => size || 16}px;
  font-weight: 700;
  color: #fff;
`
export const ListDescription = styled.Text`
  font-size: ${({size}:TextProps) => size || 16}px;
  margin-top: 5px;
  font-weight: 300;
  color: #ffff;
`