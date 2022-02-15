import React from 'react'
import { List } from 'react-native-paper'

import * as S from './styles'

export type TextProps = {
  text: string
  color?: string
  size?: number
}

interface IListItemProps {
  title?: TextProps
  description?: TextProps
  customDescription?: React.ReactNode
  customTitle?: React.ReactNode
  left?: (props: {
    color: string
    style: { marginLeft: number; marginRight: number; marginVertical?: number }
  }) => React.ReactNode
  right?: (props: {
    color: string
    style?: { marginRight: number; marginVertical?: number }
  }) => React.ReactNode
  onPress?: () => void
}

export const ListItem: React.FC<IListItemProps> = ({
  title,
  description,
  customTitle,
  customDescription,
  left,
  right,
  onPress,
}): JSX.Element => {
  const rederTitle = () =>
    title && (
      <S.ListText size={title.size} color={title.color}>
        {title.text}
      </S.ListText>
    )
  const rederDescription = () => (
    <S.ListDescription size={description?.size}>
      {description?.text}
    </S.ListDescription>
  )

  return (
    <List.Item
      title={!!title ? rederTitle : customTitle}
      description={!!description ? rederDescription : customDescription}
      left={left}
      right={right}
      onPress={onPress}
    />
  )
}
