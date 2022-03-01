import styled from 'styled-components/native'

import { TextInput, Button, Text } from '~/components'
import { heightPixel, fontPixel } from '~/utils/responsive'

interface InputMode {
  mode: 'flat' | 'outlined'
}

export const Container = styled.View`
  margin-top: 20px;
`

export const Input = styled(TextInput).attrs(({ theme, mode }: any) => ({
  underlineColor: theme.colors.brown,
  customTheme: {
    colors: {
      text: mode === 'outlined' ? theme.colors.dark : theme.colors.light,
      placeholder: theme.colors.secondary,
      disabled: theme.colors.secondary,
    },
  },
  mode: mode || 'flat',
}))<InputMode>`
  font-size: 16px;
  padding-bottom: 10px;
  background-color: ${({ mode, theme }: InputMode | any) =>
    mode === 'flat' ? 'transparent' : theme.colors.light};
  height: 40px;
`
export const AvatarView = styled.View`
  align-items: center;
`
export const ButtonEditImage = styled(Button).attrs({
  mode: 'text',
})`
  width: 240px;
`

export const LabelView = styled.View`
  padding-left: 10px;
  padding-bottom: 5px;
`

export const InputLabel = styled(Text).attrs(({ theme }: any) => ({
  size: 16,
  customColor: theme.colors.secondary,
}))``

export const SubmitButtonView = styled.View`
  flex: 1;
  margin-top: 40px;
  align-items: center;
  margin-bottom: 20px;
`
