import React, {useEffect} from 'react';
import {View,Text, Image, TouchableOpacity} from 'react-native'
import MenuIcon from '../MenuIcon/MenuIcon' 
import {styles} from './MenuItemStyles'

const MenuItem = ({text, onPress, focused,iconSize, iconName }) =>{
  useEffect(() => {
    console.log(focused)  
}, [focused]);
  return(
      
          <TouchableOpacity
           onPress={onPress}
          >
            <View style={styles.container}>
              <MenuIcon 
               size={iconSize}
               name={iconName}            
              />
              <Text style={styles.text}>
                   {text}
              </Text>
            </View>
            
          </TouchableOpacity>
          
  )
}

export default MenuItem;

{/* <View style={styles.cont1}>
                <Ionicons
                   name="bulb-outline"
                   size={20}
                  //  color={focused ? '#7cc' : '#ccc'}
                />
                <Text style={styles.text}>
                 {text}
                </Text> 
              </View>
              <View style={styles.cont2}></View> */}