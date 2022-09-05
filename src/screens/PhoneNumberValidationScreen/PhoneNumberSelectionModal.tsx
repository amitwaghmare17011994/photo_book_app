import { View, Text } from 'react-native'
import React from 'react'
import { Button, Modal } from 'native-base'
import TextView from '../../components/atoms/Text';

const PhoneNumberSelectionModal = (props: any) => {
    const { isOpen, phoneNumber, onAction } = props;
    return (
        <Modal isOpen={isOpen}>
            <Modal.Content style={{ padding: 10 }}>
                <View>
                    <TextView
                        style={{ fontSize: 19 }}
                        text='Continue with '
                    />
                </View>
                <View  >
                    <TextView
                        text={phoneNumber}
                        style={{ fontSize: 25 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Button style={{ flex: 1 }} onPress={() => {
                        onAction(phoneNumber)
                    }}
                    >
                        <Text>Yes</Text>
                    </Button>

                    <Button style={{ flex: 1, marginLeft: 10 }}
                        onPress={() => {
                            onAction(null)
                        }}
                    >
                        <Text>No</Text>
                    </Button>


                </View>
            </Modal.Content>
        </Modal>
    )
}

export default PhoneNumberSelectionModal