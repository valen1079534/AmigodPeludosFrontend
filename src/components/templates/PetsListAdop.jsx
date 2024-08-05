import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axiosClient from "../../api/axiosClient";
import { IP } from "../../api/Ip";

function PetsListAdops() {
    const route = useRoute();
    const { dogId } = route.params;
    const [mascota, setMascota] = useState(null);
    const [idUser, setIdUser] = useState(null); 

    const MascotaDatosBusqueda = async () => {
        try {
            console.log('Hola Id de la mascota', dogId);

            await axiosClient.get(`/dog/mascota/${dogId}`).then((response) => {
                if (response.status === 200) {
                    if (response.data[0]) {
                        console.log('Busqueda de la mascota', response.data[0]);
                        setMascota(response.data[0]);
                        console.log('Nombre mascota', response.data[0].nombre_dog);
                    }
                } else {
                    console.log('Error al obtener la mascota' + response.data.message);
                }
            });
        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    };

    useEffect(() => {
        MascotaDatosBusqueda();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userValue = await AsyncStorage.getItem('user');
            if (userValue !== null) {
                const response = JSON.parse(userValue);
                setIdUser(response.id_users); 
            }
            console.log('Id usuario adoptante', idUser);
        };
        fetchUserData();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                {mascota ? (
                    <>
                        <Text style={styles.title}>{mascota.nombre_dog}</Text>
                        <Image
                            source={{ uri: `${IP}/img/${mascota.imagen_dog}` }}
                            style={styles.image}
                            onError={(error) => console.log('Error al cargar la imagen', error)}
                        />

                        <View style={styles.details}>
                            <Text style={styles.detailText}> {mascota.edad_dog} || {mascota.sexo_dog} || {mascota.nombre_razas} || {mascota.nombre_categoria} || {mascota.ubicacion_dog}</Text>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.subtitle} >Historial Medico</Text>
                            <Text style={styles.historyText} > Mascota esterilizada: {mascota.esterilizado_dog} </Text>
                            <Text style={styles.historyText} >Vacunas: {mascota.fk_vacunas} </Text>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.subtitle}>Descripción</Text>
                            <Text style={styles.descriptionText}>{mascota.descripcion_dog}</Text>
                        </View>

                        <View style={styles.historyContainer}>
                            <Text style={styles.subtitle}>Historia Mascota</Text>
                            <Text style={styles.historyText}>{mascota.historia_dog}</Text>
                        </View>
                    </>
                ) : (
                    <Text style={styles.notFound}>No se encontró la mascota</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
        backgroundColor: '#fff3f3',
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 15,
        resizeMode: 'cover'
    },
    details: {
        marginBottom: 20
    },
    detailText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 5
    },
    descriptionContainer: {
        marginBottom: 20
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333'
    },
    descriptionText: {
        fontSize: 16,
        color: '#000',
        lineHeight: 24
    },
    historyContainer: {
        marginBottom: 20
    },
    historyText: {
        fontSize: 16,
        color: '#000',
        lineHeight: 24
    },
    button: {
        backgroundColor: '#6e1313',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    notFound: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
        marginTop: 20
    }
});

export default PetsListAdops;
