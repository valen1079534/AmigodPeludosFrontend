/* import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({Children})=> {
    const [rolUser, setRolUser] = useState('')

    return(
        <AuthProvider.Provider
        value={{
            rolUser,
            setRolUser,
        }}
        >
            {Children}
        </AuthProvider.Provider>
    )
} */

import React, { createContext, useState, useEffect } from 'react';
/* import AsyncStorage from '@react-native-async-storage/async-storage'; */

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [rol, setRol] = useState('');
  const [idUser, setIdUser] = useState([]);

  /* useEffect(() => {
    const fetchUserRole = async () => {
      const userValue = await AsyncStorage.getItem('user');
      if (userValue !== null) {
        const response = JSON.parse(userValue);
        setRolUser(response.rolUser); 
      }
    };
    fetchUserRole();
  }, []); */

  return (
    <AuthContext.Provider
     value={{ 
        rol, 
        idUser,
        setRol,
        setIdUser,
        }}>
      {children}
    </AuthContext.Provider>
  );
};
