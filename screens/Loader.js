import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';

const Loader = (props) =>{
    const {loading} = props;
    return (
     <Modal
     transparent={true}
     animationType={'none'}
     visible={loading}>
    <View 
    style={style.modalBackground}>
        <View style={style.ActivityIndicatorwrapper}>
            <ActivityIndicator
            animating={loading} size="large" color="#409dc4"/>
         
        </View>
    </View>
     </Modal>
    );

    
}
const style = StyleSheet.create({
    modalBackground:{
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    ActivityIndicatorwrapper:{
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius:10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }     
})

export default Loader;