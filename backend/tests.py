import json
from app import app, db
from models import Task

def test_create_task():
    client = app.test_client()
    response = client.post("/tasks", json={"title": "Test Task"})
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data["title"] == "Test Task"
