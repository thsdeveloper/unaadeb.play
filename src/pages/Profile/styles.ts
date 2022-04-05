import styled from 'styled-components/native'

import { TextInput, Button, Text } from '~/components'
import { heightPixel, fontPixel } from '~/utils/responsive'

interface InputMode {
  mode: 'flat' | 'outlined'
}

export const Container = styled.View`
  margin-top: 20px;
  margin-bottom: 50px;
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
  padding-bottom: 5px;
  padding-top: 10px;
  background-color: ${({ mode, theme }: InputMode | any) =>
    mode === 'flat' ? 'transparent' : theme.colors.light};
  height: 45px;
  line-height: 20px;
`
export const AvatarView = styled.View`
  align-items: center;
`
export const ButtonEditImage = styled(Button).attrs({
  mode: 'text',
  textSize: 12,
})`
  width: 240px;
`

export const LabelView = styled.View`
  position: relative;
`

export const InputLabel = styled(Text).attrs(({ theme }: any) => ({
  size: 18,
  customColor: theme.colors.secondary,
}))``

export const SubmitButtonView = styled.View`
  flex: 1;
  margin-top: 40px;
  align-items: center;
  margin-bottom: 20px;
`
export const PassRecoveryButtonView = styled.View`
  margin-top: 10px;
  align-items: center;
`

export const ButtonHideDialog = styled(Button).attrs({
  mode: 'text',
})``

export const QuitButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 1;
`

export const ViewRadio = styled.View`
  flex-direction: row;
  align-items: center;
`

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
