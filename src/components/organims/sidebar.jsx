import React, { useContext, useEffect, useState } from 'react';
import { Modal, View, StyleSheet, Animated, TouchableWithoutFeedback, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoSidebar from '../atomos/LogoSidebar';
import { AuthContext } from '../../context/AuhtContext';

const SideBar = ({ visible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(-300));
  const [selectedButton, setSelectedButton] = useState('');
/*   const [idUser, setIdUser] = useState(null);  */
 /*  const {rolUser, setRolUser} = useContext(AuthContext) */
/*  const {rolUser} = useContext(AuthContext) */
  const [rolUser, setRolUser] = useState(null);

  const navigation = useNavigation();

  const {rol} = useContext(AuthContext)
  console.log('Rol', rol)

  useEffect(() => {
    const fetchUserData = async () => {
        const userValue = await AsyncStorage.getItem('user');
        if (userValue !== null) {
           /*  const response = JSON.parse(userValue);
            setIdUser(response.id_users);  */
            const userRol = response.rol.toLowerCase();
            setRolUser(userRol);
        }
        /* console.log('Id usuario', idUser); */
    };
    fetchUserData();
  }, []); // Dependencias vacías para ejecutar solo una vez al montar el componente

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -300,
      duration: visible ? 500 : 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
    onClose();
    setSelectedButton(screenName); 
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
   
      Alert.alert('Felicidades, se cerró sesión de forma exitosa');
      navigation.navigate('Login');
      onClose();
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      Alert.alert('Error al cerrar sesión');
    }
  };

  const buttonStyle = (buttonName) => ({
    ...styles.button,
    backgroundColor: selectedButton === buttonName ? 'white' : 'transparent',
  });

  const textStyle = (buttonName) => ({
    ...styles.buttonText,
    color: selectedButton === buttonName ? 'black' : 'white',
  });

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
              <View style={styles.imageContainer}>
                <LogoSidebar />
              </View>
              <View style={styles.divider} />

            {/*   {rol === 'administrador' && ( */}

                <>
                  <TouchableOpacity
                    style={buttonStyle('Solicitudes')}
                    onPress={() => handlePress('Solicitudes')}
                  >
                    <Text style={textStyle('Solicitudes')}>Solicitudes</Text>
                  </TouchableOpacity>
                </>
             {/*  )} */}

              <>
              <TouchableOpacity
                style={buttonStyle('Perfil')}
                onPress={() => handlePress('Perfil')}
              >
                <Text style={textStyle('Perfil')}>Mi Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={buttonStyle('Historial')}
                onPress={() => handlePress('Historial')}
              >
                <Text style={textStyle('Historial')}>Historial</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
              </TouchableOpacity>
              </>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
  },
  sidebar: {
    width: 270,
    height: '100%',
    backgroundColor: '#6e1313',
    padding: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  logoutText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SideBar;
