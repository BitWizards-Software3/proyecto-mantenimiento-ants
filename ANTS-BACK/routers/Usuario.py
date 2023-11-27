from modelos.Usuario import Usuario
from fastapi import APIRouter
from firebase_admin import db
from uuid import uuid4


router = APIRouter()

@router.post("/usuario/")
async def crear_usuario(usuario: Usuario):
    # Genera un nuevo UUID para el usuario
    usuario_id = uuid4()

    # Convierte el objeto Usuario a un diccionario
    usuario_dict = usuario.dict()
    
    # Asigna el ID generado al campo 'id' del diccionario del usuario
    usuario_dict["id"] = str(usuario_id)
    ref= db.reference('Usuario')
    # Envía el usuario a la base de datos de Firebase bajo el nodo "usuarios"
    ref.push(usuario_dict)
    return {"message": "Usuario creado exitosamente"}

@router.get("/usuarios/")
async def obtener_usuarios():
    ref= db.reference('Usuario')
    return ref.get()


@router.put("/usuario/{id}")
def actualizar_usuario(id: str ,usuario: Usuario):  
    ref= db.reference('Usuario')  
    usuario_ref= ref.child(id)
    
    usuario_ref.update({
        'nombre': usuario.nombre,
        'correo': usuario.correo,
        'contraseña': usuario.contraseña
    })
    
@router.delete("/usuario/{id}")
def eliminar_usuario(id: str):    
    ref= db.reference('Usuario')

    usuario_ref= ref.child(id)
    
    usuario_ref.delete()


