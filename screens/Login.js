import React, {useState, useEffect,useContext} from 'react';
import {AppContext} from '../components/application/provider';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/global'
import { useNavigation } from "@react-navigation/core";
import {URL} from '../Global/server'
import Loader from './Loader'
import axios from 'axios';
import i18n from "../localization/i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = (props) =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(false);
    const [estatusLogin, setEstatus] = useState(true);
    const [usuario,setUsuario] = useContext(AppContext);
    const [Context, setContext] = useContext(AppContext);

    const navigation = useNavigation();

    useEffect(() => {
      //console.log(props)
        
      }, [props]);
const crearCuenta = (tipo) =>{
    navigation.navigate("SignUp",{tipo})
}
const hacerLogin = async () =>{
    setCargando(true);
    return axios({
        method: 'POST',
        url: `${URL}login`,
        data: {
            email,
            password
        },
        config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then((res) =>{
       setEstatus(true)
       console.log(res.data)
       setCargando(false);
       setContext({...Context, usuario: res.data.emailDB})
       guardarLogin(res.data);
       //setUsuario({ usuario: res.data.emailDB, token: res.data.token})
       navigation.navigate("Menu", {userData: res.data})

       //crearCuenta('inversionista')
    }).catch((err)=>{
       setEstatus(false)
       console.log(err.response.data)
       setCargando(false);

    })
}
    const guardarLogin = async (data) =>{
        const sesion = JSON.stringify(data)
        await AsyncStorage.setItem('sesion',sesion)
    }

 return(
    <View style={styles.Maxcontainer}>
    <View style={styles.container}>
        <Text style={styles.logoTxt}>
            IE
        </Text>
    </View>
    <View style={styles.formContainer}>
            <Text style={styles.wel}>
              {i18n.t("greeting")}
            </Text>
            {estatusLogin
             ?<Text style={{color: 'white'}}>{i18n.t("Login_Correct")}</Text>
             :<Text style={{color: 'yellow'}}>{i18n.t("Login_Incorrect")}</Text>

            }
            <TextInput style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}            
            />
            <TextInput style={styles.input}
            placeholder={i18n.t("Login_Contra")}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}    
                    

            />
            <TouchableOpacity style={styles.loginButton}
             onPress={hacerLogin}>
                <Text style={styles.buttonText}>
                    {i18n.t("Login_btn")}
                </Text>
            </TouchableOpacity>
            <Text style={styles.wel1}>
             {i18n.t("Login_question")}  
            </Text>
            <Text style={styles.wel2} onPress={()=>{crearCuenta('inversionista')}}>
            {i18n.t("Login_inv")}  
            </Text>
            <Text style={styles.wel2} onPress={()=>{crearCuenta('emprendedor')}}>
            {i18n.t("Login_emp")}  
            </Text>
        </View>
        <Loader loading={cargando} />
    </View>
    
    
 )
}
//module.exports = { hacerLogin };

export default Login;
