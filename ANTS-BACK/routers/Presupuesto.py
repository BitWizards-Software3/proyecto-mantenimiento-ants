from modelos.Presupuesto import Presupuesto
from fastapi import APIRouter
from firebase_admin import db
from uuid import uuid4
from datetime import date
from datetime import datetime
from fastapi import HTTPException

router = APIRouter()

PRESUPUESTO_NODE = 'Presupuesto'

@router.post("/presupuesto/")
async def crear_Presupuesto(presupuesto: Presupuesto):
    # Verificar que el valor del presupuesto es diferente de 0
    if presupuesto.objetivo == 0:
        raise HTTPException(status_code=400, detail="El valor del presupuesto no puede ser 0")

    presupuesto_id = uuid4()
    presupuesto.id = str(presupuesto_id)

    presupuesto_dict = presupuesto.dict()    
    
    # ref = db.reference('Presupuesto') #antes 
    ref = db.reference(PRESUPUESTO_NODE) #ahora

    todos_presupuestos = ref.get() or {}
    
    if any(p.get("fecha") == presupuesto.fecha for p in todos_presupuestos.values()):
        raise HTTPException(status_code=400, detail=f"Ya existe un presupuesto para el mes {presupuesto.fecha}")

    ref.push(presupuesto_dict)
    return {"message": "Presupuesto creado exitosamente"}

@router.get("/presupuestos/")
async def obtenerPresupuestos():    
    # ref = db.reference('Presupuesto') #antes 
    ref = db.reference(PRESUPUESTO_NODE) #ahora

    return ref.get()

@router.get("/presupuestos/{fecha}")
async def obtenerPresupuestos(fecha: str):    
    # ref = db.reference('Presupuesto') #antes 
    ref = db.reference(PRESUPUESTO_NODE) #ahora

    presupuestos = ref.get()
    
    if presupuestos:
        presupuestos_mes = [p for p in presupuestos.values() if p["fecha"] == fecha]
        
        if presupuestos_mes:
            return presupuestos_mes
        else:
            return []
    else:
        return []