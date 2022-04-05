import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Text } from '~/components/Text'
import { heightPixel } from '~/utils/responsive'

const { width } = Dimensions.get('window')

interface ContainerProps {
  fit: boolean
}

export const Container = styled.View``

export const Button = styled.TouchableOpacity`
  padding: 5px 4px;
`

export const Overlay = styled(LinearGradient).attrs({
  colors: ['#171F52', '#1D2766'],
})<ContainerProps>`
  width: ${({ fit }: ContainerProps) =>
    fit ? width / 3 - 30 : width / 3 - 20}px;
  align-items: center;
  border: 1px solid #243189;
  border-radius: 8px;
  padding: 20px 5px;
  min-height: ${heightPixel(180)}px;
  justify-content: center;
`

export const CardTitle = styled(Text)`
  text-align: center;
`

export const CardImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  margin-bottom: 5px;
  height: ${heightPixel(59)}px;
`
