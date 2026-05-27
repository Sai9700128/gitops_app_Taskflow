# geo-service

**Language:** python
**Port:** 8110
**Endpoints:**

- `GET /health` — Health check
- `GET /geocode` — geo-service business logic

To run:
cd geo-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

Then to test:
curl <http://localhost:8110/health>
curl <http://localhost:8110/geocode>
