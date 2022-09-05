import { Button, Card, Column, Image, Input, Row, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import SafeArea from '../../components/atoms/SafeArea';
import TextView from '../../components/atoms/Text';
import DeviceInfo from 'react-native-device-info'
import { PermissionsAndroid } from 'react-native';
import PhoneNumberSelectionModal from './PhoneNumberSelectionModal';
import { sendOTP } from '../../services/otp';
import { ROUTES } from '../../constants';

const PhoneNumberValidationScreen = (props: any) => {
  const { navigation } = props;
  const [phoneNumbers, setPhoneNumbers] = useState<Array<string>>([])
  const [showModal, setShowModal] = useState<string | boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loader, setShowLoader] = useState(false)
  useEffect(() => {
    accessPhoneNumbers()
  }, [])
  const accessPhoneNumbers = async () => {
    try {

      const smsGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS);
      const phoneNumbersPermissionGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS);
      if (phoneNumbersPermissionGranted) {
        DeviceInfo.getPhoneNumber().then((phoneNumber) => {
          setPhoneNumbers([phoneNumber.split('91')[1]])
          if (showModal === false) {
            setShowModal(true)
          }

        });
      }
    } catch (err) {
    }

  }

  const onSendOTP = async () => {
    try {
      setShowLoader(true)
      const res = await sendOTP(phoneNumber) as any
      setShowLoader(false)

      if (res.otp) {
        navigation.navigate(ROUTES.OTP_SCREEN, { otp: res.otp,phoneNumber })
      }
    } catch (error) {

    }
    finally {
      setShowLoader(false)
    }
  }
  return (
    <SafeArea>
      <PhoneNumberSelectionModal
        isOpen={showModal === true}
        phoneNumber={phoneNumbers[0]}
        onAction={(phoneNumberToUse: string | null) => {
          setPhoneNumber(phoneNumberToUse || '')
          setShowModal(false)
        }}
      />

      <Column style={{ height: '100%' }} justifyContent={'center'}>
        <Row justifyContent={'center'} marginBottom={100}>
          <Column alignItems={'center'}>
            <Image
              source={require('../../assets/icons/logo.png')}
              style={{ width: 100, height: 100 }}
              alt={'logo'}
            />
            <TextView
              text={' Verify Your Phone Number'}
              style={{ fontSize: 20 }}

            /></Column>
        </Row>
        <Column padding={10}>
          {/* @ts-ignore */}
          <Input value={phoneNumber}
            placeholder={'Enter Phone Number'}
            style={{ fontSize: 19 }}
            onChangeText={(e) => {
              setPhoneNumber(e)
            }}
          />
          <Button style={{ marginTop: 10 }} onPress={onSendOTP} isLoading={loader}>
            <TextView
              text='Send OTP'
              color={'white'}
              style={{ fontSize: 16 }}
            />
          </Button>
        </Column>
      </Column>
    </SafeArea>
  )
}

export default PhoneNumberValidationScreen