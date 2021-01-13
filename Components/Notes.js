import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, TextInput, TouchableOpacity } from 'react-native'
import { ListItem, Icon, Badge, Button, Overlay, Input, Card } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';



const Notes = (props) => {

    const [data, setData] = useState([])





    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [cameraOn]);



    _takePhoto = async () => {
        const photo = await ref.current.takePictureAsync();
        try {
            setSelectedImage({ localUri: photo.uri });
            setImageHasSelected(true)
            setCameraOn(false);
            console.debug(photo)
        } catch (error) {

        }

    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }







    useEffect(() => {
        if (data.length == 0) {
            getData();
        }
        else {
            setDataNotes();
        }


    }, [data, imageHasSelected])



    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Categories')
            jsonValue != null ? JSON.parse(jsonValue) : null;
            const obj = JSON.parse(jsonValue);
            setData(obj);

        } catch (e) {
        }
    }
    let { categoryName } = props.route.params




    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const ref = useRef(null)


    const [notesArray, setNotesArray] = useState([])


    const [visible, setVisible] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageHasSelected, setImageHasSelected] = useState(false);
    const [cameraOn, setCameraOn] = useState(false);

    const addNote = () => {

        toggleOverlay();
    }

    const setDataNotes = () => {

        data.forEach((item) => {
            if (item.categoryName === categoryName) {
                setNotesArray([...item.notes])
            }
        })
    }

    const addNoteHandler = () => {
        let imageToAdd = selectedImage == null ? 'https://i.pinimg.com/originals/bf/c2/67/bfc267127a451c7ad3f64b79db279af2.jpg'
            : selectedImage.localUri;
        let newNote = {
            NoteDate: getCurrentDate(),
            NoteText: noteText,
            //NoteImage: selectedImage.localUri
            NoteImage: imageToAdd
        }
        let notesArr = [...notesArray, newNote];


        data.forEach((item) => {
            if (item.categoryName === categoryName) {
                item.notes = notesArr

            }
        })
        storeData(data)
        setNotesArray(notesArr);
        setSelectedImage(null);
        setImageHasSelected(false)
        setNoteText('');
        toggleOverlay();
    }


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('Categories', jsonValue)
        } catch (e) {
        }
    }


    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const showDeleteAlert = (index) => {
        Alert.alert(
            "Are you sure you want to delete?",
            "This action can't be undone!",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => removeNote(index) }
            ],
            { cancelable: false }
        );
    }

    const removeNote = (index) => {
        var notesArr = [...notesArray];
        if (index >= 0) {
            notesArr.splice(index, 1);
            setNotesArray(notesArr);



            data.forEach((item) => {
                if (item.categoryName === categoryName) {
                    item.notes = notesArr


                }
            })
            storeData(data)



        }
        else {
            Alert.alert("An error has occured: " + index);
        }
    };

    let openImagePickerAsync = async () => {
        //let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
        setImageHasSelected(true);
    };

    const openCameraAsync = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');

    }





    let selectImageContent = imageHasSelected == false ?
        <View>
            <View>
                <Button

                    icon={<Icon name='photo' color='#ffffff' />}
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 30, marginTop: 10 }}
                    title='Select Image From Gallery'
                    onPress={() => {

                        openImagePickerAsync()



                    }} />

            </View>

            <View>
                <Button

                    icon={<Icon name='camera' color='#ffffff' />}
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 30, marginTop: 10 }}
                    title='Take A Picture'
                    onPress={() => {
                        setCameraOn(true)
                        _takePhoto()





                    }} />


            </View>


        </View>

        : <Image
            source={{ uri: selectedImage.localUri }}
            style={{ width: 80, height: 80, marginVertical: 20 }} />



    let cam = cameraOn == false ? null :
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} ref={ref}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row'
                    }}>


                    <TouchableOpacity
                        style={{
                            flex: 0.5,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={{ fontSize: 13, marginBottom: 10, color: 'white' }}> Flip </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={_takePhoto}
                    >

                        <Text style={{ fontSize: 24 }}>Snap Photo</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>


    return (

        <ScrollView>





            <View style={{ marginVertical: 30, alignItems: 'center' }} >
                <Text style={styles.header}> {categoryName}</Text>
            </View>

            <View style={styles.buttonContainer}>




                <Button
                    onPress={() => addNote()}
                    title="Add New Note"
                    type="outline"
                />
            </View>

            <View style={styles.container} >
                {
                    notesArray.map((item, i) => (


                        <Card key={i}>
                            <Card.Title>NOTE FROM {item.NoteDate}</Card.Title>
                            <Card.Divider />

                            <Text style={{ marginBottom: 10 }}>
                                {item.NoteText}
                            </Text>
                            <Image
                                source={{ uri: item.NoteImage }}
                                style={{ width: 200, height: 200 }} />
                            <Button
                                icon={<Icon name='delete' color='#ffffff' />}
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                title='Delete'
                                onPress={() => showDeleteAlert(i)} />


                        </Card>
                    ))
                }

            </View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View>
                    <Text>Please add a note with text:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setNoteText(text)}
                        placeholder='Note text'
                        multiline={true}
                        textAlignVertical="top"
                    />
                    {selectImageContent}
                    {cam}


                    <Button
                        onPress={() => addNoteHandler()}
                        title="Add Note"
                        type="outline"
                    />

                </View>

            </Overlay>

        </ScrollView>


    )

}

const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var hour = new Date().getHours();
    if (hour < 10) hour = "0" + hour;
    var minutes = new Date().getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    var seconds = new Date().getSeconds();
    if (seconds < 10) seconds = "0" + seconds;

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '/' + month + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds;//format: dd-mm-yyyy;
}

const styles = StyleSheet.create({
    t: {
        color: "blue"

    },
    container: {
        marginVertical: 20,

    },
    header: {
        fontSize: 34

    },
    listItem: {
        padding: 10,
        marginStart: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        //alignItems: 'flex-end',
        marginTop: -15,
        width: 400,

    },
    textInput: {
        margin: 12,
        width: 320,
        borderBottomWidth: 1,
    },

})


export default Notes
