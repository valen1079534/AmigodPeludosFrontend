import React from "react";
import { Image, View } from "react-native";

const IconsX = () => {
    return(
        <View>
            <Image 
                source={require('../../../assets/IconX.png')}
                style={{width: 20, height: 20}}
            />
        </View>
    )
}

export default IconsX