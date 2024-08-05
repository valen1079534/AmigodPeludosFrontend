/* import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axiosClient from '../../api/axiosClient'

const Solicitudes = () => {

  const [solicitudes, setSolicitudes] = useState([])
  const navigation = useNavigation()

  useEffect(() => {

    const fetchUser = async () => {
      const userValue = await AsyncStorage.getItem('user')
      if(userValue !== null){
        const response = JSON.parse(userValue)
        rolUser = response.rol_user
        idUser = response.id_user
      }
      console.log('User async', rolUser);
    }
    fetchUser()
  }, [])
  
  const getSolicitudes = async () => {
    try {
      const response = await axiosClient.get(`/dog/estadoSolicitud`)
      console.log('solicitudes listadas', response.data)
      setSolicitudes(response.data)
    } catch (error) {
      console.log('Error del servidor para listar solicitudes' + error);
    }
  }

  useEffect(() => {
    getSolicitudes()
  }, [])

  const deleteSolicitud = async (id, idPet) => {
    try {
        await axiosClient.delete(`dog/solicitud/${id}`).then((response) =>{
          if(response.status === 200){
            console.log('Solicitud cancelada')
            Alert.alert('Solictud cancelada con éxito')
            handleCancelPet(idPet)
            getSolicitudes()
          }else{
            Alert.alert('Error al eliminar la solicitud')
          }
        })
    } catch (error) {
      console.log('Error del servidor al eliminar solicitud' + error);
    }
  }

  const hanleAccept = async (id, idPet) => {
    try {
         await axiosClient.put(`/dog/solicitudAceptar/${id}`).then((response) => {
          if(response.status === 200){
            console.log('Solicitud aceptada')
            Alert.alert('Solicitud aceptada con éxito')
            handleAdoptMascota(idPet)
            getSolicitudes()
          }else{
            Alert.alert('Error al aceptar la solicitud')
          }
         })
    } catch (error) {
        console.log('Error del servidor en funcion de aceptar' + error);
    }
  }

  const handleAdoptMascota = async (idPet) => {
    try {
        await axiosClient.put(`/dog/mascotaAdop/${idPet}`).then((response) => {
          if(response.status == 200){
            console.log('Mascota adoptada');
            navigation.navigate('Home')
          }else{
            console.log('Error al adoptar mascota');
          }
        })
    } catch (error) {
      console.log('Error del servidor para cambiar estado de mascota' + error);
    }
  }

  const handleCancelPet = async(idPet) => {
    try {
       await axiosClient.put(`/dog/mascotaNoAdop/${idPet}`).then((response) => {
        if(response.status == 200){
          console.log('Mascota disponible');
          navigation.navigate('Home')
        }else{
          console.log('Error al poner en disponibilidad la mascota');
        }
       })
    } catch (error) {
      console.log('Error del servidor para poner en disponibilidad mascoga' + error);
    }
  }
  return (
    <>
        <ScrollView  contentContainerStyle={styles.container}>  
            {solicitudes.length>0 ? (
            <FlatList 
              data={solicitudes}
              keyExtractor={item => item.id_dog}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'column' }}>
                  <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 45  }}>
                        <Text style={styles.texto2}> Mascota </Text>
                       
                        <Text style={styles.texto}> {item.id_dog}- {item.nombre_dog} </Text>
                       
                      </View>

                      <View style={{ flexDirection: 'column', alignItems: 'center'  }}>
                        <Text style={styles.texto2}> Adoptante </Text>
                       
                        <Text style={styles.texto}> Nombre:{item.nombre_user} </Text>
                        <Text style={styles.texto}> Telefono:{item.telefono_user} </Text>
                        <Text style={styles.texto}> Email:{item.email_user} </Text>
                      </View>

                    </View>
                  <View style={styles.buttonAcciones}>
                    <TouchableOpacity onPress={() => hanleAccept(item.id_solicitud, item.id_dog)} style={styles.buttonAcept}>
                      <Text style={styles.textoButton}> Aceptar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteSolicitud(item.id_solicitud, item.id_dog)} style={styles.buttonCancel}>
                      <Text style={styles.textoButton}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                  </View>
                </View>
              )}
              />
      
          ): (
            <Text  style={styles.title2}> Aun no tienes adopciones </Text>
          )}
          
        </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    height: 200,
  },
 
  texto: {
    fontSize: 20,
    color: '#000'
  },
  texto2: {
    fontSize: 20,
    color: '#000',
    fontWeight:'bold'
  },

  title2: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  buttonAcciones: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonAcept: {
    backgroundColor: '#6e1313',
    padding: 10,
    borderRadius: 50,
    width: 130,
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  buttonCancel: {
    backgroundColor: 'black',
    color: 'black',
    padding: 10,
    borderRadius: 50,
    width: 130,
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  textoButton: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white'
  },
})


export default Solicitudes 

 */

