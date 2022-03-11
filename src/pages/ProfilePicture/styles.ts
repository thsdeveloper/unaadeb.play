import styled from 'styled-components/native'
import { TextInput, Button, Text } from '~/components'

export const Container = styled.View``

export const ButtonPicture = styled(Button).attrs({
  mode: 'outlined',
  textSize: 12,
  style: { width: '100%' },
})`
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({ theme }: any) => theme.colors.secondary};
  margin-bottom: 10px;
`
