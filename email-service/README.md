# email-service

**Language:** python
**Port:** 8101
**Endpoints:**

- `GET /health` — Health check
- `GET /emails` — email-service business logic

cd email-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

python app.py

curl <http://localhost:8101/health>
curl <http://localhost:8101/emails>

deactivate
