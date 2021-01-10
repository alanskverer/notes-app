import React from 'react';
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'




const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  }
  // more users here
]

export default function App() {
  return (
    <View>
      <Card>
        <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider/>
        {
          users.map((u, i) => {
            return (
              <View key={i}>
                <Image
                  
                  resizeMode="cover"
                  source={{ uri: u.avatar }}
                />
                <Text >{u.name}</Text>
              </View>
            );
          })
        }
      </Card>
      <Card>
        <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider/>
        {
          users.map((u, i) => {
            return (
              <View key={i}>
                <Image
                  
                  resizeMode="cover"
                  source={{ uri: u.avatar }}
                />
                <Text >{u.name}</Text>
              </View>
            );
          })
        }
      </Card>
    </View>
  );
}