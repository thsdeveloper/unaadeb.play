import styled from 'styled-components/native'

import { Text } from '~/components'

export const MainContainer = styled.View`
  flex: 1;
  margin-top: 30px;
`

export const ContainerItem = styled.View`
  margin-bottom: 30px;
`

export const ItemTitle = styled(Text).attrs(({ theme }: any) => ({
  fontWeight: 'bold',
  size: 24,
  customColor: theme.colors.secondary,
}))`
  padding-left: 10px;
`

export const descriptionView = styled.View`
  margin-top: 8px;
`

export const DescriptionText = styled(Text).attrs(({ theme }: any) => ({
  size: 16,
  fontWight: '300',
  color: theme.colors.white,
}))``
