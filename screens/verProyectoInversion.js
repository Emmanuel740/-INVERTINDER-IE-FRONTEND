import React, {useEffect, useState, useContext} from 'react';
import { AppContext } from '../components/application/provider';
import {View,Text, Image, TouchableOpacity, TextInput, Alert, ScrollView} from 'react-native'
import {Card} from 'react-native-elements'
import { styles} from '../styles/global'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from './Loader'
import Moment from 'moment';
import { useNavigation } from "@react-navigation/core";
import i18n from "../localization/i18n";
import {createInvest} from '../servicios/inversiones/InversionService'

const VerProyectoInversion = (props) =>{
    const [Context, setContext] = useContext(AppContext);
    const [proyecto, setProyecto] = useState([]);
    const [tipoUsario, setTipoUsuario] = useState('');
    const [invertir, setInvertir] = useState(false);
    const [inversion, setInversion] = useState([]);
    const [comentario, setComentario] = useState('');
    const [usuario, setUsuario] = useState({});
    const [ofrece, setOfrece] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigation = useNavigation();
    Moment.locale('en');

    useEffect(() => {
      console.log('Context')
      console.log(Context)
        setProyecto(Context.proyecto)
        setUsuario(Context.usuario)
        setTipoUsuario(Context.usuario.tipo)
        if(Context.proyecto.inversion){
          setInversion(Context.proyecto.inversion)
        }
    }, [Context]);

  const registrarInversion = async () =>{
      setCargando(true)
      let date = new Date()
      let data = {
        investorUser: usuario,
        comentario:{
          comentario,
          usuarioTipo: usuario.tipo,
          usuario_id: usuario._id,
          nombre: `${usuario.nombre} ${usuario.apellidos}`,
          fecha: date,
          
        },
        registroUsuario: usuario._id,
        proyecto: Context.proyecto._id,
        ofrece

      }
      createInvest(data)
      .then((res) =>{
       setCargando(false);
       AlertRes('si',`${i18n.t("VerProInv_SuccessTitle")}`,`${i18n.t("VerProInv_SuccessTxt")}`)
    }).catch((err)=>{
       setCargando(false);
       AlertRes('no',`${i18n.t("VerProInv_ErrorTitle")}`,`${i18n.t("VerProInv_ErrorTxt")}`)
    
  })
    
  }  
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
      <ScrollView>
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
           {i18n.t("VerProInv_Type")}
          </Text>
          <Text style={styles.ProjectTxt}>
            {proyecto.tipo}
          </Text>
          <Text style={styles.ProjectTxtSub}>
          {i18n.t("VerProInv_Inv")}
          </Text>
          <Text style={styles.ProjectTxt}>
            {Context.proyecto.inversion.length} solicitudes de inversión
          </Text>
          <Text style={styles.ProjectTxtSub}>
          {i18n.t("VerProInv_Post")} 
          </Text>
          <Text style={styles.ProjectTxt}>
            {Context.proyecto.registroUsuario.nombre} {Context.proyecto.registroUsuario.apellidos}
          </Text>
          <Text style={styles.ProjectTxtSub}>
          {i18n.t("VerProInv_Date")} 
          </Text>
          <Text style={styles.ProjectTxt}>
            {Moment(Context.proyecto.created_at).format('DD-MM-YYYY')}
          </Text>
          
          
          <View style={styles.Maxcontainer}>
          
          </View>
          
          {tipoUsario === 'inversionista'
          ? <View>
             <TouchableOpacity
                style={styles.buttonPerfilBlack}
                onPress={() => setInvertir(!invertir)}
                >
                {invertir
                ?<Text style={styles.btnTextBlack}>
                  <Text>{i18n.t("VerProInv_Oc")} <Ionicons name="chevron-up-outline" color="gray" size={20}/></Text>                     
                </Text>
                :<Text style={styles.btnTextBlack}>
                  {i18n.t("VerProInv_In")} <Ionicons name="chevron-down-outline" color="gray" size={20}/>                        
               </Text>
                }
                
            </TouchableOpacity>
            </View>
          : <View>
               <TouchableOpacity
                style={styles.buttonPerfilBlack}
                onPress={() => navigation.goBack()}
                >
                <Text style={styles.btnTextBlack}>
                {i18n.t("VerProInv_Back")}                         
               </Text>  
            </TouchableOpacity>
            </View>

          }
          {invertir
          ?<View>
             <Text style={{marginTop:10, fontSize: 18, fontWeight: 'bold'}}>{i18n.t("VerProInv_SolInv")}</Text>
             <Text style={{ fontSize: 14 }}>{i18n.t("VerProInv_InvTxt")}</Text>
             <TextInput style={styles.inputVerProj}
              placeholder={i18n.t("VerProInv_ComInput")}
               onChangeText={(text)=> setComentario(text)}
            />
            <TextInput style={styles.inputVerProj}
              placeholder={i18n.t("VerProInv_OfInput")}
              onChangeText={(text)=> setOfrece(text)}
            />
            <TouchableOpacity
                style={styles.buttonVerInv}
                onPress={registrarInversion}
                >
                <Text style={styles.btnTextBlue}>
                  <Text>{i18n.t("VerProInv_Send")}</Text>                     
                </Text>
                
            </TouchableOpacity>
          </View>
          :<View>
          </View>
          }
          </Card>
          <Loader loading={cargando} />
          </ScrollView>
  )
}

export default VerProyectoInversion;