import React from 'react'
import { FlatList, ImageSourcePropType } from 'react-native'

import * as S from './styles'

interface ICardDataProps {
  data: ICardItemProps[]
  fit?: boolean
}

interface ICardItemProps {
  title: string
  image?: ImageSourcePropType
  onPress?: () => void
}

export const SmallCard: React.FC<ICardDataProps> = ({
  data,
  fit,
}): JSX.Element => {
  const _renderCard = ({
    item,
    index,
  }: {
    item: ICardItemProps
    index: number
  }) => (
    <S.Button key={index} onPress={item?.onPress}>
      <S.Overlay fit={fit}>
        <S.CardImage source={item?.image} />
        <S.CardTitle size={14} fontWeight='bold'>
          {item?.title}
        </S.CardTitle>
      </S.Overlay>
    </S.Button>
  )

  return (
    <S.Container>
      <FlatList
        data={data}
        renderItem={_renderCard}
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToAlignment='center'
      />
    </S.Container>
  )
}
