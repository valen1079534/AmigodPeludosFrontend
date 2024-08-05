import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Home from "./src/components/templates/Home";
import Registro from "./src/components/templates/Registro";
import BuscarMascota from "./src/components/templates/Buscar";
import SideBar from "./src/components/organims/sidebar";
import MascotaAdoptada from "./src/components/templates/MascotaAdoptada";
import Perfil from "./src/components/templates/PerfiUser";
import IconMenu from "./src/components/atomos/IconMenu";
import Login from "./src/components/templates/Login";
import FormUser from "./src/components/templates/FormUser";
import SolisitudesEnviadas from "./src/components/templates/SolicitudesPets";
import Historial from "./src/components/templates/Historial";
import { AuthProvider } from "./src/context/AuhtContext";
import PetsListAdops from "./src/components/templates/PetsListAdop";

const Stack = createNativeStackNavigator();

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (

    <AuthProvider>
      <NavigationContainer>
        <SideBar visible={isSidebarVisible} onClose={toggleSidebar} />
        <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerStyle:{
            backgroundColor: '#6e1313'
          },
          headerTintColor:'#fff'
        }}
        
        >
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          
          <Stack.Screen name="Home" component={Home} options={{
            headerLeft: () => (
              <TouchableOpacity onPress={toggleSidebar}>
                <IconMenu />
              </TouchableOpacity>
            )
          }} />
          
          <Stack.Screen name="Registro de usuario" component={FormUser} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="Adoptame" component={BuscarMascota} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Solicitudes" component={SolisitudesEnviadas} />
          <Stack.Screen name="Historial" component={Historial} />
          <Stack.Screen name="Mascota Aadoptada" component={PetsListAdops} />
        </Stack.Navigator>
      </NavigationContainer>
      </AuthProvider>

  );
}

export default App;
