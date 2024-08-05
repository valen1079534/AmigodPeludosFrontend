import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../api/axiosClient';
import { IP } from '../../api/Ip';

const Perfil = () => {
    
    const [formData, setFormData] = useState({
        nombre_user: '',
        cedula_user: '',
        email_user: '',
        telefono_user: '',
        password_user: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userValue = await AsyncStorage.getItem('user');
                if (userValue) {
                    const user = JSON.parse(userValue);
                    setFormData(user);
                } else {
                    console.log('No hay datos del usuario en almacenamiento local');
                }

                const response = await axiosClient.get(`${IP}/users/usuarios/${formData.id_users}`);
                if (response.data) {
                    setFormData(response.data[0]);
                    console.log('Usuario:', response.data[0]);
                }
            } catch (error) {
                console.log('Error de fetching de data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axiosClient.put(`${IP}/users/usuarios/${formData.id_users}`, formData);
            if (response.status === 200) {
                Alert.alert('Perfil actualizado con éxito');
                await AsyncStorage.setItem('usuarios', JSON.stringify(formData));
            } else {
                Alert.alert('Error al actualizar el perfil');
            }
        } catch (error) {
            console.log('Error al actualizar el perfil:', error);
            Alert.alert('Error del servidor', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de usuario</Text>
            <View style={styles.profileSection}>
                <Text>Nombre:</Text>
                <TextInput
                    style={styles.textData}
                    value={formData.nombre_user}
                    onChangeText={(text) => handleChange('nombre_user', text)}
                />
                <Text>Email:</Text>
                <TextInput
                    style={styles.textData}
                    value={formData.email_user}
                    onChangeText={(text) => handleChange('email_user', text)}
                />
                <Text>Cédula:</Text>
                <TextInput
                    style={styles.textData}
                    value={formData.cedula_user}
                    onChangeText={(text) => handleChange('cedula_user', text)}
                />
                <Text>Teléfono:</Text>
                <TextInput
                    style={styles.textData}
                    value={formData.telefono_user}
                    onChangeText={(text) => handleChange('telefono_user', text)}
                />
                <Text>Contraseña:</Text>
                <TextInput
                    style={styles.textData}
                    value={formData.password_user}
                    secureTextEntry
                    onChangeText={(text) => handleChange('password_user', text)}
                />
            </View>
           
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
        alignItems: 'center'
    },
    profileSection: {
        marginBottom: 20,
    },
    textData: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 40,
        padding: 10,
        marginBottom: 15,
        color: '#000',
        fontSize: 25
    },
    button: {
        backgroundColor: '#6e1313',
        padding: 15,
        borderRadius: 40,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Perfil;
