import React,{useEffect, useState} from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Perfil from './Perfil'
import Home from './Home'
import Proyectos from './proyectos/Proyectos'
import MisProyectos from './MisProyectos'
import MisInversiones from './MisInversiones'
import Contactos from './Contactos/Contactos'
import Comentarios from './Comentarios'
import i18n from "../localization/i18n";
import MenuItems from './MenuItems/MenuItems'
const Drawer = createDrawerNavigator();

const Menu = (props) =>{
   const [tipo, setTipo] = useState('')
   useEffect(() => {
      console.log('props menu')
      console.log(props)
      setTipo(props.route.params.userData.emailDB.tipo)
     
      }, [props]);
 return(
    <Drawer.Navigator initialRouteName="Home" 
     drawerContent={
       (props) => <MenuItems {...props} tipo={tipo}/>
     }
    >
        <Drawer.Screen name="Explorar" component={Proyectos} data={props} initialParams={props.route.params}
        options={()=>({
        title: `${i18n.t("Menu_Explore")}`,
        drawerLabel: `${i18n.t("Menu_Explore")}`,
        drawerIcon: ({focused, size}) => (
            <Ionicons
               name="bulb-outline"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
        })} />
        
       
       {tipo === 'emprendedor'
        ?<Drawer.Screen name="MisProyectos" component={MisProyectos} initialParams={props.route.params} 
        options={()=>({
        title: `${i18n.t("Menu_MyProjects")}`,
        drawerLabel: `${i18n.t("Menu_MyProjects")}`,
        drawerIcon: ({focused, size}) => (
            <Ionicons
               name="flag-outline"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
        })} />
        :
        <Drawer.Screen name="MisInversiones"  component={MisInversiones} data={props} initialParams={props.route.params}
        options={()=>({
        title: `${i18n.t("Menu_MyInv")}`,
        drawerLabel: `${i18n.t("Menu_MyInv")}`,
        drawerIcon: ({focused, size}) => (
            <Ionicons
               name="bar-chart-outline"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
         })} />
       }
       <Drawer.Screen name="Contactos" component={Contactos} data={props} initialParams={props.route.params}
        options={()=>({
        title: `Contactos`,
        drawerLabel: `Contactos`,
        drawerIcon: ({focused, size}) => (
            <Ionicons
               name="people-outline"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
        })} />
       <Drawer.Screen name="Cuenta" component={Perfil} initialParams={props.route.params}
        
        options={()=>({
         title: `${i18n.t("Menu_Account")}`,
         drawerLabel: `${i18n.t("Menu_Account")}`,
         drawerIcon: ({focused, size}) => (
             <Ionicons
                name="person-outline"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
             />
          ),
       })} />
       
      <Drawer.Screen name="Comentarios" component={Comentarios} data={props} initialParams={props.route.params}
        options={()=>({
         title: `${i18n.t("Menu_Comments")}`,
        drawerLabel: `${i18n.t("Menu_Comments")}`,
        drawerIcon: ({focused, size}) => (
            <Ionicons
               name="chatbubble-ellipses-outline"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
      })} />
      
    </Drawer.Navigator>
 )
}

export default Menu;