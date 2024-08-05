import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axiosClient from "../../api/axiosClient";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { IP } from "../../api/Ip";
import IconsX from "../atomos/IconsX";

function Registro({ dogData, dogId, closeModal, datos, title }) {
    const [data, setData] = useState({
        nombre_dog: dogData ? dogData.nombre_dog : '',
        edad_dog: dogData ? dogData.edad_dog : '',
        sexo_dog: dogData ? dogData.sexo_dog : '',
        descripcion_dog: dogData ? dogData.descripcion_dog : '',
        historia_dog: dogData ? dogData.historia_dog : '',
        /* estado_dog: dogData ? dogData.estado_dog : '',  */ 
        ubicacion_dog: dogData ? dogData.ubicacion_dog : '',
        esterilizado_dog: dogData ? dogData.esterilizado_dog : '',
        fk_categoria: dogData ? dogData.fk_categoria : '',
        fk_razas: dogData ? dogData.fk_razas : '',
        fk_vacunas: dogData ? dogData.fk_vacunas : '',
        fk_municipios: dogData ? dogData.fk_municipios : '',
        fk_users: dogData ? dogData.fk_users : '',
        imagen_dog: dogData ? { uri: `${IP}/img/${dogData.imagen_dog}` } : '',
        imagenNameFile: '', // Almacenar Nombre del archivo
    });

    const navigation = useNavigation();

    const [municipios, setMunicipios] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [razas, setRazas] = useState([]);
    const [usuario, setUsuario] = useState([]); 

    useEffect(() => {
        axiosClient.get(`/dog/municipio`).then((response) => {
            let atemp = response.data.map((item) => ({ key: item.id_municipio, value: item.nombre_municipio }));
            setMunicipios(atemp);
        });
    }, []);

    useEffect(() => {
        axiosClient.get(`/dog/razas`).then((response) => {
            let atemp = response.data.map((item) => ({ key: item.id_razas, value: item.nombre_razas }));
            setRazas(atemp);
        });
    }, []);

    useEffect(() => {
        axiosClient.get(`/dog/categoria`).then((response) => {
            let atemp = response.data.map((item) => ({ key: item.id_categoria, value: item.nombre_categoria }));
            setCategoria(atemp);
        });
    }, []);

   useEffect(() => {
        axiosClient.get(`/users/usuarios`).then((response) => {
            let atemp = response.data.map((item) => ({ key: item.id_users, value: item.nombre_user }));
            setUsuario(atemp);
        });
    }, []); 

    const handleTextInputChange = (name, value) => {
        setData({ ...data, [name]: value });
    };

    const handleImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker error', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri };
                const fileName = response.assets[0].fileName;  // Obtener el nombre del archivo original
                setData({ ...data, imagen_dog: source, imagenNameFile: fileName });
            }
        });
    };

    const handleSubmit = async () => {

        if(!data.nombre_dog || !data.edad_dog || !data.sexo_dog || !data.descripcion_dog || !data.ubicacion_dog || !data.esterilizado_dog || !data.historia_dog || !data.fk_categoria || !data.fk_razas || !data.fk_vacunas || !data.fk_municipios || !data.fk_municipios ){
            Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
            return false
        }

        try {
            const formData = new FormData();

            formData.append('nombre_dog', data.nombre_dog);
            formData.append('edad_dog', data.edad_dog);
            formData.append('sexo_dog', data.sexo_dog);
            formData.append('descripcion_dog', data.descripcion_dog);
            formData.append('ubicacion_dog', data.ubicacion_dog);
            formData.append('esterilizado_dog', data.esterilizado_dog);
            formData.append('historia_dog', data.historia_dog);
            /* formData.append('estado_dog', data.estado_dog);  */
            formData.append('fk_categoria', data.fk_categoria);
            formData.append('fk_razas', data.fk_razas);
            formData.append('fk_vacunas', data.fk_vacunas);
            formData.append('fk_municipios', data.fk_municipios);
            formData.append('fk_users', data.fk_users); 

            if (data.imagen_dog) {
                formData.append('imagen_dog', {
                    uri: data.imagen_dog.uri,
                    type: 'image/jpeg',
                    name: data.imagenNameFile,
                });
            }

            await axiosClient.post(`/dog/mascota`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                if (response.status === 200) {
                    Alert.alert('Mascota Registrada Con Exito');
                    navigation.navigate('Home');
                    datos();
                    closeModal();
                } else {
                    Alert.alert('No se registró la mascota');
                }
            });

        } catch (error) {
            console.log('Error en el servidor', error);
        }
    };

    const handleActualizar = async () => {
        try {
            const formData = new FormData();
            formData.append('nombre_dog', data.nombre_dog);
            formData.append('edad_dog', data.edad_dog);
            formData.append('sexo_dog', data.sexo_dog);
            formData.append('descripcion_dog', data.descripcion_dog);
            formData.append('ubicacion_dog', data.ubicacion_dog);
            formData.append('esterilizado_dog', data.esterilizado_dog);
            formData.append('historia_dog', data.historia_dog);
            /* formData.append('estado_dog', data.estado_dog);   */
            formData.append('fk_categoria', data.fk_categoria);
            formData.append('fk_razas', data.fk_razas);
            formData.append('fk_vacunas', data.fk_vacunas);
            formData.append('fk_municipios', data.fk_municipios);
            formData.append('fk_users', data.fk_users); 

            if (data.imagen_dog) {
                formData.append('imagen_dog', {
                    uri: data.imagen_dog.uri,
                    type: 'image/jpeg',
                    name: data.imagenNameFile,
                });
            }

            await axiosClient.put(`/dog/mascota/${dogId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                if (response.status === 200) {
                    Alert.alert('Mascota actualizada correctamente');
                    navigation.navigate('Home');
                    datos();
                    closeModal();
                } else {
                    Alert.alert('Error en la actualización de la mascota');
                }
            });
        } catch (error) {
            console.log('Error en el servidor', error);
        }
    };


    return (
        /* <SafeAreaView style={styles.container}> */
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
          
                <Text style={{ fontSize: 20, color: 'black' , textAlign:'center', marginBottom: 20, fontWeight: 'bold'}}> {title} mascota </Text>

                {data.imagen_dog ? (
                    <Image source={{ uri: data.imagen_dog.uri }} style={styles.image} />
                ) : (
                    <Text>No hay imagenes </Text>
                )}

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nombre Dog</Text>
                    <TextInput
                        style={styles.input}
                        value={data.nombre_dog}
                        onChangeText={(value) => handleTextInputChange('nombre_dog', value)}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Edad</Text>
                    <TextInput
                        style={styles.input}
                        value={data.edad_dog}
                        onChangeText={(value) => handleTextInputChange('edad_dog', value)}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Sexo</Text>
                    <Picker
                        selectedValue={data.sexo_dog}
                        onValueChange={(value) => handleTextInputChange('sexo_dog', value)}
                        style={styles.input1}
                    >
                        <Picker.Item label="Selecciona una opción" value="" />
                        <Picker.Item label="Hembra" value="Hembra" />
                        <Picker.Item label="Macho" value="Macho" />
                    </Picker>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Vacunas</Text>
                    <TextInput
                        style={styles.input}
                        value={data.fk_vacunas}
                        onChangeText={(value) => handleTextInputChange('fk_vacunas', value)}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Esterilizado</Text>
                    <Picker
                        selectedValue={data.esterilizado_dog}
                        onValueChange={(value) => handleTextInputChange('esterilizado_dog', value)}
                        style={styles.input1}
                    >
                        <Picker.Item label="Selecciona una opción" value="" />
                        <Picker.Item label="Si" value="Si" />
                        <Picker.Item label="No" value="No" />
                    </Picker>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Categoría</Text>
                    <Picker
                        selectedValue={data.fk_categoria}
                        onValueChange={(value) => handleTextInputChange('fk_categoria', value)}
                        style={styles.input1}
                    >
                        <Picker.Item label="Selecciona una opción" value="" />
                        {categoria.map((item) => (
                            <Picker.Item key={item.key} label={item.value} value={item.key} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Raza</Text>
                    <Picker
                        selectedValue={data.fk_razas}
                        onValueChange={(value) => handleTextInputChange('fk_razas', value)}
                        style={styles.input1}
                    >
                        <Picker.Item label="Selecciona una opción" value="" />
                        {razas.map((item) => (
                            <Picker.Item key={item.key} label={item.value} value={item.key} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Municipio</Text>
                    <Picker
                        selectedValue={data.fk_municipios}
                        onValueChange={(value) => handleTextInputChange('fk_municipios', value)}
                        style={styles.input1}
                    >
                        <Picker.Item label="Selecciona una opción" value="" />
                        {municipios.map((item) => (
                            <Picker.Item key={item.key} label={item.value} value={item.key} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Ubicación</Text>
                    <TextInput
                        style={styles.input}
                        value={data.ubicacion_dog}
                        onChangeText={(value) => handleTextInputChange('ubicacion_dog', value)}
                    />
                </View>

               <View style={styles.formGroup}>
                    <Text style={styles.label}>Usuario</Text>
                    <Picker
                        selectedValue={data.fk_users}
                        onValueChange={(value) => handleTextInputChange('fk_users', value)}
                        style={styles.input1}
                    >
                        <Picker.Item label="Selecciona una opción" value="" />
                        {usuario.map((item) => (
                            <Picker.Item key={item.key} label={item.value} value={item.key} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        style={styles.input}
                        value={data.descripcion_dog}
                        onChangeText={(value) => handleTextInputChange('descripcion_dog', value)}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Historia</Text>
                    <TextInput
                        style={styles.input}
                        value={data.historia_dog}
                        onChangeText={(value) => handleTextInputChange('historia_dog', value)}
                    />
                </View>


                <TouchableOpacity style={styles.imagePickerButton} onPress={ handleImagePicker}>
                    <Text style={styles.imagePickerButtonText}>Seleccionar Imagen</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={title === 'Registrar' ? handleSubmit : handleActualizar 
                    }
                >
                    <Text style={styles.submitButtonText}>{title}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        /* </SafeAreaView> */
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff3f3",
    },
    scrollView: {
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: "grey",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 30,
        padding: 10,
        fontSize: 16,
        color: "black",
    },

    input1: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 30,
        padding: 10,
        fontSize: 16,
        color: "black",
    },
    image: {
        width: 200,
        height: 250,
        marginBottom: 10,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 60
    },
    imagePickerButton: {
        backgroundColor: "#f5f5f",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 20,
        borderColor: '#000',
        borderBlockColor: '#000'
    },
    imagePickerButtonText: {
        color: "#007bff",
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: "#6e1313",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        
    },
});

export default Registro;
