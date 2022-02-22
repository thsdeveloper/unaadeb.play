import React from 'react'
import { useWindowDimensions, View, ViewProps } from 'react-native'
import RenderHtml, {
  HTMLSource,
  MixedStyleDeclaration,
} from 'react-native-render-html'

interface IProps extends ViewProps {
  html: HTMLSource
}

const tagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
  body: {
    color: '#DDE3F0',
    fontSize: 16,
    lineHeight: 24,
    whiteSpace: 'normal',
  },
  a: {
    color: '#E51C44',
  },
  p: {
    marginBottom: 10,
    marginTop: 0,
  },
}

export const Html: React.FC<IProps> = ({ html, ...props }): JSX.Element => {
  const { width } = useWindowDimensions()

  return (
    <View {...props}>
      <RenderHtml contentWidth={width} source={html} tagsStyles={tagsStyles} />
    </View>
  )
}
