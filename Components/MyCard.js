import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'



const users = [
  {
    name: 'alan',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
  {
    name: 'alan',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  }, {
    name: 'alan',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  }
  // more users here
]

export default class MyCard extends Component {


  render() {
    return (
      <View>


        <Card>
          <Card.Title>CARD WITH DIVIDER</Card.Title>
          <Card.Divider />
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
    )
  }
}
