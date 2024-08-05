import React from "react";
import { Image, View } from "react-native";

const Logo = () => {
    return(
        <View>
            <Image 
                source={require('../../../assets/logoD.jpeg')}
                style={{width: 200, height: 200, borderRadius: 100, alignContent: 'center', marginLeft: 20, marginBottom:20}}
            />
        </View>
    )
}

export default Logo