import React, { useMemo } from 'react'
import { Platform, StatusBar, StyleProp, ViewStyle } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useTheme } from 'styled-components/native'
import { Snackbar } from '~/components'
import { ISnackbarProps } from '~/components/Snackbar'
import * as S from './styles'


interface IheaderProps {
  title: string
  subtitle?: string
  onBackPress?: () => void
  children?: React.ReactNode
}
interface IAppPageProps{
  fit?: boolean
  children: React.ReactNode
  scroll?: boolean
  safeArea?: boolean
  loading?: boolean
  header?: IheaderProps
  keyboardAvoidingView?: boolean
  snackbar?: ISnackbarProps
  style?: StyleProp<ViewStyle>
}

export const AppPage: React.FC<IAppPageProps> = ({
  fit = true,
  scroll = false,
  children,
  safeArea,
  loading,
  header,
  keyboardAvoidingView,
  snackbar,
  style
}) => {

  const theme = useTheme()

  const statusBarHeight = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

  const renderLoading = () => (
        <S.LoadingContainer>
          <S.LoadingView>
            <S.Loading />
          </S.LoadingView>
        </S.LoadingContainer>
      )

  const renderContent = () => (
    <>
      {scroll ? (
        <S.ScrollContainer style={style}>
           <S.Container fit={fit} children={children} />
        </S.ScrollContainer>
      ) : (
        <S.Container style={style} fit={fit} children={children} />
      )}
    </>
  )

  const renderHeader = useMemo(() => (header && (
    <Appbar.Header style={{backgroundColor: theme.colors.blueLight, paddingBottom: 10}} statusBarHeight={statusBarHeight}>
      <Appbar.BackAction onPress={header.onBackPress} />
      <Appbar.Content 
        title={header.title} 
        subtitle={header?.subtitle} 
        titleStyle={{fontWeight: 'bold', fontSize: 20}} 
      />
      {header?.children}
    </Appbar.Header>
  )), [header, theme.colors.blueLight, statusBarHeight])

  const renderBodyContent = useMemo(() => (safeArea ? (
    <S.SafeAreaView style={style}>
      {renderContent()}
    </S.SafeAreaView>
  ): renderContent()
  ), [safeArea, renderContent])

  if(keyboardAvoidingView) {
    return (
      <S.KeyboardView style={style}>
        {renderHeader}
        {renderBodyContent}
        {loading && renderLoading()}
      </S.KeyboardView>
    )
  }
  

  return (
    <>
      {renderHeader}
      {renderBodyContent}
      {snackbar && <Snackbar {...snackbar} />}
      {loading && renderLoading()}
    </>
  )
}