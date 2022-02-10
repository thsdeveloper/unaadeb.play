import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Text } from '~/components/Text'

const { width } = Dimensions.get('window')

export const Container = styled.View`

`

export const Button = styled.TouchableOpacity`
  padding: 5px 4px;
`

export const Overlay = styled(LinearGradient).attrs({
  colors: ['#171F52', '#1D2766'],
})`
  width: ${width / 3 - 20}px;
  align-items: center;
  border: 1px solid #243189;
  border-radius: 8px;
  padding: 20px 18px;
`

export const CardTitle = styled(Text)`
  text-align: center;
`

export const CardImage = styled.Image.attrs({
  resizeMode: 'contain',
  })`
  margin-bottom: 5px;
  height: 59px;
`