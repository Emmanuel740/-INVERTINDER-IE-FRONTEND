import React,{useEffect,useState} from 'react';
import {View,Text, Image, TouchableOpacity,TextInput} from 'react-native'
import {styles} from './MensajesChat.styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/core";
import i18n from "../../localization/i18n";

//import {HeaderChat} from '../../components/MensajesChat/HeaderMensajesChat'
const UsuarioAct = 1
const MensajesaChat = (props) =>{
  const navigation = useNavigation();
  const [nombreDest, setNombreDest] = useState('');
  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState([
      {
        envia: 1,
        recibe: 2,
        mensaje: 'Hola como estas',
        fecha: '12/12/2021',
        hora: '10:40'  
      },
      {
        envia: 2,
        recibe: 1,
        mensaje: 'Bien gracias!',
        fecha: '12/12/2021',
        hora: '10:41'  
      },
      {
        envia: 1,
        recibe: 2,
        mensaje: 'Que tal el trabajo?',
        fecha: '12/12/2021',
        hora: '10:40'  
      },
      {
        envia: 2,
        recibe: 1,
        mensaje: 'Muy bien y el tuyo?',
        fecha: '12/12/2021',
        hora: '10:41'  
      },
      {
        envia: 2,
        recibe: 1,
        mensaje: 'Que tal tu proyecto?',
        fecha: '12/12/2021',
        hora: '10:41'  
      }

  ]);

  useEffect(() => { 
        console.log(props)
        setNombreDest(props.route.params.nombre)
  }, [props]);
  const goBack = () =>{
      navigation.goBack()
  }
  return(
      <View style={styles.Maxcontainer}>
          <View style={styles.headerView}>
              <TouchableOpacity 
              style={styles.backButton}
              onPress={() => goBack() }>
                <Ionicons
                 name={"arrow-back-outline"}
                 size={30}
                 color='white'
                 />
              </TouchableOpacity>
              <View style={styles.NameDestView}>             
                <Text style = {styles.TextHeader}>
                 {nombreDest}
                </Text>
              </View>
              
          </View>
          <View style={styles.messagesView}>
              {mensajes.map((value, index) => {
                return <View key={index}>
                    {value.envia === UsuarioAct
                    ? <View style={styles.RigthMessage}>
                        <Text style={styles.LeftText}>
                         {value.mensaje}
                        </Text>
                      </View>
                    
                    : <View style={styles.LeftMessage}>
                        <Text style={styles.RigthText}>
                         {value.mensaje}
                        </Text>
                      </View>
                    }
                </View>
              })
              }
             <View >

             </View>
           </View>
          <View style={styles.sendMessageView}>
              <View style={styles.InpuView}>
                  <TextInput style={styles.inputInv}
                    placeholder={i18n.t("MyInv_TextMessage")}
                    onChangeText={(text)=> setMensaje(text)}
                  />
                </View>  
                <View style={styles.ButtonView}>
                  <TouchableOpacity
                   //</View>onPress={enviarComentario}
                   >
                  <Text style={styles.ProjectTxtSub}>
                     <Ionicons name="send-outline" color="black" size={20}/>
                  </Text>
                  </TouchableOpacity>
                
                </View>
          </View>
          
      </View>
  )
}

export default MensajesaChat;