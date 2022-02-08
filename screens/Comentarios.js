import React, {useEffect, useState} from 'react';
import {View,Text, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import {Card} from 'react-native-elements'
import axios from 'axios';
import {URL} from '../Global/server'
import Loader from './Loader'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles} from '../styles/global'
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/core";
import Moment from 'moment';
import i18n from "../localization/i18n";


const Proyectos = (props) =>{
    
    const [comentarios, setComentarios] = useState([]);
    const [comentario, setComentario] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [usuario, setUsuario] = useState([]);
    const navigation = useNavigation();


    useEffect(() => {
        console.log('props proyectos')
        console.log(props)
        setUsuario(props.route.params.userData.emailDB)
        getProyectos()
        }, [props]);
    
    
    const getProyectos = () =>{
        setCargando(true);

        return axios({
            method: 'GET',
            url: `${URL}comentarios/get-comentarios`,
            params: {},
            config: { headers: { } }
        }).then((res) =>{
           console.log(res.data)
           setComentarios(res.data.comments)
           //setProject()
           setCargando(false);
           //navigation.navigate("Login", {userData: res.data.newUsuario, token: res.data.token})
        }).catch((err)=>{
           console.log(err)
           setCargando(false);
        
        })
    } 
    const enviarComentario = () =>{
        setCargando(true);
        let fecha = new Date()
        return axios({
            method: 'POST',
            url: `${URL}comentarios/crear-comentario`,
            data: {
                comentario,
                fecha,
                user: usuario._id

            },
            config: { headers: { } }
        }).then((res) =>{
           console.log(res.data)
           getProyectos()
           //setProject()
           setCargando(false);
           //navigation.navigate("Login", {userData: res.data.newUsuario, token: res.data.token})
        }).catch((err)=>{
           console.log(err)
           setCargando(false);
        
        })
    }
    
  return(
     
    <View>
        <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 5, marginRight: 5}}>
            <View style={{flex:5, backgroundColor: '#CDCDCD', borderTopStartRadius: 15, borderBottomStartRadius: 15}}>
              <TextInput style={styles.inputInv}
                placeholder={i18n.t("MyInv_TextCom")}
                onChangeText={(text)=> setComentario(text)}
              />
            </View>  
            <View style={{flex:1, alignItems: 'center', backgroundColor: '#CDCDCD', justifyContent: 'center',borderTopEndRadius: 15, borderBottomEndRadius: 15}}>
              <TouchableOpacity
              onPress={enviarComentario}>
              <Text style={styles.ProjectTxtSub}>
                 <Ionicons name="send-outline" color="black" size={20}/>
              </Text>
              </TouchableOpacity>
            
            </View> 
            
            <Loader loading={cargando} />
 
            </View>
            <ScrollView>
           {comentarios.map((value,index)=>{
               return <Card key={index} wrapperStyle={{width: '100%'}}>
                   <View style={{flexDirection: 'row'}}>
                   <View style={{flex:1}}>
                   <Text style={styles.ProjectTxtSub}>
                     {value.user.nombre} {value.user.apellidos}         
                   </Text>
                   </View>  
                   <View style={{flex:1, alignItems: 'flex-end'}}>
                   <Text style={styles.ProjectTxtSub}>
                    {Moment(value.fecha).format('DD-MM-YYYY')}
                   </Text>
                   </View>  
                   </View>    
                   <Text style={{marginTop:5}}>{value.comentario}</Text>
               </Card>
           })

           }
           </ScrollView>
    </View>
  )
}

export default Proyectos;