import React,{useEffect, useState} from 'react';
import {View,Text, Image, TouchableOpacity, TextInput} from 'react-native'
import { styles} from '../styles/global'
import { useNavigation } from "@react-navigation/core";
import i18n from "../localization/i18n";
import {URL} from '../Global/server'
import Loader from './Loader'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import {BottomSheet, ListItem} from 'react-native-elements'
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perfil = (props) =>{
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [imagen, setImagen] = useState('');
    const [email, setEmail] = useState('');
    const [cargando, setCargando] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      //console.log(props)
      getUser();
      setUsuario({
         apellidos: props.route.params.userData.emailDB.apellidos,
         email: props.route.params.userData.emailDB.email,
         img: props.route.params.userData.emailDB.img,
         nombre: props.route.params.userData.emailDB.nombre,
         imagen: props.route.params.userData.emailDB.img, 
         password: props.route.params.userData.emailDB.password,
         status: props.route.params.userData.emailDB.status,
         telefono: props.route.params.userData.emailDB.telefono,
         user: props.route.params.userData.emailDB.user,
         _id: props.route.params.userData.emailDB._id,
         token: props.route.params.userData.token
      });
      setId(props.route.params.userData.emailDB._id)
      

      }, [props]);
      useEffect(() => {
         console.log(usuario.telefono)
      }, [usuario]);
    
    const cerrarSesion = async () =>{
      setCargando(true);
      await AsyncStorage.removeItem('sesion')
      setCargando(false);
      navigation.navigate("Login")
    }
    const getUser = async () =>{
      //setCargando(true);

      return axios({
        method: 'GET',
        url: `${URL}usuarios/get-users`,
        params:{
          id: props.route.params.userData.emailDB._id,
          pagination: 0
        },
        config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then((res) =>{
       console.log(res.data)
       setEmail(res.data.usuarios.email);
       setNombre(res.data.usuarios.nombre);
       setApellidos(res.data.usuarios.apellidos);
       setTelefono(res.data.usuarios.telefono.toString());
       setCargando(false);

    }).catch((err)=>{
       console.log(err.response.data)
       setCargando(false);

    })
    }
    const actualizarInfo = () =>{
      setCargando(true);
      let data;
      if(imagen){
        data = {
          id,
          nombre,
          user: email,
          apellidos,
          email,
          telefono,
          img: imagen.base64
        }
      }else{
        data = {
          id,
          nombre,
          user: email,
          apellidos,
          email,
          telefono,
          img: ""
         
        }
      }
      
      return axios({
          method: 'PUT',
          url: `${URL}usuarios/editar-usuario`,
          data,
          config: { headers: { "Content-Type": "multipart/form-data" } }
      }).then((res) =>{
         console.log(res.data)
         setCargando(false);
         getUser();

      }).catch((err)=>{
         console.log(err.response.data)
         setCargando(false);
  
      })
    }
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setIsVisible(false)
        setImagen(result);
      }
    };
    const takeImage = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64:true
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setIsVisible(false)
        setImagen(result);
      }
    };
    const list = [
      { title: 'Camara',
        onPress: () => takeImage(),
      },
      { title: 'Galeria',
        onPress: () => pickImage(),
      },
      {
        title: 'Cancelar',
        onPress: () => setIsVisible(false),
        titleStyle:{ margin: 20}
      },
  ]; 
    return(
      <View style={styles.Maxcontainer}>
        <View style={styles.container}>
        {imagen
         ?<TouchableOpacity
          onPress={() => setIsVisible(true)}>
          <Image source={{ uri: imagen.uri }} style={styles.imageNew} />
          </TouchableOpacity>
         :<View>
           {usuario.img
            ?<TouchableOpacity
            onPress={() => setIsVisible(true)}>
            <Image 
            style={styles.imageNew}
            source={{ uri: usuario.img }}></Image>
            </TouchableOpacity>
            :<TouchableOpacity
            onPress={() => setIsVisible(true)}>
            <Image 
            style={styles.imageNew}
            source={{ uri: 'https://movile-apps.s3.us-east-2.amazonaws.com/images/noImage.jpg' }}></Image>
            </TouchableOpacity>
           }
         </View>
        }
        </View>
        <View style={styles.formContainer}>
        <Text style={styles.perfilText}>¡{i18n.t("Perfil_greeting")} {usuario.nombre}!</Text>
        {/* <Text style={styles.infoText}>{i18n.t("Perfil_info")}</Text> */}
        {/* <Text style={styles.infoContent}>{usuario.nombre} {usuario.apellidos}</Text> */}
        <TextInput style={styles.infoContent} 
        value={nombre}
        onChangeText={(text) => setNombre(text)}            
        />
        <TextInput style={styles.infoContent} 
        value={apellidos}
        onChangeText={(text) => setApellidos(text)}            
        />
        <TextInput style={styles.infoContent} 
        value={email}
        onChangeText={(text) => setEmail(text)}            
        />
        <TextInput style={styles.infoContent} 
        value={telefono}
        onChangeText={(text) => setTelefono(text)}            
        />
        <TouchableOpacity
        onPress={actualizarInfo} style={styles.buttonPerfil}>
          <Text style={styles.btnText}>
          {i18n.t("Perfil_update")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={cerrarSesion} style={styles.buttonPerfil2}>
          <Text style={styles.btnText}>
          {i18n.t("Perfil_close")}         
          </Text>
        </TouchableOpacity>
        </View>
        <Loader loading={cargando} />
        <BottomSheet isVisible={isVisible}>
       
       {list.map((l, i) => (
         <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
             <ListItem.Content>
             <ListItem.Title  >
                 <Text>
                 {l.title === 'Cancelar'
                  ?<Icon
                  name="cancel"
                  />
                  :<Text></Text>
                 }
                 {l.title === 'Camara'
                  ?<Icon
                  name="camera"
                  />
                  :<Text></Text>
                 }
                 {l.title === 'Galeria'
                  ?<Icon
                  name="image"
                  />
                  :<Text></Text>
                 }
                 </Text>
                 <Text style={{marginBottom: 10}}> {l.title}</Text>
             </ListItem.Title>
           </ListItem.Content>
         </ListItem>

      ))}
    </BottomSheet>
    <Loader loading={cargando} />

      </View>
    )
}

export default Perfil;