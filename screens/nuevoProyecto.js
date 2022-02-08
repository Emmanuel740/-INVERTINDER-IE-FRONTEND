import React, {useState, useEffect} from 'react';
import {View,Text, Image, TouchableOpacity, TextInput, Alert, Modal} from 'react-native'
import { styles} from '../styles/global';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import {getNetworkStatus} from '../servicios/network/networkService'
import Loader from './Loader'
import {URL} from '../Global/server'
import {BottomSheet, ListItem} from 'react-native-elements'
import { Icon } from 'react-native-elements';
import Swal from 'sweetalert2'
import { useNavigation } from "@react-navigation/core";
import {createProject, createHttpRequest} from '../servicios/proyectos/proyectoService'
import {showToast} from '../components/Toast/Toast'

const NuevoProyecto = (props) =>{
    const navigation = useNavigation();
    const [imagen, setImagen] = useState('');
    const [titulo, setTitulo] = useState('');
    const [presupuesto, setPresupuesto] = useState(null);
    const [propuesta, setPropuesta] = useState('');
    const [recaudado, setRecaudado] = useState(0);
    const [tipo, setTipo] = useState('');
    const [cargando, setCargando] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        console.log(isVisible)
    }, [isVisible]);
    useEffect(() => {
        console.log(props)
        setId(props.route.params.id)

    }, [props]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
          base64: true
        });
        setIsVisible(false)
        console.log(result);
    
        if (!result.cancelled) {
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
        setIsVisible(false)
        console.log(result);
    
        if (!result.cancelled) {
          setImagen(result);
        }
      };
      const registrarProyecto = async () =>{
          setCargando(true)
          const status = await getNetworkStatus();
          if(status.isConnected){
            // createProject(titulo,propuesta,presupuesto,recaudado,tipo,id,imagen).then((res) =>{
            //   setCargando(false);
            //   AlertRes('si','Listo','Proyecto creado con éxito')
  
            // },(err) => {
            //   console.log(err)
            //   setCargando(false);
            //   AlertRes('no','Error','No se pudo crear el proyecto')
  
            // })   
            createHttpRequest('POST','proyectos/crear-proyecto',titulo,propuesta,presupuesto,recaudado,tipo,id,imagen)
            setCargando(false);
            showToast('Sin conexión, se publicara tu proyecto mas tarde')       
          }else{
            createHttpRequest('POST','proyectos/crear-proyecto',titulo,propuesta,presupuesto,recaudado,tipo,id,imagen)
            setCargando(false);
            showToast('Sin conexión, se publicara tu proyecto mas tarde')

          }
                  
      }

    //   const registrarProyecto = async () =>{
    //     setCargando(true)
    //     let data;
    //     if(imagen){
    //     data = {
    //         titulo, 
    //         propuesta,
    //         presupuesto,
    //         recaudado: 0,
    //         tipo,
    //         registroUsuario: id,
    //         vistaPrevia: imagen.base64
    //     }
    //     }else{
    //     data = {
    //         titulo, 
    //         propuesta,
    //         presupuesto,
    //         recaudado: 0,
    //         tipo,
    //         registroUsuario: id,
    //         vistaPrevia: ''
    //     }
    //   }
    //   console.log(data)
    //   return axios({
    //     method: 'POST',
    //     url: `${URL}proyectos/crear-proyecto`,
    //     data,
    //     config: { headers: { "Content-Type": "multipart/form-data" } }
    // }).then((res) =>{
    //    console.log(res.data)
    //    setCargando(false);
    //    AlertRes('si','Listo','Proyecto creado con éxito')
    //    //navigation.navigate("Login", {userData: res.data.newUsuario, token: res.data.token})
    // }).catch((err)=>{
    //    console.log(err.response.data)
    //    setCargando(false);
    //    AlertRes('no','Error','No se pudo crear el proyecto')
    
    // })   
    //  }  
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
    const AlertRes = async (valor,title,text)=>{
      Alert.alert(
        title,
        text,
        [
          { text: "OK", onPress: () => checarsiError(valor) }
        ]
      );
    }
    const checarsiError = (valor) =>{
      if(valor === 'si'){
        navigation.goBack()
      }
    }
  return(
    <View style={styles.Maxcontainer}>
    <View style={styles.container3}
     >
        {/* <Text style={styles.logoTxt}>
            IE
        </Text> */}
        {imagen
         ?<TouchableOpacity
          onPress={() => setIsVisible(true)}>
          <Image source={{ uri: imagen.uri }} style={styles.imageNew} />
          </TouchableOpacity>
         :<TouchableOpacity
             onPress={() => setIsVisible(true)}>
             <Image 
             style={styles.imageProyect} 
             source={{ uri: "https://movile-apps.s3.us-east-2.amazonaws.com/images/sinImagen.jpg" }}></Image>
         </TouchableOpacity>
        }
        
    </View>
    <View style={styles.formContainer2}>
    <Text style={styles.perfilText}>¡Crea tu proyecto!</Text>
    <TextInput style={styles.inputProject}
            placeholder="Titulo del proyecto"
            onChangeText={(text)=> setTitulo(text)}
            />
    <TextInput style={styles.inputProject}
            placeholder="Descripcion del proyecto"
            multiline
            numberOfLines={4}
            onChangeText={(text)=> setPropuesta(text)}
            />
    <TextInput style={styles.inputProject}
            placeholder="Presupuesto del proyecto"
            onChangeText={(text)=> setPresupuesto(text)}
            />
    <Picker
      selectedValue={tipo}
      style={styles.inputProject}
      onValueChange={(itemValue, itemIndex) =>
       setTipo(itemValue)
      }>
    <Picker.Item style={{color: 'gray'}} label="Selecciona el tipo de proyecto" value="" />
     <Picker.Item label="Tecnologias de la información" value="tics" />
     <Picker.Item label="Negocios" value="bussines" />
     <Picker.Item label="Gastronomia" value="gastronomy" />

    </Picker>
    
    <TouchableOpacity style={styles.buttonPoject}
    onPress={registrarProyecto}>
      <Text style={styles.btnText}>
       GUARDAR      
      </Text>
    </TouchableOpacity>
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
    <Modal
     animationType={"slide"}
     transparent={false}
     visible={false}></Modal>
    </View>
    



  </View>
  )
}

export default NuevoProyecto;

