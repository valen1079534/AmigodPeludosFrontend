import React from "react";
import { Image, View } from "react-native";

const InconEye = () => {
    return(
        <View>
            <Image
                source={require('../../../assets/OjoIcono.webp')}
                style={{width: 40, height: 40}}
            />
        </View>
    )
}

export default InconEye