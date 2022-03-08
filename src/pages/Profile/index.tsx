import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react'
import { useTheme } from 'styled-components/native'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import {
  Paragraph,
  Dialog,
  Portal,
  Button as NPButton,
} from 'react-native-paper'

import { AppPage, Avatar, Button, BottomSheetList } from '~/components'
import { useAuth } from '~/contexts/auth'
import { User, updatePassword } from '~/services/auth'
import { updateProfile } from '~/services/profile'
import AlertContext from '~/contexts/alert'

import * as S from './styles'

const noImage = require('../../../assets/images/no-photo.png')

interface IProps {
  navigation: any
}

interface PickedFieldProps {
  [key: string]: string
}

const Profile: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const theme = useTheme()
  const { user, updateUserState } = useAuth()
  const { dismiss } = useBottomSheetModal()
  const alert = useContext(AlertContext)

  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [fieldsSelected, setFieldsSelected] = useState<PickedFieldProps>({})
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)
  const [passDialogVisible, setPassDialogVisible] = useState<boolean>(false)

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

  const validateFields = (): boolean => {
    if (
      (fieldsSelected.hasOwnProperty('name') && fieldsSelected?.name === '') ||
      (fieldsSelected.hasOwnProperty('phone') &&
        fieldsSelected?.phone === '') ||
      (fieldsSelected.hasOwnProperty('birthDate') &&
        fieldsSelected?.birthDate === '')
    ) {
      return false
    }
    return true
  }

  const handlePressSave = useCallback(async () => {
    try {
      hideDialog()
      setIsLoading(true)
      const validate = validateFields()
      if (!validate) {
        throw new Error('Preencha todos os campos obrigatórios')
      }
      if (fieldsSelected && userProfile?.email) {
        await updateProfile(userProfile?.email, fieldsSelected)
        alert.success('Perfil atualizado com sucesso!')
        await afterChange()
        setFieldsSelected({})
        return
      }
      throw new Error('Não foi possível atualizar o perfil')
    } catch (_e: any) {
      const errorMsg =
        _e.message ||
        'Ocorreu uma falha ao atualizar o perfil, por favor tente novamente.'
      alert.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }, [fieldsSelected, userProfile?.email])

  const updatePasswordUser = useCallback(async () => {
    try {
      hidePassDialog()
      setIsLoading(true)
      if (userProfile?.email) {
        await updatePassword(userProfile?.email)
        alert.success(
          'Um email foi enviado para você com as instruções de recuperação de senha',
        )
        return
      }
      throw new Error('Error')
    } catch (_e: any) {
      alert.error('Falha ao atualizar a senha, por favor tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const afterChange = async () => await updateUserState()

  const snapPoints = useMemo(() => ['50%'], [])

  const sectorsData = useMemo(() => {
    const items: string[] = []
    for (let i = 1; i <= 29; i++) {
      items.push(`Setor ${i}`)
    }
    return items
  }, [])

  const RenderLabel = ({ title }: { title: string }): JSX.Element => (
    <S.InputLabel size={14}>{title}</S.InputLabel>
  )

  const hideDialog = () => setDialogVisible(false)

  const renderDialogContent = () => (
    <Portal>
      <Dialog visible={dialogVisible} onDismiss={hideDialog}>
        <Dialog.Title>Confirmação dos dados</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Confirma a atualização dos dados em seu perfil?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <NPButton mode='text' onPress={hideDialog}>
            Cancelar
          </NPButton>
          <NPButton mode='text' onPress={handlePressSave}>
            OK
          </NPButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )

  const hidePassDialog = () => setPassDialogVisible(false)

  const renderDialogResetPassword = () => (
    <Portal>
      <Dialog visible={passDialogVisible} onDismiss={hidePassDialog}>
        <Dialog.Title>Redefinição de senha</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Uma mensagem com instruções de redefinição senha será será enviada
            ao seu email de cadastro no UnaadebPlay
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <NPButton mode='text' onPress={hidePassDialog}>
            Cancelar
          </NPButton>
          <NPButton mode='text' onPress={updatePasswordUser}>
            OK entendi!
          </NPButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )

  return (
    <AppPage
      fit
      scroll
      safeArea
      keyboardAvoidingView
      loading={isLoading}
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
          label={'Email'}
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
          onChangeText={(e: any) => setValueFields('name', e)}
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
          onChangeText={(e: any) => setValueFields('phone', e)}
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
          onChangeText={(e: any) => setValueFields('birthDate', e)}
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
            <Button
              text='Redefinir Senha'
              mode='outlined'
              style={{ width: '100%' }}
              onPress={() => setPassDialogVisible(true)}
            />
          </>
        )}

        <S.SubmitButtonView>
          <Button
            text='Atualizar perfil'
            mode='contained'
            style={{ width: '100%' }}
            onPress={() => setDialogVisible(true)}
            disabled={!Object.keys(fieldsSelected).length}
          />
        </S.SubmitButtonView>
        {renderDialogContent()}
        {renderDialogResetPassword()}
      </S.Container>
    </AppPage>
  )
}

export default Profile
