import styled from 'styled-components/native'

import { Text } from '~/components'

export const Container = styled.View``

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
