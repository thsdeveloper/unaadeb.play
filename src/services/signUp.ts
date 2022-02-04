import firestore from '@react-native-firebase/firestore'

interface CustomerProps {
  name?: string
  email?: string
  phone?: string
  birthDate?: string
  parentName?: string
  parentCPF?: string
}

export function subscription(customer: CustomerProps): Promise<boolean>{
  return new Promise((resolve) => {
    firestore()
      .collection('customers')
      .doc(customer?.email)
      .set(customer)
      .then(() => {
        resolve(true)
      })
      .catch((_error) => {
        resolve(false)
      })
  })
}