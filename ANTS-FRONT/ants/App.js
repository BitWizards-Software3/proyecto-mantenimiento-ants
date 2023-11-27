import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Button, Image,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './screens/Menu/menu'; // Importa la pantalla del menú
import GastoHormigaScreen from './screens/Gasto/RegistrarGastoScreen'; // Importa la pantalla de "Ingresar Gasto Hormiga"
import PresupuestoMensualScreen from './screens/Presupuesto/PresupuestoMensual';
import ConsultaPresupuestoMensualScreen from './screens/Presupuesto/consultaPresupuesto';



const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Principal' }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: 'Menú' }}
        />
        <Stack.Screen
          name="GastoHormiga"
          component={GastoHormigaScreen}
          options={{ title: 'Ingresar Gasto Hormiga' }}
        />
        <Stack.Screen
          name="PresupuestoMensual"
          component={PresupuestoMensualScreen}
          options={{ title: 'Ingresar Presupuesto' }}
        />
        <Stack.Screen
          name="ConsultaPresupuestoMensual"
          component={ConsultaPresupuestoMensualScreen}
          options={{ title: 'Consultar Presupuesto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState(''); // Define username aquí

  const handleLogin = () => {
    // Implementa la lógica de inicio de sesión aquí
    //console.log('Usuario:', username);
    //console.log('Contraseña:'); // Agrega la lógica que necesites

    // Redirige a la pantalla del menú después del inicio de sesión
    navigation.navigate('Menu');
  };

  const handleCancel = () => {
    console.log('Botón de cancelar presionado');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./recursos/Logo.jpeg')}
        style={styles.circularImage} // Agrega esta línea
      />
      <Text style={styles.projectName}>ANTS</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={(text) => setUsername(text)} // Actualiza el estado de username
        value={username} // Utiliza el valor de username
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCancel}
        style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0E0E',
    alignItems: 'center',
    justifyContent: 'center',

  },
  circularImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Esto hará que la imagen sea circular
  },
  logo: {
    width: 200, // Establece el ancho deseado
    height: 200, // Establece la altura deseada
  },
  projectName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    marginTop: 15
  },
  button: {
    backgroundColor: '#e33627',
    width: '20%',
    padding: 10,
    margin: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Agrega sombra en Android
    shadowOpacity: 0.3, // Agrega sombra en iOS
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }, // Posición de la sombra en iOS
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
