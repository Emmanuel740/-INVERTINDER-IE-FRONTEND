import { StyleSheet,  } from 'react-native';

export const styles = StyleSheet.create({
   Maxcontainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
   },
   ChatItem:{
        backgroundColor: 'white',
        flexDirection: 'row',
        height: '7%',
        paddingTop: 5,
        borderBottomWidth: 1
   },
   ImageView:{
        //backgroundColor: 'red',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
   },
   messageView:{
        flex:5,
        //backgroundColor: 'green',
        justifyContent: 'center'


   },
   CountView:{
        flex:1,
        alignItems: 'center',
        //backgroundColor: 'orange',
        justifyContent: 'center'

   },
   CountText:{
        backgroundColor: 'orange',
        color: 'white',
        width: '50%',
        borderRadius: 50

   },
   image:{
        height: '90%',
        width:'75%',
        borderRadius: 50

   },
   loader:{
       marginTop:'5%'
   }
})