import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axiosClient from '../../api/axiosClient'

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const fetchUser = async () => {
      const userValue = await AsyncStorage.getItem('user')
      if (userValue !== null) {
        const response = JSON.parse(userValue)
        rolUser = response.rol_user
        idUser = response.id_user
        console.log('User async', rolUser, idUser);
      }
    }
    fetchUser()
  }, [])

  const getSolicitudes = async () => {
    try {
      const response = await axiosClient.get(`/dog/estadoSolicitud`)
      console.log('solicitudes listadas', response.data)
      setSolicitudes(response.data)
    } catch (error) {
      console.log('Error del servidor para listar solicitudes', error)
    }
  }

  useEffect(() => {
    getSolicitudes()
  }, [])

  const deleteSolicitud = async (id, idPet) => {
    try {
      const response = await axiosClient.delete(`dog/solicitud/${id}`)
      if (response.status === 200) {
        console.log('Solicitud cancelada')
        Alert.alert('Solictud cancelada con éxito')
        handleCancelPet(idPet)
        getSolicitudes()
      } else {
        Alert.alert('Error al eliminar la solicitud')
      }
    } catch (error) {
      console.log('Error del servidor al eliminar solicitud', error)
    }
  }

  const hanleAccept = async (id, idPet) => {
    try {
      const response = await axiosClient.put(`/dog/solicitudAceptar/${id}`)
      if (response.status === 200) {
        console.log('Solicitud aceptada')
        Alert.alert('Solicitud aceptada con éxito')
        handleAdoptMascota(idPet)
        getSolicitudes()
      } else {
        Alert.alert('Error al aceptar la solicitud')
      }
    } catch (error) {
      console.log('Error del servidor en funcion de aceptar', error)
    }
  }

  const handleAdoptMascota = async (idPet) => {
    try {
      const response = await axiosClient.put(`/dog/mascotaAdop/${idPet}`)
      if (response.status == 200) {
        console.log('Mascota adoptada')
      } else {
        console.log('Error al adoptar mascota')
      }
    } catch (error) {
      console.log('Error del servidor para cambiar estado de mascota', error)
    }
  }

  const handleCancelPet = async (idPet) => {
    try {
      const response = await axiosClient.put(`/dog/mascotaNoAdop/${idPet}`)
      if (response.status == 200) {
        console.log('Mascota disponible')
        navigation.navigate('Home')
      } else {
        console.log('Error al poner en disponibilidad la mascota')
      }
    } catch (error) {
      console.log('Error del servidor para poner en disponibilidad mascota', error)
    }
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        
        {solicitudes.length > 0 ? (
          <FlatList
            data={solicitudes}
            keyExtractor={item => item.id_dog}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'column' }}>
                <View style={styles.card}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 45 }}>
                      <Text style={styles.texto2}> Mascota </Text>
                      <Text style={styles.texto}> {item.id_dog}- {item.nombre_dog} </Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                      <Text style={styles.texto2}> Adoptante </Text>
                      <Text style={styles.texto}> Nombre: {item.nombre_user} </Text>
                      <Text style={styles.texto}> Telefono: {item.telefono_user} </Text>
                      <Text style={styles.texto}> Email: {item.email_user} </Text>
                    </View>
                  </View>
                  <View style={styles.buttonAcciones}>
                    <TouchableOpacity onPress={() => hanleAccept(item.id_solicitud, item.id_dog)} style={styles.buttonAcept}>
                      <Text style={styles.textoButton}> Aceptar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteSolicitud(item.id_solicitud, item.id_dog)} style={styles.buttonCancel}>
                      <Text style={styles.textoButton}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.title2}> Aun no tienes solicitudes de adopciones </Text>
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    height: 200,
  },
  texto: {
    fontSize: 20,
    color: '#000'
  },
  texto2: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  },
  title2: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  buttonAcciones: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonAcept: {
    backgroundColor: '#6e1313',
    padding: 10,
    borderRadius: 50,
    width: 130,
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  buttonCancel: {
    backgroundColor: 'black',
    color: 'black',
    padding: 10,
    borderRadius: 50,
    width: 130,
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  textoButton: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white'
  },
})

export default Solicitudes
