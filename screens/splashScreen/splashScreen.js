import React, {useEffect, useState, useContext} from 'react';
import {View,Text, ActivityIndicator} from 'react-native'
import {styles} from './splashScreenStyles.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/core";
import {AppContext} from '../../components/application/provider';

const SplashScreen = (props) =>{

    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [Context, setContext] = useContext(AppContext);

    useEffect(() => {
        obtenerSesion();   
    }, [props]);
    
    const obtenerSesion = async () =>{
        const sesion = await AsyncStorage.getItem('sesion')
        console.log(sesion)
        if(sesion != null){
          console.log('no es nulo')
          const sesionObj = JSON.parse(sesion)
          console.log(sesionObj)
          setContext({...Context, usuario: sesionObj.emailDB})
          navigation.navigate("Menu", {userData: sesionObj})

        }else{
          console.log('es nulo')
          navigation.navigate("Login")

        }  
    }

  return(
      <View style={styles.Maxcontainer}>
          <Text style={styles.text}>
              IE
          </Text>
          <ActivityIndicator
            style={styles.loader}
            animating={loading} size="large" color="#000000"/>
      </View>
  )
}

export default SplashScreen;