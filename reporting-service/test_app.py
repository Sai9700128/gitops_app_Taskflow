import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_health(client):
    rv = client.get("/health")
    assert rv.status_code == 200
    assert rv.get_json()["status"] == "healthy"

def test_reports(client):
    rv = client.get("/reports")
    assert rv.status_code == 200
