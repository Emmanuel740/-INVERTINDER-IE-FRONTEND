import axios from 'axios';
import {URL} from '../../Global/server'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../components/Toast/Toast'

export const getProjects = async () => {
        return axios({
            method: 'GET',
            url: `${URL}proyectos/get-projects`,
        })     
}
export const getProjectsType = async (tipo) => {
        return axios({
            method: 'GET',
            url: `${URL}proyectos/get-projects-kind`,
            params: {
              tipo
            }
        })    
}
export const getStorageProjects = async () => {
    const projects = await AsyncStorage.getItem('projects')
    return projects;
    
}
export const saveStorageProjects = async (data) => {
    const projects = JSON.stringify(data)
    await AsyncStorage.setItem('projects',projects) 
    console.log('se guardaron ')   
}

export const createProject = async (titulo,propuesta,presupuesto,recaudado,tipo,id,imagen) =>{
    let data;
    if(imagen){
    data = {
        titulo, 
        propuesta,
        presupuesto,
        recaudado,
        tipo,
        registroUsuario: id,
        vistaPrevia: imagen.base64
    }
    }else{
    data = {
        titulo, 
        propuesta,
        presupuesto,
        recaudado,
        tipo,
        registroUsuario: id,
        vistaPrevia: ''
    }
  }
  return axios({
    method: 'POST',
    url: `${URL}proyectos/crear-proyecto`,
    data,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  })
}
export const createHttpRequest = async (method,url,titulo,propuesta,presupuesto,recaudado,tipo,id,imagen) => {
    let data;
    if(imagen){
    data = {
        titulo, 
        propuesta,
        presupuesto,
        recaudado,
        tipo,
        registroUsuario: id,
        vistaPrevia: imagen.base64
    }
    }else{
    data = {
        titulo, 
        propuesta,
        presupuesto,
        recaudado,
        tipo,
        registroUsuario: id,
        vistaPrevia: ''
    }
  }
    
    // let dataQuery = {
    //     method,
    //     data,
    //     url: `${URL}${url}`
    // }
    // const stringQuery = JSON.stringify(dataQuery)
    const actualQuerys = await AsyncStorage.getItem('requests')
    if(actualQuerys != null){
        const actualQuerysObj = JSON.parse(actualQuerys)
        let dataQuery = {
            method,
            data,
            url: `${URL}${url}`
        }
        actualQuerysObj.push(dataQuery)
        const newRequests = JSON.stringify(actualQuerysObj)
        await AsyncStorage.setItem('requests',newRequests)
    }else{
        let dataQuery = [{
            method,
            data,
            url: `${URL}${url}`
        }]
        const stringQuery = JSON.stringify(dataQuery)
        await AsyncStorage.setItem('requests',stringQuery) 
    }  
}

export const getHttpRequests = async () =>{
    try{
        // console.log('getHttpRequests')
        // showToast(`Checando peticiones`)
        // let index = 0; 
         const actualQuerys = await AsyncStorage.getItem('requests')
         showToast(actualQuerys)
    
        // if(actualQuerys != null){
        //     showToast(`hay petis`)
    
        //     const actualQuerysObj = JSON.parse(actualQuerys)
        //     //const res = await sendLocalRequests(actualQuerysObj)
        //     //return res;
        //     for(let request of actualQuerysObj){
        //         index++;
        //         console.log(request)
        //         showToast(`Publicando proyectos ${index}...`)
        //     //  await axios({
        //     //      method: request.method,
        //     //      url: request.url,
        //     //      data: request.data,
        //     //      config: { headers: { "Content-Type": "multipart/form-data" } }
        //     //      }).then((res) =>{
        //     //          showToast('Se publico un proyecto')
        //     //      }).catch((err)=>{
        //     //          showToast('Error al publicar un proyecto')
         
        //     //      })    
        //      }
        // }else{
        //     showToast(`No hay petis`)
        //     return false;
        // }
    }catch(e){
        console.log(e)
    }
    
  
}

export const sendLocalRequests = async (requests)  => {
    showToast(`Publicando proyectos `)

   let index = 0; 
   for(let request of requests){
       index++;
       console.log(request)
       showToast(`Publicando proyectos ${index}...`)
    await axios({
        method: request.method,
        url: request.url,
        data: request.data,
        config: { headers: { "Content-Type": "multipart/form-data" } }
        }).then((res) =>{
            showToast('Se publico un proyecto')
        }).catch((err)=>{
            showToast('Error al publicar un proyecto')

        })    
    }
}

