import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import HeaderItem from '../../components/Menu/HeaderItem/HeaderItem'
import MenuItem from '../../components/Menu/MenuItem/MenuItem'
import CloseSesionButton from '../../components/Menu/CloseSesionButton/CloseSesionButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from "../../localization/i18n";
import Loader from '../Loader'

const MenuItems = ({navigation, tipo}) =>{
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        console.log(tipo)  
    }, [navigation]); 

    const cerrarSesion = async () =>{
        setCargando(true);
        await AsyncStorage.removeItem('sesion')
        setCargando(false);
        navigation.navigate("Login")
    }

  return(
      <DrawerContentScrollView >
          <HeaderItem />
          <MenuItem 
           text={`${i18n.t("Menu_Explore")}`}
           onPress={ () => navigation.navigate('Explorar')}
           focused={ () => navigation.isFocused()}
           iconName="bulb-outline"
           iconSize={20}
          />
          {tipo === 'emprendedor'
           ? <MenuItem 
           text={`${i18n.t("Menu_MyProjects")}`}
           onPress={ () => navigation.navigate('MisProyectos')}
           focused={ () => navigation.isFocused()}
           iconName="flag-outline"
           iconSize={20}
          />
          :<MenuItem 
          text={`${i18n.t("Menu_MyInv")}`}
          onPress={ () => navigation.navigate('MisInversiones')}
          focused={ () => navigation.isFocused()}
          iconName="bar-chart-outline"
          iconSize={20}
         />
          }
          <MenuItem 
          text={`${i18n.t("Menu_Contact")}`}
          onPress={ () => navigation.navigate('Contactos')}
          focused={ () => navigation.isFocused()}
          iconName="people-outline"
          iconSize={20}
         />
          <MenuItem 
           text={`${i18n.t("Menu_Account")}`}
           onPress={ () => navigation.navigate('Cuenta')}
           focused={ () => navigation.isFocused()}
           iconName="person-outline"
           iconSize={20}
          />
          <MenuItem 
           text={`${i18n.t("Menu_Comments")}`}
           onPress={ () => navigation.navigate('Comentarios')}
           focused={ () => navigation.isFocused()}
           iconName="chatbubble-ellipses-outline"
           iconSize={20}
          />
          <CloseSesionButton
            onPress={() => cerrarSesion()}
          />
         <Loader loading={cargando} />

      </DrawerContentScrollView>
  )
}

export default MenuItems;