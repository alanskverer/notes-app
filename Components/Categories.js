import { StyleProvider } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Icon, Badge, Button, Overlay, Input } from 'react-native-elements'



const Categories = () => {

    const [categoris, setCategoris] = useState([]);

    const [visible, setVisible] = useState(false);
    const [categoryName, setCategoryName] = useState('');




    const addCategory = () => {
        toggleOverlay();
    }

    const addCategoryHandler = () => {
        let newCategory = {
            categoryName: categoryName,
            notes: [


            ]
        }
        let categoryArr = [...categoris, newCategory];
        setCategoris(categoryArr);

        toggleOverlay();



    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };




    return (
        <View>
            <View style={{ marginVertical: 30, alignItems: 'center' }} >
                <Text style={styles.header}>My Notes</Text>
            </View>

            <View style={styles.container} >
                {
                    categoris.map((item, i) => (
                        <ListItem style={styles.listItem} key={i} bottomDivider>

                            <ListItem.Content>
                                <Badge value={item.notes.length} status="primary" />
                                <ListItem.Title style={styles.t}>{item.categoryName}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron size={30} color="blue" />
                        </ListItem>
                    ))
                }

            </View>
            <View style={styles.buttonContainer}>

                <Button
                    onPress={() => addCategory()}
                    title="Add Note Category"
                    type="outline"
                />
            </View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View>
                    <Text>Please add category name</Text>
                    <Input
                        onChangeText={(text) => setCategoryName(text)}
                        placeholder='Category Name'
                    />
                    <Button
                        onPress={() => addCategoryHandler()}
                        title="Add"
                        type="outline"
                    />

                </View>

            </Overlay>

        </View>
    )



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
        marginTop: 200,
        width: 400,

    },

})

export default Categories
