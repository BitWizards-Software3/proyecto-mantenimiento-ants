from pydantic import BaseModel
from datetime import date
from typing import Optional


class Presupuesto(BaseModel):
    id:str
    cantidad: int
    id_usuario: str
    fecha:Optional[str]
    objetivo: int
    

