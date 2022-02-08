import React, {useState, useEffect} from 'react';
import {View,Text, Image, TouchableOpacity,TextInput, ScrollView, Alert} from 'react-native'
import {Card} from 'react-native-elements'
import Moment from 'moment';
import { styles} from '../styles/global'
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {URL} from '../Global/server'
import Loader from './Loader'
import i18n from "../localization/i18n";

const VerInversion = (props)=>{
    const [usuario, setUsuario] = useState([]);
    const [proyecto, setProyecto] = useState([]);
    const [inversion, setInversion] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [comentario, setComentario] = useState('');
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        console.log('props inversion')
        console.log(props.route.params)
        setProyecto(props.route.params.inversion.proyecto)
        setInversion(props.route.params.inversion)
        setUsuario(props.route.params.usuario)
        setComentarios(props.route.params.inversion.comentarios)

    }, [props]);

    const enviarComentario = () =>{
        setCargando(true);
        let date = new Date();
        let data = {
         comentario:{
            comentario,
            usuario: usuario.tipo,
            nombre: `${usuario.nombre} ${usuario.apellidos}`,
            fecha: date
         },
         id: inversion._id
         
        }
        return axios({
            method: 'POST',
            url: `${URL}inversiones/comentar`,
            data,
            config: { headers: { "Content-Type": "multipart/form-data" } }
        }).then((res) =>{
           setComentarios(res.data.investUpdated.comentarios)
           console.log(res.data.investUpdated.comentarios)
           setCargando(false);
        }).catch((err)=>{
           console.log(err.response.data)
           setCargando(false);
           AlertRes('no','Error','No se pudo registrar el comentario')
        
        })
    }
    const updateCom = (data) =>{
        setComentarios(data.inversion.comentarios)
    }
    const AlertRes = async (valor,title,text)=>{
        Alert.alert(
          title,
          text,
          [
            { text: "OK", onPress: () => console.log('ok') }
          ]
        );
    }

  return(
    <View>
        {proyecto
        ?<ScrollView>
            <Card >
        <View style={styles.Maxcontainer}>
          {proyecto.vistaPrevia !== ""
           ? <Image source={{ uri: proyecto.vistaPrevia }} style={styles.imageView} ></Image>
           : <View>
              <Image style={styles.imageProyect} source={{ uri: "https://movile-apps.s3.us-east-2.amazonaws.com/images/sinImagen.jpg" }}></Image>
             </View> 
          }
          </View>
          <Text style={styles.ProjectTitle}>
            {proyecto.titulo}
          </Text>
          
          <Text style={styles.ProjectTxtSub}>
          {i18n.t("VerProInv_Des")}
          </Text>
          <Text style={styles.ProjectTxt}>
            {proyecto.propuesta}
          </Text>
          <Text style={styles.ProjectTxtSub}>
          {i18n.t("VerProInv_Budget")}
          </Text>
          <Text style={styles.ProjectTxt}>
            {proyecto.presupuesto}
          </Text>
          <Text style={styles.ProjectTxtSub}>
          {i18n.t("VerProInv_ofer")}

          </Text>
          <Text style={styles.ProjectTxt}>
            {inversion.ofrece}
          </Text>
          
          <Text style={styles.ProjectTxtSub}>
          {i18n.t("MyInv_State")}
           </Text>
           {inversion.status === 'solicitud'
            ?<Text style={styles.ProjectTxt}>
              {i18n.t("MyInv_StateReq")}
             </Text>
            :<Text style={styles.ProjectTxt}>
              {i18n.t("MyInv_StateAce")}
             </Text>
           }
           
          <Text style={styles.ProjectTxtSub}>
          {i18n.t("MyInv_Comments")}          
           </Text>
           <ScrollView>
           {comentarios.map((value,index)=>{
               return <Card key={index} wrapperStyle={{width: '100%'}}>
                   <View style={{flexDirection: 'row'}}>
                   <View style={{flex:1}}>
                   <Text style={styles.ProjectTxtSub}>
                     {value.nombre}          
                   </Text>
                   </View>  
                   <View style={{flex:1, alignItems: 'flex-end'}}>
                   <Text style={styles.ProjectTxtSub}>
                    {Moment(proyecto.fecha).format('DD-MM-YYYY')}
                   </Text>
                   </View>  
                   </View>    
                   <Text style={{marginTop:5}}>{value.comentario}</Text>
               </Card>
           })

           }
           </ScrollView>
           <View style={{flexDirection: 'row', marginTop: 15}}>
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
            </View> 
          <View style={styles.Maxcontainer}>         
          </View>
          </Card>
        </ScrollView>
        :<Text></Text>
        }
        <Loader loading={cargando} />
    </View>
  )
}

export default VerInversion;