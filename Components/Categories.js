import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem, Icon, Badge, Button, Overlay, Input } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';




const Categories = (props) => {

  const [categoris, setCategoris] = useState([]);

  const [visible, setVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  //const [chosenCategoryName, setChosenCategoryName] = useState('');

  //AsyncStorage.clear() //For debugging purposes only. Resets app data


  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;


      const getData = async () => {

        try {
          // console.log("getting the")
          const jsonValue = await AsyncStorage.getItem('Categories')
          jsonValue != null ? JSON.parse(jsonValue) : null;
          //   console.log(JSON.parse(jsonValue));
          const obj = JSON.parse(jsonValue);
          setCategoris(obj);

        } catch (e) {
        }
      }

      getData();

      return () => {
        isActive = false;
      };
    }, [])
  );






  useEffect(() => {


    getData();
    //goToNotesPage();
  }, [])



  const getData = async () => {

    try {
      const jsonValue = await AsyncStorage.getItem('Categories')
      jsonValue != null ? JSON.parse(jsonValue) : null;
      //  console.log(JSON.parse(jsonValue));
      const obj = JSON.parse(jsonValue);
      setCategoris(obj);

    } catch (e) {
    }
  }

  const addCategory = () => {
    toggleOverlay();
  }

  const addCategoryHandler = () => {
    let newCategory = {
      categoryName: categoryName,
      notes: [


      ]
    }
    var categoryArr = [];
    if (categoris)
      categoryArr = [...categoris, newCategory];
    setCategoris(categoryArr);

    toggleOverlay();



  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const goToNotesPage = (categoryName) => {
    storeData(categoris, categoryName);
  };





  const storeData = async (value, categoryName) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('Categories', jsonValue)
      props.navigation.navigate('Notes', {
        categoryName: categoryName
      })
    } catch (e) {
    }
  }




  return (
    <View>
      <View style={{ marginVertical: 30, alignItems: 'center' }} >
        <Text style={styles.header}>My Notes</Text>
      </View>
      <View style={styles.buttonContainer}>

        <Button
          onPress={() => addCategory()}
          title="Add Note Category"
          type="outline"
        />


      </View>

      <View style={styles.container} >
        {
          categoris && categoris.map((item, i) => (
            <ListItem style={styles.listItem, { backgroundColor: 'white' }} key={i} bottomDivider onPress={() => {
              goToNotesPage(item.categoryName)

            }}>


              <ListItem.Content>
                <Badge value={item.notes.length} status="primary" />
                <ListItem.Title style={styles.t}>{item.categoryName}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron size={30} color="blue" />
            </ListItem>
          ))
        }

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
    backgroundColor: 'white'

  },
  header: {
    fontSize: 34

  },
  listItem: {
    padding: 10,
    marginStart: 10,
    backgroundColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 400,

  },

})

export default Categories
