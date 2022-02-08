import React from 'react';
import {View,Text, Image, TouchableOpacity} from 'react-native'

const HeaderItem = (props) =>{
  return(
      <View style={{alignItems: 'center', marginTop: 30}}>
          <Text style={{ fontSize: 60, color: 'black'}}>
              IE
          </Text>
          
      </View>
  )
}

export default HeaderItem;