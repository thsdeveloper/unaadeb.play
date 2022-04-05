import styled from 'styled-components/native'

import { Text, TextInput } from '~/components'
import { pixelSizeVertical } from '~/utils/responsive'

export const Container = styled.View``

export const P = styled(Text)`
  line-height: 23px;
  text-align: center;
  margin-top: ${pixelSizeVertical(20)}px;
  padding: 0 ${pixelSizeVertical(20)}px;
`

export const InputText = styled(TextInput).attrs(({ theme }: any) => ({
  textStyle: {
    color: theme.colors.brown,
  },
}))`
  font-weight: 500;
  height: 40px;
  font-size: 16px;
  padding-bottom: 5px;
  padding-top: 10px;
  height: 40px;
  line-height: 20px;
  margin-top: 30px;
`
export const ViewSubmitButton = styled.View`
  flex: 1;
  margin: 0 25% 0 25%;
  justify-content: center;
`
