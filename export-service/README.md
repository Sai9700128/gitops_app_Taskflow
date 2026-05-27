# export-service

**Language:** python
**Port:** 8109
**Endpoints:**

- `GET /health` — Health check
- `GET /exports` — export-service business logic

cd export-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

Then to test:

curl <http://localhost:8109/health>
curl <http://localhost:8109/exports>
