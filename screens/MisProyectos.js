import React, {useEffect, useState} from 'react';
import {View,Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { styles} from '../styles/global'
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {URL} from '../Global/server'
import Loader from './Loader'
import {Card} from 'react-native-elements'
import i18n from "../localization/i18n";

const MisProyectos = (props) =>{
    const navigation = useNavigation();
    const [proyectos, setProyectos] = useState([]);
    const [id, setId] = useState('');
    const [posicion, setPosicion] = useState(0);
    const [tipo, setTipo] = useState('todos');
    const [cargando, setCargando] = useState(false);
    useEffect(() => {
        console.log('Mis proyectos')
        console.log(props)
        setId(props.route.params.userData.emailDB._id)
        getProyectos()
        
        }, [props]);
    
    const nuevoProyecto = () =>{
    navigation.navigate("nuevoProyecto",{id})
    }
    const getProyectos = () =>{
        setCargando(true);
        console.log(id)
        return axios({
            method: 'GET',
            url: `${URL}proyectos/get-my-projects`,
            params: {headers: {
                "x-token" : 'token'
              },
              id: props.route.params.userData.emailDB._id
            },
            config: { headers: {
                 "Content-Type": "multipart/form-data",
                 "x-token": 'token' } }
        }).then((res) =>{
           console.log(res.data)
           setProyectos(res.data.proyectos)
           //setProject()
           setCargando(false);
           //navigation.navigate("Login", {userData: res.data.newUsuario, token: res.data.token})
        }).catch((err)=>{
           console.log(err.response.data)
           setCargando(false);
        
        })
    } 
    const verProyecto = (index) =>{
        navigation.navigate("verProyecto",{proyecto: proyectos[index], user: props.route.params})
     }
  return(
    <ScrollView
    >
    <View>
    {/* <Picker
     selectedValue={tipo}
     style={{marginLeft: 5}}
     onValueChange={(itemValue, itemIndex) =>
     setTipo(itemValue)
    }>
   <Picker.Item label="Todos los proyectos" value="todos" />
   <Picker.Item label="Tecnologias de la información" value="tics" />
   <Picker.Item label="Negocios" value="bussines" />
   <Picker.Item label="Gastronomia" value="gastronomy" />

  </Picker> */}
  <View style={{alignItems: 'center'}}>
  <TouchableOpacity 
  style={styles.buttonPerfilBlack2}
  onPress={nuevoProyecto}>
      <Text style={styles.btnTextBlack}>
      {i18n.t("Myprojects_Create")}      
      </Text>
  </TouchableOpacity>
  </View>
  
    </View>
    
    <View >

        {
        proyectos.map((value, index) => {
         console.log(value.titulo)
         return <Card key={index}>
                   <View style={styles.Maxcontainer}>
                   {value.vistaPrevia !== ""
                    ? <Image source={{ uri: value.vistaPrevia }} style={styles.image} ></Image>
                    : <View>
                       <Image style={styles.imageProyect} source={{ uri: "https://movile-apps.s3.us-east-2.amazonaws.com/images/sinImagen.jpg" }}></Image>
                      </View> 
                   }
                   </View>
                   <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                           <Text style={styles.ProjectTitle}>
                            {value.titulo}
                           </Text>
                        </View>
                        <View style={{flex: 1,  justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                          {
                           value.inversion
                           ?<Text style={{fontSize: 12}}> {value.inversion.length} {i18n.t("Explore_Sol")}</Text>
                           :<Text>{i18n.t("Explore_SinSol")}s</Text>
                         }
                        </View>
                     </View>
                   <Text style={styles.ProjectTxt}>
                     {value.propuesta}
                   </Text>
                   <View style={{flexDirection: 'row'}}>
                   <Text >
                   {i18n.t("Explore_By")}  
                   </Text>
                   <Text style={styles.ProjectTxtby}> {value.registroUsuario.nombre} {value.registroUsuario.apellidos}</Text>
                   </View>
                   
                   <View style={styles.Maxcontainer}>
                   <TouchableOpacity
                   onPress={() => {verProyecto(index)}}
                       style={styles.buttonPerfilBlack}>
                       <Text style={styles.btnTextBlack}>
                       {i18n.t("Explore_See")}                         
                       </Text>
                   </TouchableOpacity>
                   </View>
                   
                </Card>
         })}
        <Loader loading={cargando} />
        </View>
        </ScrollView>
  )
}

export default MisProyectos;