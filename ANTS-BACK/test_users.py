from fastapi.testclient import TestClient
from app import app


client = TestClient(app)

def test_read_root():
    response = client.get("/usuarios/")
    assert response.status_code == 200
