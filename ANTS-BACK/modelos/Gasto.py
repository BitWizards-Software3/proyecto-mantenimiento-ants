from pydantic import BaseModel
from datetime import date
from typing import Optional

class Gasto(BaseModel):
    id:str
    cantidad: int
    descripcion: str
    id_usuario: str
    fecha: Optional[str]  # Nuevo campo para el mes y año actual

