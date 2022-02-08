import React, {useEffect, useState} from 'react';
import {View,Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import {Card} from 'react-native-elements'
import axios from 'axios';
import {URL} from '../Global/server'
import Loader from './Loader'
import { styles} from '../styles/global'
import { useNavigation } from "@react-navigation/core";
import i18n from "../localization/i18n";


const MisInversiones = (props) =>{
    const [usuario, setUsuario] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [inversiones, setInversiones] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        console.log('props mis inversiones')
        console.log(props.route.params.userData.emailDB)
        setUsuario(props.route.params.userData.emailDB);
    }, [props]);
    useEffect(() => {
        console.log(usuario._id)
        getInversiones();
    }, [usuario]);
    const getInversiones = () =>{
        setCargando(true);
        return axios({
            method: 'GET',
            url: `${URL}inversiones/get-investments`,
            params: {
            id: usuario._id
            },
            config: { headers: {
                 "Content-Type": "multipart/form-data" } }
        }).then((res) =>{
           console.log(res.data)
           setInversiones(res.data.inversiones)
           //setProject()
           setCargando(false);
           //navigation.navigate("Login", {userData: res.data.newUsuario, token: res.data.token})
        }).catch((err)=>{
           console.log(err)
           setCargando(false);
        
        })
    }
    const ver = (index) =>{
        navigation.navigate("verInversion",{inversion: inversiones[index],usuario})
    }
  return(
      <View>
          {inversiones
          ?<ScrollView>
              {inversiones.map((value, index) => {
                console.log(value)
                return <Card key={index} >
                        <View style={styles.Maxcontainer}>
                         {value.proyecto.vistaPrevia !== ""
                          ? <Image source={{ uri: value.proyecto.vistaPrevia }} style={styles.imageProj} ></Image>
                          : <View>
                             <Image style={styles.imageProyect} source={{ uri: "https://movile-apps.s3.us-east-2.amazonaws.com/images/sinImagen.jpg" }}></Image>
                            </View> 
                         }
                       </View>
                       <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1}}>
                             <Text style={styles.ProjectTitle}>
                              {value.proyecto.titulo}
                             </Text>
                          </View>
                       </View>
                       <Text style={styles.ProjectTxt}>
                         {value.proyecto.propuesta}
                       </Text>
                       <Text style={styles.ProjectTxtSub}>
                       {i18n.t("MyInv_State")}
                       </Text>
                       <View >
                         {value.status === "solicitud"
                         ?<Text style={styles.ProjectTxt}>{i18n.t("MyInv_StateReq")}</Text>
                         :<Text style={styles.ProjectTxt}>{i18n.t("MyInv_StateAce")}</Text>
                         }

                       </View>
                       <View style={styles.Maxcontainer}>
                       <TouchableOpacity
                           onPress={() => ver(index)}
                           style={styles.buttonPerfilBlack}>
                           <Text style={styles.btnTextBlack}>
                            {i18n.t("Explore_See")}                         
                           </Text>
                       </TouchableOpacity>
                       </View>
                       
               </Card>
           })

              }
          </ScrollView>
          :<View>
              <Text>No tienes inversiones aun, ¿Que esperas para invertir?</Text>
          </View>

          }
          <Loader loading={cargando} />

      </View>
  )
}

export default MisInversiones;