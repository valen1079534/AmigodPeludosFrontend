import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View, StyleSheet, TouchableOpacity, Alert, Modal } from "react-native";
import axiosClient from "../../api/axiosClient";
import IconEyes from "../atomos/IconEyes";
import IconDelete from "../atomos/IconDelete";
import IconEdit from "../atomos/IconEdit";
import { useNavigation } from "@react-navigation/native";
import { IP } from "../../api/Ip";
import Registro from "./Registro";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
    const [petToEdit, setPetToEdit] = useState(null);
    const navigation = useNavigation();
    const [idUser, setIdUser] = useState(null); 
    const [idRol, setIdRol] = useState(null);
    const [title, setTitle] = useState('')
    const [petId, setPetId] = useState('')

    const getMascota = async () => {
        try {
            const response = await axiosClient.get(`/dog/estadoMascota`);
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

    const deleteMascota = async (id) => {
        try {
            await axiosClient.delete(`/dog/mascota/${id}`).then((response) => {
                if (response.status === 200) {
                    console.log('Mascota eliminada');
                    getMascota();
                    Alert.alert('Mascota eliminada con éxito');
                } else {
                    Alert.alert('Error al eliminar mascota');
                }
            });
        } catch (error) {
            console.log('Error servidor, en eliminar mascota', error);
        }
    };

    const handleBuscar = async (id) => {
        navigation.navigate('Adoptame', { dogId: id });
    };

    const handleSubmit = (accion, pet, petId) => {
        setTitle(accion)
        setModalVisible(!modalVisible);
        setSelectedPet(pet);
        setPetId(petId)
    };

    const handleDelete = (pet) => {
        setPetToDelete(pet);
        setConfirmDeleteVisible(true);
    };

    const confirmDelete = () => {
        if (petToDelete) {
            deleteMascota(petToDelete.id_dog);
            setPetToDelete(null);
        }
        setConfirmDeleteVisible(false);
    };

    const cancelDelete = () => {
        setPetToDelete(null);
        setConfirmDeleteVisible(false);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedPet(null);
        getMascota();
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
                ) : (
                <>
                 {idRol === 'administrador' && (  
                <TouchableOpacity onPress={() => handleSubmit('Registrar')} style={{backgroundColor: '#6e1313', fontWeight: 'bold', borderRadius: 50, marginTop: 20, width:250, alignItems: 'center', height: 30, justifyContent: 'center', marginBottom: 20, color: '#fff'}} >
                    <Text style={{color: '#fff', fontWeight: 'bold'}} > Registrar mascota </Text>
                </TouchableOpacity>
                 )}
                <FlatList 
                    data={data}
                    keyExtractor={(item) => String(item.id_dog)}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}>
                            <View style={styles.card}> 
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: `${IP}/img/${item.imagen_dog}` }}      
                                        style={styles.image}
                                        onError={(error) => console.log('Error al cargar imagen:', error.nativeEvent.error)}                   
                                    />       
                                    <TouchableOpacity 
                                        style={styles.iconEyes} 
                                        onPress={() => handleBuscar(item.id_dog)}>
                                        <IconEyes />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.infoContainer}>
                                    <Text style={styles.name}>{item.nombre_dog}</Text>
                                    <Text style={styles.age}>{item.edad_dog} años</Text>
                                    <Text style={styles.sex}>{item.sexo_dog}</Text>
                                    <Text style={styles.location}>{item.descripcion_dog}</Text>
                                </View>

                             {idRol === 'administrador' && (  
                                    <View style={styles.iconActionsContainer}>
                                        <TouchableOpacity onPress={() => handleSubmit('Actualizar', item, item.id_dog)} style={styles.iconButton}>
                                            <IconEdit />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.iconButton}>
                                            <IconDelete />
                                        </TouchableOpacity>

                                    </View>
                                )} 
                            </View>
                        </View>
                        
                    )}
                />
                </>
                )}
            

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    {/* {selectedPet && ( */}
                        <Registro
                            dogData={selectedPet} 
                            dogId={petId} 
                            title={title}
                            closeModal={closeModal}
                            datos={getMascota} 
                        />
                   {/*  )} */}
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmDeleteVisible}
                onRequestClose={() => {
                    setConfirmDeleteVisible(!confirmDeleteVisible);
                }}
            >
                <View style={styles.confirmDeleteModalView}>
                    <View style={styles.confirmDeleteContent}>
                        <Text style={styles.confirmDeleteText}>¿Estás seguro de que deseas eliminar esta mascota?</Text>
                        <View style={styles.confirmDeleteButtons}>
                            <TouchableOpacity style={styles.confirmDeleteButton} onPress={confirmDelete}>
                                <Text style={styles.confirmDeleteButtonText}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmDeleteButton} onPress={cancelDelete}>
                                <Text style={styles.confirmDeleteButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'f8f8f8',
    },
    cardContainer: {
        flex: 1,
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    imageContainer: {
        flex: 1,
        position: 'relative',
        height: 200,
    },
    image: {
        flex: 1,
        borderRadius: 10,
        resizeMode: 'cover',
        width: '100%',
        height: 300
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
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
    iconActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
    },
    iconButton: {
        marginHorizontal: 5,
    },
    breed: {
        fontSize: 16,
          color: '#000'
    },
    age: {
        fontSize: 14,
         color: '#000'
    },
    sex: {
        fontSize: 14,
          color: '#000'
    },
    location: {
        fontSize: 14,
          color: '#000'
    },
    category: {
        fontSize: 14,
          color: '#000'
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        color: '#000'
    },
    confirmDeleteModalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    confirmDeleteContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    confirmDeleteText: {
        fontSize: 16,
        marginBottom: 20,
        color:'#000'
    },
    confirmDeleteButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmDeleteButton: {
        backgroundColor: '#6e1313',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        flex: 1,
        alignItems: 'center',
    },
    confirmDeleteButtonText: {
        color: '#fff',
        fontSize: 16,
    },

    confirmEdit: {
        backgroundColor: '#000',
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    confirmEdit: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Home;
