import Config from "react-native-config"
import { GoogleSignin } from '@react-native-google-signin/google-signin'

interface Response {
  idToken: string
  user: {
    name: string
    givenName: string
    email: string
    photo?: string
  }
}

export function signIn(): Promise<Response | null> {
  
  return new Promise((resolve) => {
    GoogleSignin.configure({             
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,    
    })
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      console.log(hasPlayService) 
      if (hasPlayService) {
           GoogleSignin.signIn().then((userInfo) => {
             console.log(userInfo)
              if(userInfo){
                const authInfo = userInfo as Response
                resolve({
                  idToken: authInfo?.idToken,
                  user: {
                    name: authInfo?.user?.name,
                    email: authInfo?.user?.email,
                    givenName: authInfo?.user?.givenName,
                    photo: authInfo?.user?.photo
                  },
                })     
              }else{
                resolve(null)
              }      
          }).catch((e) => { 
            console.log(e)            
            resolve(null)
          })        
      }
    }).catch((e) => {    
      console.log(e) 
      resolve(null)
    })
  })

}
