import React, {useEffect, useState} from 'react';
import {View,Text, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import {Card} from 'react-native-elements'
import { styles} from '../styles/global'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from './Loader'
import {URL} from '../Global/server'
import axios from 'axios';
import Moment from 'moment';
import { useNavigation } from "@react-navigation/core";
import i18n from "../localization/i18n";

const VerProyecto = (props) =>{
    const [proyecto, setProyecto] = useState([]);
    const [tipoUsario, setTipoUsuario] = useState('');
    const [inversiones, setInversiones] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [comentario, setComentario] = useState('');
    const [usuario, setUsuario] = useState({});
    const [ofrece, setOfrece] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        console.log(props.route.params.proyecto.inversion)
        setProyecto(props.route.params.proyecto)
        setUsuario(props.route.params.user.userData.emailDB)
        setTipoUsuario(props.route.params.user.userData.emailDB.tipo)
        if(props.route.params.proyecto.inversion){
          setInversiones(props.route.params.proyecto.inversion)
          //setInversion(props.route.params.proyecto.inversion)

        }
        console.log(proyecto)
        
    }, [props]);

  const registrarInversion = async () =>{
      setCargando(true)
      let date = new Date()
      let data = {
        investorUser:{
           usuario
        },
        comentario:{
          comentario: comentario,
          usuarioTipo: usuario.tipo,
          usuario_id: usuario._id,
          nombre: `${usuario.nombre} ${usuario.apellidos}`,
          fecha: `${date.getDay}-${date.getMonth}-${date.getFullYear}`
        },
        proyecto: proyecto._id

      }
      return axios({
        method: 'POST',
        url: `${URL}inversiones/crear-inversion`,
        data,
        config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then((res) =>{
       console.log(res.data)
       setCargando(false);
       //AlertRes('si','Listo','Proyecto creado con éxito')
       //navigation.navigate("Login", {userData: res.data.newUsuario, token: res.data.token})
    }).catch((err)=>{
       console.log(err.response.data)
       setCargando(false);
       //AlertRes('no','Error','No se pudo crear el proyecto')
    
  })
    
  }  
  const ver = (index) =>{
    navigation.navigate("VerInversionEm",{inversion: inversiones[index],usuario})
}
  return(
      <ScrollView>
        <Card >
        <View style={styles.Maxcontainer}>
          {proyecto.vistaPrevia !== ""
           ? <Image source={{ uri: proyecto.vistaPrevia }} style={styles.image} ></Image>
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
          {i18n.t("VerProInv_Type")}
          </Text>
          <Text style={styles.ProjectTxt}>
            {proyecto.tipo}
          </Text>
          
          <Text style={styles.ProjectTxtSub}>
          {i18n.t("VerProInv_Date")}
          </Text>
          <Text style={styles.ProjectTxt}>
            {Moment(props.route.params.proyecto.created_at).format('DD-MM-YYYY')}
          </Text>
          <Text style={styles.ProjectTxtSub}>
          {i18n.t("VerProInv_Inv")}
          </Text>
          <Text style={styles.ProjectTxt}>
            {props.route.params.proyecto.inversion.length} {i18n.t("VerProInv_SolVerProy")}
          </Text>
          
          
          <View style={styles.Maxcontainer}>
          
          </View>
          

          {inversiones.map((value,index) =>{

            return <Card key={index}>
              <TouchableOpacity
              onPress={()=> ver(index)}>
              <Text>{i18n.t("SeeProject_Req")} {value.investorUser.nombre} {value.investorUser.apellidos}</Text>
              </TouchableOpacity>
              </Card>
          })
          }
          </Card>
          <Loader loading={cargando} />
          </ScrollView>
  )
}

export default VerProyecto;