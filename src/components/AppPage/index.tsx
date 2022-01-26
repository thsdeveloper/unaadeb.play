import React from 'react'


import * as S from './styles'

interface IAppPageProps {
  fit?: boolean
  children: React.ReactNode
  scroll?: boolean
  safeArea?: boolean
}

export const AppPage: React.FC<IAppPageProps> = ({
  fit = true,
  scroll = false,
  children,
  safeArea
}) => {

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
      {safeArea ? (
        <S.SafeAreaView>
          {renderContent()}
        </S.SafeAreaView>
      ) : renderContent()
      }
    </>
  )
}