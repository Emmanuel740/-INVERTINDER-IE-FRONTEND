import axios from 'axios';
import {URL} from '../Global/server'

async function hacerLogin(email, password){
    return axios({
        method: 'POST',
        url: `${URL}login`,
        data: {
            email,
            password
        },
        config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then((res) =>{
       //console.log(res.data)
       return 0;
       //crearCuenta('inversionista')
    }).catch((err)=>{
       //console.log(err.response.data)
       return 1;
    })
}
module.exports = {hacerLogin};