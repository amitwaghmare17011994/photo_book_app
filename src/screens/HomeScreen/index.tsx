import { Column, Divider, Image, Row } from 'native-base';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import SafeArea from '../../components/atoms/SafeArea';
import TextView from '../../components/atoms/Text';
import { ROUTES } from '../../constants';

const HomeScreen = (props: any) => {
  const onCreateOrder=()=>{
    props.navigation.navigate(ROUTES.NEW_ORDER_SCREEN)
  }
  return (
    <SafeArea>

      <Row height={140} paddingLeft={3} alignItems={'center'}>
        <Button title='Create Order' onPress={onCreateOrder} />
      </Row>
      <Divider />

      <Column alignItems={'center'} top={'40%'}>
        <Image
          source={require('../../assets/images/emptyOrders.png')}
          alt={'logo'}
        />
        <TextView
          text={`You haven't created an order yet`}
          style={{ fontSize: 16, marginTop: 20 }}
        />
        <TextView
          text={'Create a new order'}
          style={{
            fontSize: 20,
            marginTop: 20,
            borderBottomWidth: 1,
            borderColor: "blue",
          }}
          color={'blue'}
          onPress={onCreateOrder}
        />
      </Column>
 

    </SafeArea>
  )
}


const style = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10
  }
});


export default HomeScreen