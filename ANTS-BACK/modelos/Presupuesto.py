from pydantic import BaseModel
from datetime import date
from typing import Optional


class Presupuesto(BaseModel):  # Define la clase Presupuesto, un modelo de datos para gestionar presupuestos
    id: str  # Identificador único del presupuesto (cadena)
    cantidad: int  # Monto del presupuesto (entero)
    id_usuario: str  # Identificador del usuario relacionado con el presupuesto (cadena)
    fecha: Optional[str]  # Fecha del presupuesto (cadena), opcional (puede ser None)
    objetivo: int  # Objetivo del presupuesto (entero)
    

