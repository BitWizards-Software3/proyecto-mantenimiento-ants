import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

function MenuScreen() {
  const navigation = useNavigation();

  const handleIngresarGasto = () => {
    // Lógica del gasto hormiga
    navigation.navigate('GastoHormiga');
  };

  const handleAgregarPresupuesto = () => {
    // Lógica del presupuesto mensual
    navigation.navigate('PresupuestoMensual');
  };

  const handleConsultarPresupuesto = () =>{
    //Logica de consulta del presupuesto
    navigation.navigate('ConsultaPresupuestoMensual');
  };

  return (
    <View style={styles.container}>
       <Image
        source={require('../../recursos/Logo.jpeg')} // Asegúrate de que la ruta y el nombre del archivo sean correctos
        style={styles.logo} // Aplica estilos como sea necesario
      />
      <TouchableOpacity style={styles.button} onPress={handleIngresarGasto}>
        <Text style={styles.buttonText}>Ingresar Gasto Hormiga</Text>
      </TouchableOpacity>
      <View style={styles.buttonSpacing} />
      <TouchableOpacity style={styles.button} onPress={handleAgregarPresupuesto}>
        <Text style={styles.buttonText}>Ingresar Presupuesto</Text>
      </TouchableOpacity>
      <View style={styles.buttonSpacing} />
      <TouchableOpacity style={styles.button} onPress={handleConsultarPresupuesto}>
        <Text style={styles.buttonText}>Consultar P. Mensual</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#e33627',
    width: '80%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonSpacing: {
    marginTop: 50,
  }, logo: {
    width: 150, // Establece el ancho deseado
    height: 150, // Establece la altura deseada
    marginBottom: 30,
    borderRadius: 100 // Agrega espacio debajo de la imagen
  },
  
});

export default MenuScreen;
