import { Image, useTheme } from 'native-base';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import SafeArea from '../../components/atoms/SafeArea';
import { ROUTES } from '../../constants';
import { retrieveData } from '../../storage/auth';



const SplashScreen = (props: any) => {
  const { navigation } = props;
  const theme = useTheme()
  useEffect(() => {
    (async () => {
      setTimeout(async() => {
        const auth=await retrieveData('auth')        
        navigation.navigate(auth? ROUTES.HOME_SCREEN:ROUTES.PHONE_VALIDATION_SCREEN)
      }, 1000)
    })()
  }, [])
  return (
    //@ts-ignore
    <SafeArea style={{ backgroundColor: theme.colors.purple.primary }}>
      <View style={{ height: '100%', justifyContent: 'center' }}>

        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <Image
            source={require('../../assets/icons/logo.png')}
            style={{ width: 100, height: 100 }}
            alt={'logo'}
          />
        </View>
      </View>


    </SafeArea>
  )
}

export default SplashScreen