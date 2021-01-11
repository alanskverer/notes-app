import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Nav(props) {

    useEffect(() => {

        getData()
    }, [])


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Categories')
            jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log(jsonValue);
        } catch (e) {
            // error reading value
        }
    }


    let { userName } = props.route.params
    return (
        <View>
            <Text>Hello {userName}</Text>
        </View>
    )
}
