import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Logo from "../atomos/Logo";

const Login = () => {
    const navigation = useNavigation();
    
    const [data, setData] = useState({
        email_user: '',
        password_user: '',
    });

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleInputChange = (name, value) => {
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async () => {

      const { email_user, password_user} = data;

      if(!email_user || !password_user){
        Alert.alert('Todos los campos son obligatorios')
        return
      }

        try {
            const baseURL = `http://192.168.0.109:4300/auth/validar`;
            const response = await axios.post(baseURL, data);

            if (response.status === 200) {
                navigation.navigate('Home');
                Alert.alert('¡BIENVENIDO!');
                setData({
                    email_user: '',
                    password_user: '',
                })

                const { token } = response.data;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('user', JSON.stringify(response.data.user[0]));
            }

            console.log('Hola', response.data);
            console.log(response.status);

        } catch (error) {
            if (error.response && error.response) {
                Alert.alert('Usuario o contraseña incorrecta');
            } else {
                console.error(error);
                Alert.alert('Error del servidor', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Amigos Peludos</Text>
                <Logo />

                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    placeholderTextColor="#000"
                    value={data.email_user}
                    onChangeText={(text) => handleInputChange('email_user', text)}
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#000"

                        value={data.password_user}
                        onChangeText={(text) => handleInputChange('password_user', text)}
                        secureTextEntry={secureTextEntry}
                    />

                    <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeButton}>
                        <Image
                            style={styles.eyeIcon}
                            source={secureTextEntry ? require('./../../../assets/eyeSecurity.png') : require('./../../../assets/securityEye.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Registro de usuario')}>
                    <Text style={styles.registerText}>Registrar usuario</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff3f3', 
    },
    inputContainer: {
        marginBottom: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6D041F', 
        marginBottom: 16,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#000', 
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 30,
        color: '#000', 

    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        color: '#D1DFBB',
        borderRadius: 50
    },
    eyeIcon: {
        width: 20,
        height: 20,
        borderRadius: 50
    },
    loginButton: {
        backgroundColor: '#6e1313', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 200,
        marginLeft: 90
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    registerContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    registerText: {
        color: '#6e1313',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Login;
 


/* import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Login = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
     email_user: '',
    password_user: ''
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);


  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () =>{
   
    try {
      const baseURL = `http://10.0.2.2:4300/auth/validar`;

      const response = await axios.post(baseURL, formData)
      
        if(response.status === 200){
            navigation.navigate('Bienvenido');
            Alert.alert('Bienvenido');
          }
          
      console.log('Info', response.data);
      console.log(response.status);

      
        const { token } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user[0]));
        
        const tokenAsyng = await AsyncStorage.getItem('token')

    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Usuario no registrado');
      } else {
        console.error(error);
        Alert.alert('Error del servidor ',error);
      }
    }
  }

  return (
    <>
  
      <View style={styles.container}>
        <Text style={styles.titulo}> ¡Haz parte de esta bonita familia ! </Text>
        
        <View>
          <Text style={styles.titulo}>INICIAR SESION </Text>
          <TextInput style={styles.input} placeholderTextColor="#000"  value={formData.email_user} onChangeText={(text) => handleInputChange('email_user', text)} placeholder='Correo'/>
          <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholderTextColor="#000"
            value={formData.password_user}
            onChangeText={(text) => handleInputChange('password_user', text)}
            placeholder="Contraseña"
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Image
              style={styles.eyeIcon}
              source={secureTextEntry ? require('./../../../assets/eyeSecurity.png') : require('./../../../assets/securityEye.png')}
            />
          </TouchableOpacity>
        </View>
          <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
            <Text style={styles.textoBoton}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
        <View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },

  input: {
    height: 40,
    width:300,
    backgroundColor: 'rgb(255, 215, 100)',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  boton: {
    backgroundColor: 'rgb(255, 165, 0)',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 10,
    height:40
  },
  textoBoton: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imagen: {
    marginBottom: 10,
    height: 230,
    width: 230,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'rgb(255, 215, 100)',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    
  },
  
  eyeIcon: {
    width: 24,
    height: 24,
  },
});

export default Login; */