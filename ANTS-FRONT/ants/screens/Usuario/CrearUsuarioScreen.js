import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const CrearUsuarioFormulario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const crearUsuario = async () => {
    // Crea un objeto de usuario con los datos ingresados por el usuario
    const usuario = {
      nombre: nombre,
      correo: correo,
      contraseña: contraseña,
    };

    // Realiza una solicitud POST a tu API de FastAPI para registrar al usuario
    try {
      const response = await fetch('http://localhost:8000/usuario/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      // Verifica si la solicitud fue exitosa
      if (response.ok) {
        // El usuario se registró correctamente
        // Puedes redirigir al usuario o mostrar un mensaje de éxito
        console.log('usuario registrado exitosamente');
      } else {
        // Maneja errores de registro aquí
        console.error('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error de red al registrar usuario:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />
      <TextInput
        placeholder="Correo Electrónico"
        value={correo}
        onChangeText={(text) => setCorreo(text)}
      />
      <TextInput
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={(text) => setContraseña(text)}
        secureTextEntry
      />
      <Button title="Registrar" onPress={crearUsuario} />
    </View>
  );
};

export default CrearUsuarioFormulario;
