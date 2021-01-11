import { StyleProvider } from 'native-base';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, TextInput } from 'react-native'
import { ListItem, Icon, Badge, Button, Overlay, Input, Card } from 'react-native-elements'



const Notes = () => {

    const [notesArray, setNotes] = useState([])

    const [visible, setVisible] = useState(false);
    const [noteDate, setNoteDate] = useState('');
    const [noteText, setNoteText] = useState('');
    const [noteImage, setNoteImage] = useState('');

    const addNote = () => {
        toggleOverlay();
    }

    const addNoteHandler = () => {
        /*let newNote = {
            noteDate: noteDate,
            noteText: noteText,
            noteImage: noteImage
        }*/
        let newNote = {
            NoteDate: getCurrentDate(),
            NoteText: noteText,
            NoteImage: "https://i.pinimg.com/originals/2c/d5/2c/2cd52c2fffecc9b3b183bdd3d7799844.png"
        }
        let notesArr = [...notesArray, newNote];
        setNotes(notesArr);

        toggleOverlay();

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
            setNotes(notesArr);
        }
        else {
            Alert.alert("An error has occured: "+index);
        }
    };



    return (
        <ScrollView>
            <View style={{ marginVertical: 30, alignItems: 'center' }} >
                <Text style={styles.header}>Category Name Here</Text>
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
                        <Card.Divider/>
                        
                            <Text style={{marginBottom: 10}}>
                            {item.NoteText}
                            </Text>
                            <Image 
                                source={{uri:item.NoteImage}} 
                                style={{width: 200, height: 200}} />
                            <Button
                            icon={<Icon name='delete' color='#ffffff' />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
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
                    <Button
                            icon={<Icon name='camera' color='#ffffff' />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 30, marginTop: 10}}
                            title='Select Image'
                            onPress={() => null} />
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

const getCurrentDate=()=>{

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
        width:320,
        borderBottomWidth:1,
    },

})


export default Notes
