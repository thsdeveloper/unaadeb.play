import styled from 'styled-components/native'
import { IAvatarImageProps } from './'

export const ViewAvatar = styled.View`
  width: ${({size}:Pick<IAvatarImageProps, 'size'>) => size}px;
  height: ${({size}:Pick<IAvatarImageProps, 'size'>) => size}px;
`

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`