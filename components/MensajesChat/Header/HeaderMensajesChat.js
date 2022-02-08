import React from 'react';
import {View,Text, Image, TouchableOpacity} from 'react-native'

const HeaderChat = (nombreDest) =>{
  return(
    <View style={styles.headerView}>
      <TouchableOpacity 
      style={styles.backButton}
    //   onPress={() => goBack() }
      >
        <Ionicons
         name={"arrow-back-outline"}
         size={30}
         />
      </TouchableOpacity>
      <View style={styles.NameDestView}>             
        <Text style = {styles.TextHeader}>
         {nombreDest}
        </Text>
      </View>
    
    </View>
  )
}

export default HeaderChat;