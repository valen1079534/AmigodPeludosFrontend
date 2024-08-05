import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, View, TouchableOpacity, Alert, StyleSheet, Text } from "react-native";
import axiosClient from "../../api/axiosClient";
import IconEyes from "../atomos/IconEyes";
import { useNavigation } from "@react-navigation/native";
import { IP } from "../../api/Ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Historial() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const [idUser, setIdUser] = useState(null);
    const [idRol, setIdRol] = useState(null);


    const getMascota = async () => {
        try {
            const response = await axiosClient.get(`/dog/getEstadoAdop`);
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log('Error del servidor', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userValue = await AsyncStorage.getItem('user');
            if (userValue !== null) {
                const response = JSON.parse(userValue);
                setIdUser(response.id_users);
                setIdRol(response.rol_user);
            }
            console.log('Id usuario adoptante', idUser, idRol);
        };
        fetchUserData();
    }, [idUser, idRol]);

    useEffect(() => {
        getMascota();
    }, []);

    const handleBuscar = async (id, estado) => {
        if (estado === 'adoptada') {
            Alert.alert('Mascota adoptada', 'Esta mascota ya ha sido adoptada.');
        } else {
            navigation.navigate('Mascota Aadoptada', { dogId: id });
        }
    };

    const getCardStyle = (estado) => {
        return {
            ...styles.card,
            backgroundColor: estado === 'adoptada' ? '#d3d3d3' : '#fff', 
        };
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => String(item.id_dog)}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}>
                            <View style={getCardStyle(item.estado_dog)}> 
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: `${IP}/img/${item.imagen_dog}` }}
                                        style={styles.image}
                                        onError={(error) => console.log('Error al cargar imagen:', error.nativeEvent.error)}
                                    />
                                    <TouchableOpacity
                                        style={styles.iconEyes}
                                        onPress={() => handleBuscar(item.id_dog, item.estado_dog)}>
                                        <IconEyes />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.infoContainer}>
                                    <Text style={styles.name}>{item.nombre_dog}</Text>
                                    <Text style={styles.age}>{item.edad_dog} años</Text>
                                    <Text style={styles.sex}>{item.sexo_dog}</Text>
                                    <Text style={styles.sex} > {item.estado_dog}  </Text>
                                    <Text style={styles.location}>{item.descripcion_dog}</Text>
                                    <Text style={styles.location}>DUEÑO DE LA MASCOTA</Text>
                                    <Text style={styles.location}> adoptante: {item.nombre_user}</Text>
                                    <Text style={styles.location}> telefono: {item.telefono_user}</Text>                                            
                                </View>

                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    cardContainer: {
        flex: 1,
        marginBottom: 10,
        color: '#000'
    },
    card: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        color: '#000'
    },
    imageContainer: {
        flex: 1,
        position: 'relative',
        height: 200,
        color: '#000'
    },
    image: {
        flex: 1,
        borderRadius: 10,
        resizeMode: 'cover',
        width: '100%',
        height: 300,
        color: '#000'
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#000'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    iconEyes: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    age: {
        fontSize: 14,
        color: '#999',
    },
    sex: {
        fontSize: 14,
        color: '#999',
    },
    location: {
        fontSize: 14,
        color: '#999',
    },
});

export default Historial;
