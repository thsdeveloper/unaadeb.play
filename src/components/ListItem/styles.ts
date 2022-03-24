import styled from 'styled-components/native'
import { Text } from '~/components'

import { TextProps } from './'

export const ListText = styled(Text).attrs(
  ({ theme, size, color }: any | TextProps) => ({
    size: size || 16,
    fontWeight: 'bold',
    customColor: color || theme.colors.light,
  }),
)``
export const ListDescription = styled(Text).attrs(
  ({ size, theme }: any | TextProps) => ({
    size: size || 16,
    fontWeight: 'normal',
    color: theme.text.default.color,
  }),
)`
  margin-top: 5px;
`
