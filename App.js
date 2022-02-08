import React, {useEffect} from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './screens/Login'
import Menu from './screens/Menu'
import SignUp from './screens/Signup'
import ActualizarInfo from './screens/ActualizarInfo'
import NuevoProyecto from './screens/nuevoProyecto'
import VerProyecto from './screens/verProyecto'
import VerProyectoInversion from './screens/verProyectoInversion'
import VerInversion from './screens/verInversion'
import VerInversionEm from './screens/verInversionEmprendedor'
import Contactos from './screens/Contactos/Contactos'
import MensajesaChat from './screens/MensajesChat/MensajesChat'
import i18n from "./localization/i18n";
import Provider from './components/application/provider';
import ShowState from './components/showstate/index';
import LogIn from './components/login/index';
import SplashScreen from './screens/splashScreen/splashScreen.js'
import NetInfo from "@react-native-community/netinfo";
import {getHttpRequests} from "./servicios/proyectos/proyectoService";
//import Notification from './components/notification/notificacion'
let index = 0;

const Stack = createNativeStackNavigator();
export default function App(props) {
  useEffect(() => {
    getNetworkInfo();
 }, [props]);
 
  const getNetworkInfo = () =>{
    NetInfo.addEventListener(state => {
      index++;
      console.log('Listenner activo')
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      console.log(index)

      if(state.isConnected){
        //getHttpRequests()
        showToast('Conectado a internet '+index);

      }else{
        showToast('Sin conexión a internet '+index);

      }
    });
    //unsubscribe();
  }
  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };
  return (
    <Provider>
     <NavigationContainer>
     <Stack.Navigator>
     <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
     <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
     <Stack.Screen name="nuevoProyecto" component={NuevoProyecto} options={{title:`${i18n.t("App_New")}`, headerShown: true}} />
     <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}} independent={true} />
     <Stack.Screen name="SignUp" component={SignUp} options={{title: `${i18n.t("App_Reg")}`, headerShown: false}} />
     <Stack.Screen name="Actualizar" component={ActualizarInfo} options={{title: `${i18n.t("App_Upd")}`, headerShown: true}} />
     <Stack.Screen name="verProyecto" component={VerProyecto} options={{title: `${i18n.t("App_SeePro")}`, headerShown: true}} />
     <Stack.Screen name="verProyectoInversion" component={VerProyectoInversion} options={{title: `${i18n.t("App_SeePro")}` , headerShown: true}} />
     <Stack.Screen name="verInversion" component={VerInversion} options={{title:`${i18n.t("App_SeeInv")}`, headerShown: true}} />
     <Stack.Screen name="VerInversionEm" component={VerInversionEm} options={{title: `${i18n.t("App_SeeInv")}`, headerShown: true}} />
     <Stack.Screen name="Contactos" component={Contactos} options={{title: `Contactos`, headerShown: true}} />
     <Stack.Screen name="MensajesChat" component={MensajesaChat} options={{title: `Mensajes`, headerShown: false}} />

     </Stack.Navigator>
    </NavigationContainer> 
    {/* <SplashScreen/> */}
    </Provider>
    // <Provider>
    //   <LogIn />
    //   <ShowState />
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
