import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SafeArea from '../../components/atoms/SafeArea'
import { AlertDialog, Button, Column, Image, Input, Row } from 'native-base';
import TextView from '../../components/atoms/Text';
import { ROUTES } from '../../constants';
import { sendOTP, verifyOTP } from '../../services/otp';
import { storeData } from '../../storage/auth';

const OtpScreen = (props: any) => {
  const { navigation, route } = props;
  const { params = {} } = route
  const [otpEntered, setOTPEntered] = useState('')
  const [error, setError] = useState('')
  const [showLoader, setShowLoader] = useState<string | boolean>(false)

  const onVerifyOTP = async () => {
    try {
      setShowLoader('VERIFY')
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


  const onSendOTP = async () => {
    try {
      setShowLoader('RESEND')
      setOTPEntered('')
      const res = await sendOTP(params.phoneNumber) as any
      setShowLoader(false)
    } catch (error) {
      setShowLoader(false)

    }
    finally {
      setShowLoader(false)
    }
  }

  return (
    <SafeArea>
      <Column style={{ height: '100%' }} justifyContent={'center'} padding={10}>

        <Row justifyContent={'center'} marginBottom={100}>
          <Column alignItems={'center'}>

            <Image
              source={require('../../assets/icons/logo.png')}
              style={{ width: 100, height: 100 }}
              alt={'logo'}
            />
            <TextView
              text={' Verify Your OTP'}
              style={{ fontSize: 20 }}

            />
          </Column>
        </Row>
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
        <Button marginTop={10} disabled={!otpEntered || showLoader === 'VERIFY'} onPress={onVerifyOTP} isLoading={showLoader === 'VERIFY'} >
          <TextView
            text={'Verify OTP'}
            color={'white'}
          />
        </Button>
        <Column marginTop={5} alignItems={'center'}>
          <Button onPress={onSendOTP} variant={'ghost'} isLoading={showLoader==='RESEND'} disabled={showLoader==='RESEND'}>
            <TextView
              text={'Resend OTP'}
              color={'blue'}

            />
          </Button>
          {/*   */}
        </Column>

      </Column>
    </SafeArea>
  )
}

export default OtpScreen