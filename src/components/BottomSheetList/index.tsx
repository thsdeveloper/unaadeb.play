import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { ListItem } from '~/components'

import * as S from './styles'

interface IProps {
  data: any
  title?: string
  icon?: string
  onItemPress?: (item: any) => void
}

export const BottomSheetList: React.FC<IProps> = ({
  data,
  title,
  icon,
  onItemPress,
}): JSX.Element => {
  const _renderSectorsData = ({
    item,
    index,
  }: {
    item: string
    index: number
  }) => (
    <ListItem
      key={index}
      customTitle={() => (
        <S.SectorViewItem>
          <TouchableOpacity
            onPress={() => onItemPress && onItemPress(`${item}`)}
          >
            <S.SectorViewItemText>{`${item}`}</S.SectorViewItemText>
          </TouchableOpacity>
        </S.SectorViewItem>
      )}
      left={() => icon && <Icon name={icon} size={20} color='#000' />}
    />
  )

  return (
    <S.BottomSheetView>
      {title && <S.BottomSheetTitle>{title}</S.BottomSheetTitle>}
      <FlatList
        data={data}
        renderItem={_renderSectorsData}
        scrollEnabled
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={29}
      />
    </S.BottomSheetView>
  )
}
