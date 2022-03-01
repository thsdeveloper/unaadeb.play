import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useTheme } from 'styled-components/native'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'

import { AppPage, Avatar, Button, BottomSheetList } from '~/components'
import { useAuth } from '~/contexts/auth'
import { User } from '~/services/auth'

import * as S from './styles'

const noImage = require('../../../assets/images/no-photo.png')

interface IProps {
  navigation: any
}

interface PickedFieldProps {
  [key: string]: string
}

interface UserAuth {
  password?: string
  confirmPassword?: string
}

const Profile: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const theme = useTheme()
  const { user } = useAuth()
  const { dismiss } = useBottomSheetModal()

  const [userProfile, setUserProfile] = useState<(User & UserAuth) | null>(null)
  const [fieldsSelected, setFieldsSelected] = useState<PickedFieldProps>({})
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

  useEffect(() => {
    user && setUserProfile(user)
  }, [user])

  const setValueFields = (name: string, value: string) => {
    setFieldsSelected((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const handlePressSave = () => {
    console.log(fieldsSelected)
  }

  const snapPoints = useMemo(() => ['50%'], [])

  const sectorsData = useMemo(() => {
    const items: string[] = []
    for (let i = 1; i <= 29; i++) {
      items.push(`Setor ${i}`)
    }
    return items
  }, [])

  const RenderLabel = ({ title }: { title: string }): JSX.Element => (
    <S.LabelView>
      <S.InputLabel size={14}>{title}</S.InputLabel>
    </S.LabelView>
  )

  return (
    <AppPage
      fit
      scroll
      safeArea
      keyboardAvoidingView
      header={{
        title: 'Perfil',
        onBackPress: () => navigation.pop(),
      }}
      bottomSheet={{
        visible: bottomSheetVisible,
        onDismiss: () => setBottomSheetVisible(false),
        snapPoints: snapPoints,
        children: (
          <>
            <BottomSheetList
              data={sectorsData}
              icon='location'
              title='Selecione o setor congregacional'
              onItemPress={(item) => {
                setValueFields('sector', item)
                setBottomSheetVisible(false)
                dismiss()
              }}
            />
          </>
        ),
      }}
    >
      <S.Container>
        <S.AvatarView>
          <Avatar.Image
            source={
              !userProfile?.photo?.length
                ? noImage
                : { uri: userProfile?.photo }
            }
            size={120}
            type='circle'
          />
          <S.ButtonEditImage text='Editar imagem' />
        </S.AvatarView>
        <S.Input
          label={<RenderLabel title={'Email'} />}
          valueIsControlled
          valueControlled={userProfile?.email}
          rightIconColor={theme.colors.secondary}
          disabled
        />
        <S.Input
          label={<RenderLabel title={'Nome'} />}
          placeholder='Nome'
          rightIcon={!fieldsSelected?.name ? 'pencil' : null}
          valueIsControlled
          onChangeText={(e: any) =>
            fieldsSelected?.name && setValueFields('name', e)
          }
          valueControlled={
            !fieldsSelected?.name ? userProfile?.name : fieldsSelected.name
          }
          rightIconColor={theme.colors.secondary}
          rightIconPress={() => setValueFields('name', userProfile?.name || '')}
          disabled={!fieldsSelected?.name}
          mode={fieldsSelected?.name ? 'outlined' : 'flat'}
        />
        <S.Input
          label={<RenderLabel title={'Telefone'} />}
          valueIsControlled
          valueControlled={
            !fieldsSelected?.phone ? userProfile?.phone : fieldsSelected?.phone
          }
          rightIcon={!fieldsSelected.hasOwnProperty('phone') && 'pencil'}
          type='phone'
          keyboardType='phone-pad'
          rightIconColor={theme.colors.secondary}
          rightIconPress={() =>
            setValueFields('phone', userProfile?.phone || '')
          }
          mode={fieldsSelected.hasOwnProperty('phone') ? 'outlined' : 'flat'}
          disabled={!fieldsSelected.hasOwnProperty('phone')}
        />
        <S.Input
          label={<RenderLabel title={'Data de Nascimento'} />}
          valueIsControlled
          valueControlled={
            !fieldsSelected?.birthDate
              ? userProfile?.birthDate
              : fieldsSelected?.birthDate
          }
          rightIcon={!fieldsSelected.hasOwnProperty('birthDate') && 'pencil'}
          type='date'
          rightIconColor={theme.colors.secondary}
          rightIconPress={() =>
            setValueFields('birthDate', userProfile?.birthDate || '')
          }
          mode={
            fieldsSelected.hasOwnProperty('birthDate') ? 'outlined' : 'flat'
          }
          disabled={!fieldsSelected.hasOwnProperty('birthDate')}
        />
        <S.Input
          label={<RenderLabel title={'Setor'} />}
          valueIsControlled
          valueControlled={
            !fieldsSelected?.sector
              ? userProfile?.sector
              : fieldsSelected?.sector
          }
          rightIcon={
            !fieldsSelected.hasOwnProperty('sector') ? 'pencil' : 'chevron-down'
          }
          rightIconColor={theme.colors.secondary}
          editable={false}
          mode={fieldsSelected.hasOwnProperty('sector') ? 'outlined' : 'flat'}
          rightIconPress={() =>
            !fieldsSelected.hasOwnProperty('sector')
              ? setValueFields('sector', userProfile?.sector || '')
              : setBottomSheetVisible(true)
          }
          disabled={!fieldsSelected.hasOwnProperty('sector')}
        />
        {userProfile?.userType === 'firebase' && (
          <>
            <S.Input
              label={<RenderLabel title={'Senha'} />}
              valueIsControlled
              rightIcon='pencil'
              type='password'
              autoCapitalize='none'
              valueControlled={fieldsSelected.password}
              rightIconPress={() => setValueFields('password', '')}
              rightIconColor={theme.colors.secondary}
              mode={
                fieldsSelected.hasOwnProperty('password') ? 'outlined' : 'flat'
              }
              disabled={!fieldsSelected.hasOwnProperty('password')}
              onChangeText={(e: any) => setValueFields('password', e)}
            />
            <S.Input
              label={<RenderLabel title={'Confirmar Senha'} />}
              valueIsControlled
              type='password'
              autoCapitalize='none'
              rightIconColor={theme.colors.secondary}
              mode={
                fieldsSelected.hasOwnProperty('password') ? 'outlined' : 'flat'
              }
              disabled={!fieldsSelected.hasOwnProperty('password')}
            />
          </>
        )}

        <S.SubmitButtonView>
          <Button
            text='Atualizar perfil'
            mode='contained'
            style={{ width: '100%' }}
            onPress={handlePressSave}
            disabled={!Object.keys(fieldsSelected).length}
          />
        </S.SubmitButtonView>
      </S.Container>
    </AppPage>
  )
}

export default Profile
