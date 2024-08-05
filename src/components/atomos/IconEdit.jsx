import React from "react";
import { Image, View } from "react-native";

const InconEdi = () => {
    return(
        <View>
            <Image
                source={require('../../../assets/IconoEdit.png')}
                style={{width: 30, height: 30}}
            />
        </View>
    )
}

export default InconEdi