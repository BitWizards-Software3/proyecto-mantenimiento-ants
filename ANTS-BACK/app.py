from fastapi.testclient import TestClient
from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials
from routers import Usuario
from routers import Gasto
from routers import Presupuesto
from fastapi.middleware.cors import CORSMiddleware




# Carga las credenciales desde el archivo JSON que descargaste
cred = credentials.Certificate("ants-97.json")

# Inicializa la aplicación Firebase con las credenciales
firebase_app = firebase_admin.initialize_app(cred, {
        "databaseURL": "https://ants-978b7-default-rtdb.firebaseio.com",
})

app = FastAPI()

client = TestClient(app)

def test_crear_gasto():
    response = client.post("/gasto/", json={
        "cantidad": 100,
        "descripcion": "Prueba",
        "id_usuario": "usuario_test",
        # No incluyes 'id' ni 'mes_anio_actual' ya que se generan automáticamente
    })
    assert response.status_code == 200
    assert response.json()["message"] == "Gasto creado exitosamente"
    
    
app.include_router(Usuario.router)
app.include_router(Gasto.router)
app.include_router(Presupuesto.router)

# Configura CORS para permitir solicitudes desde la URL de tu aplicación Expo.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:19006"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

