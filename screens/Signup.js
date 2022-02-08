import React, {useState,useEffect} from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles} from '../styles/global'
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from './Loader'
import axios from 'axios';
import { useNavigation } from "@react-navigation/core";
import {URL} from '../Global/server'
import i18n from "../localization/i18n";
import {BottomSheet, ListItem} from 'react-native-elements'
import { Icon } from 'react-native-elements';

const SignUp = (props) =>{
const [imagen, setImagen] = useState(null);
const [nombre, setName] = useState('');
const [lastname, setLastname] = useState('');
const [correo, setEmail] = useState('');
const [cellphone, setCellphone] = useState('');
const [contrasena, setPassword] = useState('');
const [contrasena2, setPassword2] = useState('');
const [cargando, setCargando] = useState(false);
const [tipo, setTipo] = useState('');
const [isVisible, setIsVisible] = useState(false);

const navigation = useNavigation();

useEffect(() => {
  console.log(props)
  setTipo(props.route.params.tipo)
  }, [props]);

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
  const registrar = async () =>{
    setCargando(true)
    let data;
    if(imagen){
    data = {
      nombre,
      apellidos: lastname,
      email: correo,
      telefono: cellphone,
      password: contrasena,
      password2: contrasena2,
      user: correo,
      img: imagen.base64,
      tipo
    }
    }else{
    data = {
      nombre,
      apellidos: lastname,
      email: correo,
      telefono: cellphone,
      password: contrasena,
      password2: contrasena2,
      user: correo,
      img: '',
      tipo
    }
  }
  console.log(data)
  return axios({
    method: 'POST',
    url: `${URL}usuarios/crear-usuario`,
    data,
    config: { headers: { "Content-Type": "multipart/form-data" } }
}).then((res) =>{
   console.log(res.data)
   setCargando(false);
   navigation.navigate("Login", {userData: res.data.newUsuario, token: res.data.token})
}).catch((err)=>{
   console.log(err.response.data)
   setCargando(false);

})
  

}
const cancelar = () =>{
    navigation.navigate("Login")
}
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
    <View style={styles.containerSign}>
        {/* <Text style={styles.logoTxt}>
            IE
        </Text> */}
        {imagen
         ?<TouchableOpacity
          onPress={() => setIsVisible(true)}>
          <Image source={{ uri: imagen.uri }} style={styles.imageSign} />
          </TouchableOpacity>
         :<TouchableOpacity
             onPress={() => setIsVisible(true)}>
             <Image 
             style={styles.imageSign} 
             source={{ uri: "https://movile-apps.s3.us-east-2.amazonaws.com/images/noImage.jpg" }}></Image>
         </TouchableOpacity>
        }
        
    </View>
    <View style={styles.formContainerSign}>
            <Text style={styles.wel}>
            {i18n.t("Signup_Intr")}                
            </Text>
            <TextInput style={styles.input}
            placeholder={i18n.t("Signup_Name")}
            onChangeText={(text)=> setName(text)}
            />
            <TextInput style={styles.input}
            placeholder={i18n.t("Signup_LastName")}
            onChangeText={(text)=> setLastname(text)}
            />
            <TextInput style={styles.input}
            placeholder="Email"
            onChangeText={(text)=> setEmail(text)}
            />
            <TextInput style={styles.input}
            placeholder={i18n.t("Signup_Phone")}
            onChangeText={(text)=> setCellphone(text)}

            />
            <TextInput style={styles.input}
            placeholder={i18n.t("Signup_Password")}
            onChangeText={(text)=> setPassword(text)}
            secureTextEntry={true}    

            />
            <TextInput style={styles.input}
            placeholder={i18n.t("Signup_PasswordConfirm")}
            onChangeText={(text)=> setPassword2(text)}
            secureTextEntry={true}    

            />
            <TouchableOpacity style={styles.loginButton} 
            onPress={registrar}
            >
            <Text style={styles.buttonText}>
            {i18n.t("Signup_Save")}
                </Text>
            </TouchableOpacity>
            <Text style={styles.wel2} onPress={cancelar}>
            {i18n.t("Signup_Cancel")}
            </Text>
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
    </View>

 )
}

export default SignUp;