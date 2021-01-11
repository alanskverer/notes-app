import { StyleProvider } from 'native-base';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
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
                        <Card.Image source={{uri:item.NoteImage}}>
                            <Text style={{marginBottom: 10}}>
                            {item.NoteText}
                            </Text>
                            <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='EDIT' />
                        </Card.Image>
                        </Card>
                    ))
                }

            </View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View>
                    <Text>Please add note name</Text>
                    <Input
                        onChangeText={(text) => setNoteText(text)}
                        placeholder='Note Name'
                    />
                    <Button
                        onPress={() => addNoteHandler()}
                        title="Add"
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

})


export default Notes
