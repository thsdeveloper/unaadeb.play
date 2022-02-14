import React, { useMemo } from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  AnimateStyle,
} from 'react-native-reanimated'
import {
  useBottomSheetModal,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'

export const CustomBackdrop: React.FunctionComponent<
  BottomSheetBackdropProps
> = ({ style }) => {
  const { dismissAll } = useBottomSheetModal()

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(100, [0, 0.5], [0, 0.5], Extrapolate.CLAMP),
  }))

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: '#0E1647',
        opacity: 0.5,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  )

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
        }}
        onPress={dismissAll}
      />
    </Animated.View>
  )
}
