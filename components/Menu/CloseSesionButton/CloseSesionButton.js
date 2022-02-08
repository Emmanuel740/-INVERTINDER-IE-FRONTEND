import React from 'react';
import {View,Text, Image, TouchableOpacity} from 'react-native'
import {styles} from './CloseSesionButtonStyle'
const CloseSesionButton = ({onPress}) =>{
  return(
      <TouchableOpacity style={styles.container}
        onPress={onPress}
      >
          <Text>
              CERRAR SESIÓN
          </Text>
          
      </TouchableOpacity>
  )
}

export default CloseSesionButton;