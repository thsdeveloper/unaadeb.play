import Config from "react-native-config"
import { GoogleSignin, statusCodes,} from '@react-native-google-signin/google-signin'

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
  console.log(Config.GOOGLE_IOS_CLIENT_ID)
  return new Promise((resolve) => {
    GoogleSignin.configure({             
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,    
    })
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
           GoogleSignin.signIn().then((userInfo) => {
              console.log(JSON.stringify(userInfo))
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
            console.log("ERROR IS: " + JSON.stringify(e));
            resolve(null)
          })        
      }
    }).catch((e) => {    
      console.log("ERROR IS: " + JSON.stringify(e))
      resolve(null)
    })
  });
}
