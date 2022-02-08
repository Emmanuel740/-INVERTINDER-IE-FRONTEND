import React, {useEffect, useState, useContext} from 'react';
import { AppContext } from '../../components/application/provider';
import {View,Text, Image, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native'
import {Card} from 'react-native-elements'
import Loader from '../Loader'
import { styles} from '../../styles/global'
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/core";
import i18n from "../../localization/i18n";
import {getProjects, getProjectsType, saveStorageProjects, getStorageProjects} from '../../servicios/proyectos/proyectoService'
import {getNetworkStatus} from '../../servicios/network/networkService'
import {showToast} from '../../components/Toast/Toast'

const Proyectos = (props) =>{
    
    const [proyectos, setProyectos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [tipo, setTipo] = useState('todos');
    const [Context, setContext] = useContext(AppContext);
    const navigation = useNavigation();

    useEffect(() => { 
      console.log('Context Proyectos')
      console.log(Context)  
        getProyectos()
    }, [props]);

    useEffect(() => {
        getProyectosTipo()
    }, [tipo]);

    const getProyectosTipo = async () =>{
      setCargando(true); 
      const status = await getNetworkStatus();
      console.log(status)
      if(status.isConnected){
        getProjectsType(tipo).then((res) =>{
          setProyectos(res.data.proyectos)
          saveStorageProjects(res.data.proyectos)
          setCargando(false);
        },(err) => {
          console.log(err)
          setCargando(false);
    
        })
      }else{
        showToast('Sin conexión a internet ProyectosTipo')
        getLocalProjects();
        setCargando(false);
      }
      
    }
    
  const getProyectos = async () =>{  
    setCargando(true); 
    const status = await getNetworkStatus();
    console.log(status)
    if(status.isConnected){
      getProjects().then((res) =>{
        setProyectos(res.data.proyectos)
        saveStorageProjects(res.data.proyectos)
        setCargando(false);
      },(err) => {
        console.log(err)
        setCargando(false);
  
      })
    }else{
      showToast('Sin conexión a internet Proyectos')
      getLocalProjects();
      setCargando(false);

    }  
    
  }  
  const getLocalProjects = async () =>{
    getStorageProjects().then((res) =>{
      //console.log(res)
      const projectObj = JSON.parse(res)
      //console.log(projectObj)
      setProyectos(projectObj)
    },(err) => {
      console.log(err)
    })
  }
  const verProyecto = (index) =>{
       setContext({...Context, proyecto: proyectos[index]})
       navigation.navigate("verProyectoInversion",{})
       
  }
  
  return(
     
    <View>
        <View>
         <Picker
             selectedValue={tipo}
             style={{marginLeft: 5}}
             onValueChange={(itemValue, itemIndex) =>
             setTipo(itemValue)
            }>
           <Picker.Item label={i18n.t("Explore_kind")} value="todos" />
           <Picker.Item label={i18n.t("Explore_tics")} value="tics" />
           <Picker.Item label={i18n.t("Explore_bussines")} value="bussines" />
           <Picker.Item label={i18n.t("Explore_gastronomy")} value="gastronomy" />

          </Picker>
        </View>
        
        <View >
          {proyectos
           ?<View style={{flexDirection: 'row'}}>
               <View style={{flex: 1 ,justifyContent: 'center'}}>
                  <Text style={{marginLeft: '10%', fontSize: 11, fontWeight: 'bold',  }}>{i18n.t("Explore_se")} {proyectos.length} {i18n.t("Explore_pr")}</Text>
               </View>
               <View style={{flex: 1,justifyContent: 'center', alignItems: 'flex-end'}}>
                  <TouchableOpacity 
                  onPress={getProyectosTipo}
                  style={{ marginBottom: 10, marginRight: '7%', borderColor: 'black', borderWidth: 1, padding:3, borderRadius: 3}}>
                     <Text style={{fontSize: 11}}>{i18n.t("Explore_update")}</Text>
                 </TouchableOpacity>
               </View>
              
           </View>
           :<Text style={{marginLeft: '5%', fontSize: 11, fontWeight: 'bold', marginBottom: 10}}>{i18n.t("Explore_NotFound")}</Text>
          }
        </View>
      
        <ScrollView 
        style={{marginBottom: '25%'}}
        >
          {
          proyectos.map((value, index) => {
           console.log(value.titulo)
           return <Card key={index} >
                     <View style={styles.Maxcontainer}>
                     {value.vistaPrevia !== ""
                      ? <Image source={{ uri: value.vistaPrevia }} style={styles.imageProj} ></Image>
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
                           :<Text>{i18n.t("Explore_SinSol")}</Text>
                         }
                        </View>
                     </View>
                     
                     <Text style={styles.ProjectTxt}>
                       {value.propuesta}
                     </Text>
                     <View>
                         
                     </View>
                     <View style={{flexDirection: 'row'}}>
                     <Text >
                     {i18n.t("Explore_By")} {value.registroUsuario.nombre} {value.registroUsuario.apellidos}  
                     </Text>
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
        </ScrollView>
    </View>
  )
}

export default Proyectos;