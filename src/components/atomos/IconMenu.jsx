import React from "react";
import { Image, View } from "react-native";

const IconMenu = () => {
    return(
        <View>
            <Image
                source={require('../../../assets/iconMenu.png')}
                style={{width: 20, height: 20}}
            />
        </View>
    )
}

export default IconMenu