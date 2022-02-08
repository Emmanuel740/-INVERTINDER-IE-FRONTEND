import { StyleSheet, Text, View } from 'react-native';

export const styles = StyleSheet.create({
   Maxcontainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
   },
   text:{
       fontSize:16,
       marginLeft: '5%'
   },
   container:{
       flexDirection: 'row',
       alignItems: 'center',
       padding:'3%',
       margin: '3%',
       borderRadius: 3,
       borderBottomWidth: 1,

   },
   count:{
    fontSize:16,
    marginLeft: '5%',
    color: 'red',
    width: '9%',
    borderRadius: 70,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white'

   },
   txtCount:{
       
   }
})