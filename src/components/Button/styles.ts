import styled from 'styled-components/native'
import { Button as NPButton } from 'react-native-paper'
import { Text } from '~/components'

interface ColorProps {
  color: string
}

export const Button = styled(NPButton)``

export const ViewIcon = styled.View`
  flex: 1;
  align-self: center;
  border-right-color: #991f36;
  border-right-width: 1px;
  justify-content: center;
  padding-left: 10px;
  padding-right: 20px;
`

export const ButtonRounded = styled.TouchableOpacity`
  background-color: ${({ theme, color }: any | ColorProps) =>
    color || theme.colors.secondary};
  border-radius: 20px;
  padding: 10px 20px;
  align-items: center;
  flex-direction: row;
`
export const ButtonRoundedText = styled(Text).attrs({
  size: 14,
  fontWeight: 'normal',
})``

export const Loading = styled.ActivityIndicator.attrs(
  ({ theme, size }: any) => ({
    size: size ?? 'large',
    color: theme.colors.white,
  }),
)`
  margin-right: 5px;
`
