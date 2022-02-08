import { StyleSheet,  } from 'react-native';

export const styles = StyleSheet.create({
   Maxcontainer:{
        flex: 1,
        backgroundColor: 'white',
   },
   headerView:{
        //View del Header
        flex:1,
        backgroundColor: 'gray',
        flexDirection: 'row',

   },
   messagesView:{
        //View de lol Mensajes
        flex:8,
        backgroundColor: 'green',
        flexDirection: 'row',

   },
   sendMessageView:{
       flex:1,
       backgroundColor: 'red',

        //View de lo Enviar mensajes

  },
   backButton:{
        flex:1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%'

   },
   NameDestView:{
        flex:5,
        // backgroundColor: 'green',
        justifyContent: 'center',
        paddingTop: '5%'

   },
   TextHeader:{
        fontSize: 20

   }
})