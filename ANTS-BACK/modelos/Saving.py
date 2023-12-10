from pydantic import BaseModel
from datetime import date

from uuid import UUID

class Saving(BaseModel):  # Define la clase Saving, un modelo de datos para representar ahorros
    id: UUID  # Identificador único del ahorro (UUID)
    amount: float  # Monto del ahorro (número decimal)
    description: str  # Descripción del ahorro (cadena)
    date: date  # Fecha del ahorro (tipo date)
    
