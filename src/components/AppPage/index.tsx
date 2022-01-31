import React from 'react'

import { Appbar } from 'react-native-paper'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

interface IheaderProps {
  title: string
  subtitle?: string
  onBackPress?: () => void
  children?: React.ReactNode
}
interface IAppPageProps {
  fit?: boolean
  children: React.ReactNode
  scroll?: boolean
  safeArea?: boolean
  loading?: boolean
  header?: IheaderProps
}

export const AppPage: React.FC<IAppPageProps> = ({
  fit = true,
  scroll = false,
  children,
  safeArea,
  loading,
  header
}) => {

  const theme = useTheme()

  if (loading) {
    return (
      <S.LoadingView>
        <S.Loading />
      </S.LoadingView>
    )
  }

  const renderContent = () => (
    <>
      {scroll ? (
        <S.ScrollContainer>
           <S.Container fit={fit} children={children} />
        </S.ScrollContainer>
      ) : (
        <S.Container fit={fit} children={children} />
      )}
    </>
  )

  return (
    <>
      {header && (
        <Appbar.Header style={{backgroundColor: theme.colors.blueLight}}>
          <Appbar.BackAction onPress={header.onBackPress} />
          <Appbar.Content title={header.title} subtitle={header?.subtitle} titleStyle={{fontWeight: 'bold', fontSize: 20}} />
          {header?.children}
        </Appbar.Header>
      )}
      {safeArea ? (
        <S.SafeAreaView>
          {renderContent()}
        </S.SafeAreaView>
      ) : renderContent()
      }
    </>
  )
}