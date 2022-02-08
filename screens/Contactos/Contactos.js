import React, {useEffect, useState, useContext} from 'react';
import {View,Text, Image, TouchableOpacity} from 'react-native'
import {styles} from './Contactos.styles'
import { useNavigation } from "@react-navigation/core";

const imPr = "https://movile-apps.s3.us-east-2.amazonaws.com/images/7-50.jpg"

const Contactos = (props) =>{
 
 const navigation = useNavigation();
 const [contactos, setContactos] = useState([
      {
          nombre:"Fabian de la Cruz",
          desc:"Trucka",
          fecha:"12/01",
          mensajes:[
            {
                mensaje:"Hola que tal",
                hora:"10:03"
            },
            {
                mensaje:"Cuando erramos el trato?",
                hora:"10:04"
            }
          ] 
      },
      {
        nombre:"Israel de Lira",
        desc:"Investment IE",
        fecha:"13/01",
        mensajes:[
          {
              mensaje:"Hola como estas?",
              hora:"9:40"
          },
          {
              mensaje:"Cuando erramos el trato?",
              hora:"9:41"
          }
        ] 
    }
  ]);
  const abrirChat = (index) => {
   console.log('abrir chat')
   navigation.navigate("MensajesChat",{nombre: contactos[index].nombre});
  }
  
  return(
      <View style={styles.Maxcontainer}>
          {contactos.map((value, index) => {
           
            return <TouchableOpacity 
                key={index} 
                style={styles.ChatItem}
                onPress={() => abrirChat(index)}
                >
                <View style={styles.ImageView}>
                  <Image source={{ uri: "https://movile-apps.s3.us-east-2.amazonaws.com/images/7-50.jpg" }} style={styles.image} ></Image>
                </View>   
                <View style={styles.messageView}>
                  <Text>
                     {value.nombre}
                  </Text>
                </View>  
                <View style={styles.CountView}>
                  <Text style={styles.CountText}>
                     {1}
                  </Text>
                </View>
               
            </TouchableOpacity>
           })
        }
      </View>
  )
}

export default Contactos;