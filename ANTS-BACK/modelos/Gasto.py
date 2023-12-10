# Importación de clases y módulos necesarios para definir y trabajar con modelos de datos
from pydantic import BaseModel  # Importa la clase BaseModel de la biblioteca pydantic para definir modelos de datos
from datetime import date  # Importa la clase date del módulo datetime para manejar fechas
from typing import Optional  # Importa Optional del módulo typing para definir campos opcionales en el modelo

# Definición de la clase Gasto, que representa un modelo de datos para información de gastos
class Gasto(BaseModel):  # Define la estructura de un objeto Gasto
    id: str  # Identificador único del gasto (cadena)
    cantidad: int  # Cantidad asociada al gasto (entero)
    descripcion: str  # Descripción del gasto (cadena)
    id_usuario: str  # Identificador del usuario relacionado con el gasto (cadena)
    fecha: Optional[str]  # Fecha del gasto (cadena), opcional (puede ser None)