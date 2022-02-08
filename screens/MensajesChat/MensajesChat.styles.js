import { StyleSheet,  } from 'react-native';

export const styles = StyleSheet.create({
   Maxcontainer:{
        flex: 1,
        backgroundColor: '#ECECEC',
   },
   headerView:{
        //View del Header
        flex:1,
        backgroundColor: '#CDCDCD',
        flexDirection: 'row'


   },
   messagesView:{
        //View de lol Mensajes
        flex:9,
        //backgroundColor: 'green',

   },
   LeftMessage:{
        //backgroundColor: 'pink',
        alignItems: 'flex-start',
        

   },
   RigthMessage:{
        //backgroundColor: 'orange',
        alignItems: 'flex-end',

   },
   LeftText:{
       fontSize: 15,
       padding: 5,
       margin: 3,
       borderRadius: 5,
       backgroundColor: '#CDCDCD',
       color:'white'
       //borderColor: 'gray'
   },
   RigthText:{
    fontSize: 15,
    padding: 5,
    margin: 3,
    borderRadius: 5,
    backgroundColor: '#77C8FF',
    color:'white'
    //borderColor: 'gray'
   },
   sendMessageView:{
       flex:1,
       //backgroundColor: 'red',
       flexDirection: 'row',
       justifyContent: 'center'
        //View de lo Enviar mensajes

  },
   backButton:{
        flex:1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%',
        color:'white'

   },
   NameDestView:{
        flex:5,
        // backgroundColor: 'green',
        justifyContent: 'center',
        paddingTop: '5%'

   },
   TextHeader:{
        fontSize: 20,
        color:'white'


   },
   InpuView:{
       flex:5, 
       backgroundColor: '#CDCDCD', 
       borderTopStartRadius: 15,
       justifyContent: 'center',
       borderBottomStartRadius: 15
    },
    ButtonView:{
        flex:1, 
        alignItems: 'center',
        backgroundColor: '#CDCDCD', 
        justifyContent: 'center',
        borderTopEndRadius: 20, 
        borderBottomEndRadius: 20
},
inputInv:{
    borderRadius: 4,
    padding:10,
    fontSize: 18,
    width: '100%'
  }
})