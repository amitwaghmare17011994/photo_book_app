import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';


export default function SafeArea(props: any) {
    const { children, style = {} } = props;


    return (
        <SafeAreaView style={{ flex: 1, ...style }}>

            <StatusBar
                backgroundColor={'black'}
                animated={true}
                translucent={true}

            />
            <View style={{ marginTop: 30 }}>
                {children}
            </View>
        </SafeAreaView>
    )
}