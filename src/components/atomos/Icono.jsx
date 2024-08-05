import React from "react";
import { Image, View } from "react-native";

const IconoApp = () => {
    return(
        <View>
            <Image
                source={require('./../../../assets/IconoFalso.png')}
                style={{borderRadius: 20, borderColor: '#000', width: 100, height: 100}}
            />
        </View>
    )
}

export default IconoApp