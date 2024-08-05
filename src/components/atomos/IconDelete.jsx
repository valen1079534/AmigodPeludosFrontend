import React from "react";
import { Image, View } from "react-native";

const IconDelete = () => {
    return(
        <View>
            <Image
                source={require('../../../assets/IconoEliminar.png')}
                style={{width: 30, height: 30}}
            />
        </View>
    )
}

export default IconDelete