import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Entypo'
import { Text } from '~/components'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  align-items: center;
  margin-top: 20px;
`

export const ErrorDescription = styled(Text).attrs({
  size: 22,
  fontWeight: '400',
  customColor: '#c6c6c6',
})`
  text-align: center;
`

export const ErrorIcon = styled(Icon).attrs({
  name: 'emoji-sad',
  size: 60,
  color: '#666',
})`
  margin-bottom: 20px;
`
