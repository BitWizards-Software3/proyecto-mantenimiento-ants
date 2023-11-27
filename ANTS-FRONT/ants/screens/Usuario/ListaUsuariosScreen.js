import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const UsuariosScreen = () => {
  const [usuariosData, setUsuariosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/usuarios');
        const jsonData = await response.json();

        // Extrae los atributos 'nombre' y 'correo' de cada usuario
        const formattedData = Object.values(jsonData).map((usuario) => ({
          nombre: usuario.nombre,
          correo: usuario.correo,
        }));

        setUsuariosData(formattedData);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Lista de Usuarios:</Text>
      <FlatList
        data={usuariosData}
        keyExtractor={(usuario) => usuario.correo}
        renderItem={({ item }) => (
          <View>
            <Text>Nombre: {item.nombre}</Text>
            <Text>correo: {item.correo}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default UsuariosScreen;
