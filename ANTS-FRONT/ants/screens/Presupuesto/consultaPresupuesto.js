import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos CSS

function ConsultaPresupuestoMensualScreen() {
  const [fecha, setFecha] = useState(null);
  const [consultarPresupuesto, setConsultarPresupuesto] = useState(null);
  const [mensajeError, setMensajeError] = useState("");

  const handleConsultarPresupuesto = async () => {
    try {
      // Verificar si fecha es nula y mostrar un mensaje de error si es el caso
      if (!fecha) {
        setMensajeError("Por favor, selecciona una fecha antes de consultar.");
        setConsultarPresupuesto(null); // Limpia cualquier resultado anterior
        return;
      } else {
        setMensajeError(""); // Limpia el mensaje de error si se recibieron datos válidos
      }
      
      // Convertir la fecha seleccionada a un string en formato 'yyyy-MM'
      const fechaFormato = fecha ? fecha.toISOString().substring(0, 7) : '';
  
      // Obtener gastos solo para el mes seleccionado
      const gastosResponse = await fetch(`http://localhost:8000/gastos/${fechaFormato}`);
      const gastos = await gastosResponse.json();
      const gastosArray = Object.values(gastos);
  
      // Obtener presupuestos
      const presupuestosResponse = await fetch(`http://localhost:8000/presupuestos/${fechaFormato}`);
      const presupuestos = await presupuestosResponse.json();
      const presupuestosArray = Object.values(presupuestos);
  
      let totalGastos = 0;
  
      if (Array.isArray(gastosArray)) {
        gastosArray.forEach((gasto) => {
          totalGastos += gasto.cantidad;
        });
      } else {
        console.error("Los gastos recibidos no son un array:", gastos);
      }
  
      const presupuestoIngresado = presupuestosArray.length > 0 ? presupuestosArray[0].objetivo : 0;

    const presupuestoActual = presupuestoIngresado - totalGastos;
    // Verificar si se encontraron datos
    if (presupuestosArray.length === 0) {
      setMensajeError("No se encontraron presupuestos para el mes.");
      setConsultarPresupuesto(null); // Limpia cualquier resultado anterior
    } else {
      setConsultarPresupuesto({
        detalles: gastosArray,
        presupuestoIngresado,
        presupuestoActual
      });
      setMensajeError(""); // Limpia el mensaje de error si se recibieron datos válidos
    }

  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};



  return (
    
    <View style={styles.container}>
     
      <Text style={styles.text}>Consulta de Presupuesto Mensual</Text>
      <View style={styles.datePickerContainer}>
        <Text style={styles.text}>Fecha</Text>
        <DatePicker
          style={styles.datePicker}
          selected={fecha}
          onChange={(date) => setFecha(date)}
          dateFormat="yyyy-MM"
          showMonthYearPicker
        />
      </View>
      {mensajeError && <Text style={styles.errorText}>{mensajeError}</Text>}
      <Text style={styles.text}>Fecha Seleccionada: {fecha ? fecha.toISOString().substring(0, 7) : 'Ninguna'}</Text>
      <Button title="Consultar" color="#63a1ff" onPress={handleConsultarPresupuesto} />
      {consultarPresupuesto && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Resumen de Presupuesto</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Descripción</Text>
            <Text style={styles.tableHeaderCell}>Cantidad</Text>
          </View>
          {consultarPresupuesto.detalles.map((detalle, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{detalle.descripcion}</Text>
              <Text style={styles.tableCell}>{detalle.cantidad}</Text>
            </View>
          ))}
          <Text style={styles.resultText}>Presupuesto Ingresado: {consultarPresupuesto.presupuestoIngresado}</Text>
          <Text style={styles.resultText}>Presupuesto Actual: {consultarPresupuesto.presupuestoActual}</Text>
        </View>
      )}
    </View>
  );
}
const obtenerPresupuestoPorFecha = (fecha) => {
  const presupuestoIngresado = 1000;
  const gastosRegistrados = 200;
  const presupuestoActual = presupuestoIngresado - gastosRegistrados;

  const detalles = [
    { descripcion: 'Detalle 1', cantidad: 100 },
    { descripcion: 'Detalle 2', cantidad: 150 },
    { descripcion: 'Detalle 3', cantidad: 50 },
  ];

  return { presupuestoIngresado, presupuestoActual, detalles };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0E0E',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },  
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  datePicker: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  resultText: {
    fontSize: 16,
    color: '#0F0E0E',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#0F0E0E',
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 16,
    color: '#0F0E0E',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: '#0F0E0E',
  },
  datePickerContainer: {
    alignItems: 'center',  // Centra el contenido horizontalmente
    marginBottom: 220,     // Espacio entre el DatePicker y el botón
  },
});

export default ConsultaPresupuestoMensualScreen;