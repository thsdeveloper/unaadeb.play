import styled from 'styled-components/native'
import { TextInput } from 'react-native-paper'
import { Text } from '~/components'

interface TextProps {
  align?: string
}

export const Container = styled.View``

export const Header = styled.View`
  flex:1;
  margin-top:20px;
  margin-bottom:20px;
`

export const HeadText = styled(Text)`
  text-align: ${({align}: TextProps) => align || 'center'};
  color:${({theme}:any) => theme.colors.light};
`

export const FormContainer = styled.View`
  flex:1;
`

export const InputText = styled(TextInput).attrs(({theme}:any) => ({
  textStyle:{
    color: theme.colors.brown,
  }
}))`
  margin-bottom: 15px;
  font-weight: 500;
`

export const HeadFormText = styled(Text)`
  text-align: left;
  color:${({theme}:any) => theme.colors.light};
  margin-top: 20px;
  margin-bottom: 20px;
`

export const ViewSwitchField = styled.View`
  flex-direction: row;
  flex: 1;
  margin-top: 20px;
  text-wrap: wrap;
  align-items: center;
`

export const SubmitButtonView = styled.View`
  flex:1;
  margin-top: 40px;
  align-items: center;
  margin-bottom: 20px;
`