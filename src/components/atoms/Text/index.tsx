import { View, Text } from 'react-native'
import React from 'react'

const TextView = (props: any) => {
    const {text,color,style}=props;
    return (
        <Text style={{ color: color || 'black',fontSize: 16 , ...(props.style || {}) }}>{props.text}</Text>
    )
}

export default TextView