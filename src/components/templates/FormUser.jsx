import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import axiosClient from "../../api/axiosClient";

const FormUser = ({ datos, closeModal }) => {
    const navigation = useNavigation();

    const [data, setData] = useState({
        nombre_user: '',
        cedula_user: '',
        email_user: '',
        telefono_user: '',
        password_user: '',
    });

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleTextInputChange = (name, value) => {
        setData({ ...data, [name]: value });
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

  /*   const isUniqueEmail = async (email) => {
        try {
            const response = await axiosClient.get(`/users/usuarios?email=${email}`);
            return response.data.length === 0;
        } catch (error) {
            console.log('Error en el servidor', error);
            return false;
        }
    }; */

    const handleSubmit = async () => {

        if (!data.nombre_user || !data.cedula_user || !data.email_user || !data.telefono_user || !data.password_user) {
            Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
            return false;
        }

        if (!isValidEmail(data.email_user)) {
            Alert.alert('Correo inválido', 'Por favor ingresa un correo válido.');
            return;
        }

      /*   const uniqueEmail = await isUniqueEmail(data.email_user);
        if (!uniqueEmail) {
            Alert.alert('Correo duplicado', 'El correo ya está registrado. Por favor ingresa un correo diferente.');
            return;
        } */

        try {
            await axiosClient.post(`/users/usuarios`, data).then((response) => {
                if (response.status === 200) {
                    Alert.alert('Usuario Registrado');
                    navigation.navigate('Login');
                    datos();
                    closeModal();
                } else {
                    Alert.alert('No se registró el usuario');
                }
            });
        } catch (error) {
            console.log('Error en el servidor', error);
        }
    };

    
    return (
      
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Registro de usuario</Text>

                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        value={data.nombre_user}
                        onChangeText={(value) => handleTextInputChange('nombre_user', value)}
                    />

                    <Text style={styles.label}>Cédula:</Text>
                    <TextInput
                        style={styles.input}
                        value={data.cedula_user}
                        onChangeText={(value) => handleTextInputChange('cedula_user', value)}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={data.email_user}
                        onChangeText={(value) => handleTextInputChange('email_user', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput
                        style={styles.input}
                        value={data.telefono_user}
                        onChangeText={(value) => handleTextInputChange('telefono_user', value)}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Contraseña:</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, styles.passwordInput]}
                            value={data.password_user}
                            onChangeText={(value) => handleTextInputChange('password_user', value)}
                            secureTextEntry={secureTextEntry}
                        />
                        <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeButton}>
                            <Image
                                style={styles.eyeIcon}
                                source={secureTextEntry ? require('./../../../assets/eyeSecurity.png') : require('./../../../assets/securityEye.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowRadius: 5,
        elevation: 5,
        width: '100%',
        height: '90%'
    },
    scrollView: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6D041F', 
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
        marginLeft: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 20,
        marginBottom: 15,
        backgroundColor: '#f8f8f8',
        color: '#333',
        width: '100%',
        height: '20'
    },
    passwordContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    passwordInput: {
        paddingRight: 40,
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    eyeIcon: {
        width: 20,
        height: 20,
    },
    button: {
        backgroundColor: '#6D041F', 
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FormUser;

