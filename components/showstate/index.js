import React, { useContext } from 'react';
import { AppContext } from '../application/provider';
import {View,Text} from 'react-native'

export default () => {
  const [state, setState] = useContext(AppContext);
  return (
    <View>
        <Text>
        {state.nombre}
        </Text>
    </View>  
    );
}