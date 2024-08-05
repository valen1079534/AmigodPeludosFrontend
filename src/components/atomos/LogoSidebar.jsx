import React from "react";
import { Image, View } from "react-native";

const LogoSidebar = () => {
    return(
        <View>
            <Image 
                source={require('../../../assets/logoD.jpeg')}
                style={{width: 150, height: 150, borderRadius: 100, alignContent: 'center',  marginBottom:20}}
            />
        </View>
    )
}

export default LogoSidebar