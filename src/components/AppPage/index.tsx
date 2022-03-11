import React, { useEffect, useMemo, useRef } from 'react'
import { StatusBar, Platform, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useTheme } from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { BottomSheetModal, BottomSheetProps } from '@gorhom/bottom-sheet'

import { Snackbar, CustomBackdrop, Modal, Dialog } from '~/components'
import { ModalProps } from '~/components/Modal'
import { IButtonProps } from '~/components/Button'
import { ISnackbarProps } from '~/components/Snackbar'
import { IDialogProps } from '~/components/Dialog'

import * as S from './styles'

interface IheaderProps {
  title: string
  subtitle?: string
  onBackPress?: () => void
  children?: React.ReactNode
}

interface BottomSheetItemProps extends BottomSheetProps {
  visible?: boolean
  onDismiss?: () => void
}

interface FooterButtonProps {
  onPress?: () => void
  buttonProps?: IButtonProps
}
interface IAppPageProps {
  fit?: boolean
  children: React.ReactNode
  scroll?: boolean
  scrolType?: 'scrollview' | 'flatlist'
  safeArea?: boolean
  loading?: boolean
  header?: IheaderProps
  keyboardAvoidingView?: boolean
  snackbar?: ISnackbarProps
  bottomSheet?: BottomSheetItemProps
  footerButton?: FooterButtonProps
  modal?: ModalProps
  dialog?: IDialogProps
}

export const AppPage: React.FC<IAppPageProps> = ({
  fit = true,
  scroll = false,
  scrolType = 'scrollview',
  children,
  safeArea,
  loading,
  header,
  keyboardAvoidingView,
  snackbar,
  bottomSheet,
  footerButton,
  modal,
  dialog,
}) => {
  const theme = useTheme()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight : getStatusBarHeight()

  useEffect(() => {
    if (bottomSheet && bottomSheet?.visible && bottomSheetModalRef?.current) {
      bottomSheetModalRef.current.present()
    }
  }, [bottomSheet, bottomSheetModalRef?.current])

  const renderLoading = () => (
    <S.LoadingContainer style={StyleSheet.absoluteFill}>
      <S.LoadingView>
        <S.Loading />
      </S.LoadingView>
    </S.LoadingContainer>
  )

  const renderFooterButton = () => (
    <S.FooterButtonView>
      <S.FooterButton {...footerButton?.buttonProps} />
    </S.FooterButtonView>
  )

  const renderContent = () => (
    <>
      {scroll ? (
        <>
          {scrolType === 'scrollview' ? (
            <S.ScrollContainer>
              <S.Container fit={fit} children={children} />
            </S.ScrollContainer>
          ) : (
            <S.FlatListView
              data={[]}
              keyExtractor={(_item: any, index: number) => index.toString()}
              initialNumToRender={1}
              renderItem={null}
              ListHeaderComponent={<>{children}</>}
              keyboardShouldPersistTaps='always'
              showsVerticalScrollIndicator={false}
              fit={fit}
            />
          )}

          {footerButton && renderFooterButton()}
        </>
      ) : (
        <>
          <S.Container fit={fit} children={children} />
          {footerButton && renderFooterButton()}
        </>
      )}
    </>
  )

  const renderHeader = useMemo(
    () =>
      header && (
        <Appbar.Header
          style={{ backgroundColor: theme.colors.blueLight, paddingBottom: 10 }}
          statusBarHeight={statusBarHeight}
        >
          <Appbar.BackAction onPress={header.onBackPress} />
          <Appbar.Content
            title={header.title}
            subtitle={header?.subtitle}
            titleStyle={{ fontWeight: '700', fontSize: 20 }}
          />
          {header?.children}
        </Appbar.Header>
      ),
    [header, theme.colors.blueLight, statusBarHeight],
  )

  const renderBodyContent = useMemo(
    () =>
      safeArea ? (
        <S.SafeAreaView>{renderContent()}</S.SafeAreaView>
      ) : (
        renderContent()
      ),
    [safeArea, renderContent],
  )

  const renderBottomSheet = () =>
    bottomSheet && (
      <BottomSheetModal
        {...bottomSheet}
        ref={bottomSheetModalRef}
        backgroundStyle={{ backgroundColor: theme.colors.light }}
        backdropComponent={CustomBackdrop}
      />
    )

  if (keyboardAvoidingView) {
    return (
      <S.KeyboardView>
        {renderHeader}
        {renderBodyContent}
        {modal && <Modal {...modal} />}
        {dialog && <Dialog {...dialog} />}
        {renderBottomSheet()}
        {loading && renderLoading()}
      </S.KeyboardView>
    )
  }

  return (
    <>
      {renderHeader}
      {renderBodyContent}
      {snackbar && <Snackbar {...snackbar} />}
      {modal && <Modal {...modal} />}
      {dialog && <Dialog {...dialog} />}
      {renderBottomSheet()}
      {loading && renderLoading()}
    </>
  )
}
