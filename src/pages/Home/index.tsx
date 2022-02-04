import React, { useMemo } from 'react'
import { Text } from 'react-native'
import { AppPage, Avatar, Button, ListItem } from '~/components'
import { useAuth } from '~/contexts/auth'

//import { Container } from './styles';

const Home: React.FC = () => {
  const { user } = useAuth()
  const { signOut } = useAuth()

  const renderAvatar = useMemo(() => {
    if (!user?.photo?.length) {
      const initials = user?.givenName
        ?.split(' ')
        ?.map((name) => name[0])
        ?.join('')
      return (
        <Avatar.Text
          label={initials || ' '}
          size={48}
          style={{ marginTop: 10, marginRight: 10 }}
        />
      )
    }
    return (
      <Avatar.Image
        size={50}
        source={{ uri: user?.photo }}
        style={{ marginTop: 10, marginRight: 10 }}
      />
    )
  }, [user?.photo])

  return (
    <AppPage scroll safeArea fit loading={false} style={{ paddingTop: 10 }}>
      {user && (
        <ListItem
          title={{ text: `Olá, ${user?.givenName || ''}`, size: 24 }}
          description={{ text: 'Hoje é dia de vitória' }}
          left={(_props) => renderAvatar}
        />
      )}
      <Text>Home page</Text>
      <Button text='Logout' mode='text' onPress={() => signOut()} />
    </AppPage>
  )
}

export default Home
