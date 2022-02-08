import React from 'react';
import {View,Text, Image, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const MenuIcon = ({size,name,color}) =>{
  return(
    <Ionicons
    name={name}
    size={size}
   //  color={focused ? '#7cc' : '#ccc'}
    />
  )
}

export default MenuIcon;