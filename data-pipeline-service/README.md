# data-pipeline-service

**Language:** python
**Port:** 8107
**Endpoints:**

- `GET /health` — Health check
- `GET /pipelines` — data-pipeline-service business logic

cd data-pipeline-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

Then to test:

curl <http://localhost:8107/health>
curl <http://localhost:8107/pipelines>

deactivate
