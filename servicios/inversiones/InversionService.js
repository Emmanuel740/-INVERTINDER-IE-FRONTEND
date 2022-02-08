import axios from 'axios';
import {URL} from '../../Global/server'
import {getNetworkStatus} from '../network/networkService'

export const createInvest = async (data) => {
    const status = await getNetworkStatus();
    console.log(status)
    if(status.isConnected){
        return axios({
            method: 'POST',
            url: `${URL}inversiones/crear-inversion`,
            data,
            config: { headers: { "Content-Type": "multipart/form-data" } }
        })
    }else{
        console.log('No tienes conexion a internet')
    }
       
}

