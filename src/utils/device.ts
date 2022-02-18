import DeviceInfo from 'react-native-device-info'

export const getDeviceInfo = async () =>
  DeviceInfo.getDeviceName().then((deviceName) => {
    return deviceName
  })
