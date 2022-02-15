import React from 'react'
import { Menu as NPMenu, Divider, Provider } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import * as S from './styles'

interface MenuItens {
  icon?: string
  onPress?: () => void
  title: string
}

interface IProps {
  anchor: React.ReactNode | { x: number; y: number }
  visible: boolean
  onDismiss: () => void
  items?: MenuItens[]
}

export const Menu: React.FC<IProps> = ({
  anchor,
  visible,
  onDismiss,
  items,
}): JSX.Element => {
  const statusBarHeight = getStatusBarHeight()
  return (
    <S.Container>
      <NPMenu
        visible={visible}
        onDismiss={onDismiss}
        anchor={anchor}
        statusBarHeight={statusBarHeight}
      >
        {items &&
          items?.map((item, index) => (
            <NPMenu.Item
              icon={item.icon}
              key={index}
              onPress={item.onPress}
              title={item.title}
            />
          ))}
      </NPMenu>
    </S.Container>
  )
}
