import styled from 'styled-components/native'
//import { TextInput } from 'react-native-paper'
import { Text, TextInput } from '~/components'

interface TextProps {
  align?: string
}

export const Container = styled.View``

export const Header = styled.View`
  flex: 1;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const HeadText = styled(Text)`
  text-align: ${({ align }: TextProps) => align || 'center'};
  color: ${({ theme }: any) => theme.colors.light};
  line-height: 33px;
`

export const FormContainer = styled.View`
  flex: 1;
`

export const InputText = styled(TextInput).attrs(({ theme }: any) => ({
  textStyle: {
    color: theme.colors.brown,
  },
}))`
  font-weight: 500;
  height: 40px;
  font-size: 16px;
`

export const HeadFormText = styled(Text)`
  text-align: left;
  color: ${({ theme }: any) => theme.colors.light};
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
  flex: 1;
  margin-top: 40px;
  align-items: center;
  margin-bottom: 20px;
`

export const BottomSheetView = styled.View`
  flex: 1;
  margin: 0 20px 20px 20px;
`
export const BottomSheetTitle = styled(Text).attrs({
  size: 18,
  fontWeight: 'bold',
})`
  text-align: center;
  color: #666;
  margin-bottom: 20px;
`

export const SectorViewItem = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  padding-bottom: 5px;
  flex: 1;
`

export const SectorViewItemText = styled(Text).attrs({
  size: 16,
  fontWeight: '500',
})`
  color: ${({ theme }: any) => theme.colors.blueLight};
  padding-left: 10px;
`
