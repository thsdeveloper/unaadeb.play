import React, {useEffect, useMemo} from 'react'
import { Text } from 'react-native'
import {AppPage , ListItem, Avatar, Button} from '~/components'
import { useAuth } from '~/contexts/auth'

//import { Container } from './styles';

const Home: React.FC = () => {
  const {user} = useAuth()
  const { signOut } = useAuth()



  const renderAvatar = useMemo(() => {
    console.log(user)
    if(!user?.photo?.length){
      const givenName = user?.givenName?.split(' ')[0]
      const initials = user?.givenName?.split(' ')?.map(name => name[0])?.join('')
      return <Avatar.Text label={initials || ' '} size={48} style={{marginTop: 10, marginRight: 10}} />
    }
    return <Avatar.Image size={50} source={{uri: user?.photo}} style={{marginTop: 10, marginRight: 10}}/>
  },[user?.photo])

  return (
    <AppPage scroll safeArea fit loading={false}>
      {user && (
        <ListItem 
          title={{text: `Olá, ${user?.givenName || ''}`, size: 24}} 
          description={{text: 'Hoje é dia de vitória'}} 
          left={(_props) => renderAvatar}
        />
      )}
      <Text>Home page</Text>
      <Button text="Logout" mode='text' onPress={() => signOut()} />
    </AppPage>
  )
}

export default Home;