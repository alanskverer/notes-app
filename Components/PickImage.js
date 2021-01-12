import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PickImage(props) {
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
    }

    return (
        <View >
            <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} />
            <Text >
                To share a photo from your phone with a friend, just press the button below!
      </Text>

            <TouchableOpacity onPress={openImagePickerAsync} >
                <Text >Pick a photo</Text>
            </TouchableOpacity>
        </View>
    );
}