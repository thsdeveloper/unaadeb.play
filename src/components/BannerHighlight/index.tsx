import React from 'react'
import { ViewStyle, StyleProp, ImageSourcePropType } from 'react-native'
import Swiper from 'react-native-swiper'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

export interface BannerItensProps {
  image: ImageSourcePropType
  onPress?: () => void
}

interface IProps {
  style?: StyleProp<ViewStyle>
  itens: BannerItensProps[]
}

export const BannerHighlight: React.FC<IProps> = ({
  style,
  itens,
}): JSX.Element => {
  const theme = useTheme()

  return (
    <S.Container style={style}>
      <Swiper
        dotColor={theme.colors.light}
        activeDotColor={theme.colors.secondary}
      >
        {itens.map((item, key) => (
          <S.SliderView key={key}>
            <S.BannerButton onPress={item.onPress}>
              <S.BannerImage source={item.image} />
            </S.BannerButton>
          </S.SliderView>
        ))}
      </Swiper>
    </S.Container>
  )
}
