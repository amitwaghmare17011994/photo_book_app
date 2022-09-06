import React from 'react';
import { Text } from 'react-native';

const TextView = (props: any) => {
    const {text,color,style,onPress}=props;
    return (
        <Text onPress={onPress} style={{ color: color || 'black',fontSize: 16 , ...(props.style || {}) }}>{props.text}</Text>
    )
}

export default TextView