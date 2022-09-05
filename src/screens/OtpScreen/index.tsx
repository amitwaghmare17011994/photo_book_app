import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SafeArea from '../../components/atoms/SafeArea'
import { AlertDialog, Button, Column, Input } from 'native-base';
import TextView from '../../components/atoms/Text';
import { ROUTES } from '../../constants';
import { verifyOTP } from '../../services/otp';
import { storeData } from '../../storage/auth';

const OtpScreen = (props: any) => {
  const { navigation, route } = props;
  const { params = {} } = route
  const [otpEntered, setOTPEntered] = useState('')
  const [error, setError] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  const onVerifyOTP = async () => {
    try {
      setShowLoader(true)
      const isVerified = await verifyOTP(params.phoneNumber, parseInt(otpEntered))
      setShowLoader(false)
      if (isVerified) {
       await storeData('auth', { phoneNumber: params.phoneNumber })
        navigation.replace(ROUTES.HOME_SCREEN)
        return
      }
      throw 'Wrong OTP entered'
    } catch (error) {
      setError('Wrong OTP entered')
      setShowLoader(false)
    } finally {
      setShowLoader(false)
    }
  }

  return (
    <SafeArea>
      <Column style={{ height: '100%' }} justifyContent={'center'} padding={10}>
        <Input
          placeholder='Enter OTP'
          value={otpEntered}
          onChangeText={(e) => {
            setOTPEntered(e)
          }}
          style={{ fontSize: 16 }}
        />
        {!!error && <TextView
          text={error}
          color={'red'}
        />
        }
        <Button marginTop={10} disabled={!otpEntered || showLoader} onPress={onVerifyOTP} isLoading={showLoader} >
          <TextView
            text={'Verify OTP'}
            color={'white'}
          />
        </Button>

      </Column>
    </SafeArea>
  )
}

export default OtpScreen