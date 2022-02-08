import React, {useContext} from 'react';
import {AppContext} from '../application/provider';
import {View,Text, TextInput} from 'react-native'

export default () =>{
    const [state,setState] = useContext(AppContext);

    return(
        <View>
            
            {/* <input type="text" onChange={ (e) => {setState({ ...state, name:e.target.value})}} /> */}
            <TextInput style={{marginTop:50}}
            placeholder="Escribe algo"
            onChangeText={(text) => setState({...state, nombre: text})}
            secureTextEntry={true}
            />
        </View>
    );
}