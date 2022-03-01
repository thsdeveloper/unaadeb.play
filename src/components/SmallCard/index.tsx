import React from 'react'
import { ImageSourcePropType, ViewStyle, ScrollView } from 'react-native'

import * as S from './styles'

interface ICardDataProps extends ViewStyle {
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
  ...props
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
        <S.CardTitle size={16} fontWeight='bold'>
          {item?.title}
        </S.CardTitle>
      </S.Overlay>
    </S.Button>
  )

  return (
    <S.Container {...props}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data &&
          data.map((item, index) => (
            <S.Button key={index} onPress={item?.onPress}>
              <S.Overlay fit={fit}>
                <S.CardImage source={item?.image} />
                <S.CardTitle size={18} fontWeight='bold'>
                  {item?.title}
                </S.CardTitle>
              </S.Overlay>
            </S.Button>
          ))}
      </ScrollView>
    </S.Container>
  )
}
