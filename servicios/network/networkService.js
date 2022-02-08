
import * as Network from 'expo-network';


export const getNetworkStatus = async () => {

    const networkStatus =  await Network.getNetworkStateAsync(); 
    console.log(networkStatus) 
    return networkStatus;
}

