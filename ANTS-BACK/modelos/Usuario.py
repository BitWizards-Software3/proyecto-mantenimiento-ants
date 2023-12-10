
from pydantic import BaseModel

class Usuario(BaseModel):  # Define la clase Usuario, un modelo de datos para representar usuarios
    nombre: str  # Nombre del usuario (cadena)
    correo: str  # Correo electrónico del usuario (cadena)
    contraseña: str  # Contraseña del usuario (cadena)
    
