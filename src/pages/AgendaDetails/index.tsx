import React from 'react'
import { AppPage } from '~/components'

import * as S from './styles'

interface IProps {
  navigation: any
}

const AgendaDetails: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const data = {
    date: '05 de Março de 2022 - Sábado',
    image:
      'https://firebasestorage.googleapis.com/v0/b/unaadeb-a6c93.appspot.com/o/news_1.png?alt=media&token=c64af2e4-6d83-4604-adbc-efec9557329d',
    title: 'Reunião de liderança',
    subtitle: 'Auditório da UFSCar',
    shortDescription: 'Reunião de liderança',
    longDescription: 'Reunião de liderança',
    address: 'ADEB Riacho Fundo Setor 11',
    geolocation: '',
  }

  return (
    <AppPage
      fit={false}
      scroll
      safeArea
      header={{
        title: '05 de Março de 2022',
        onBackPress: () => navigation.pop(),
      }}
    >
      <S.Container>
        <S.ContainerHeader>
          {data?.image && (
            <S.AgendaBackground
              source={{
                uri: data?.image,
              }}
            />
          )}
          <S.HeaderTextContainer>
            {data?.title && <S.AgendaTitle>{data?.title}</S.AgendaTitle>}
            {data?.subtitle && (
              <S.AgendaSubTitle>{data?.subtitle}</S.AgendaSubTitle>
            )}
          </S.HeaderTextContainer>
        </S.ContainerHeader>
        <S.ContainerBody>
          {data?.date && <S.Title>Dia, horário e local</S.Title>}
          <S.PrimaryTitle>{`06/03 as 14h`}</S.PrimaryTitle>
          {data?.address && <S.Title>{`Local: ${data?.address}`}</S.Title>}
        </S.ContainerBody>
      </S.Container>
    </AppPage>
  )
}

export default AgendaDetails
