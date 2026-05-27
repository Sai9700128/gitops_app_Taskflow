# analytics-service

**Language:** python
**Port:** 8102
**Endpoints:**

- `GET /health` — Health check
- `GET /analytics` — analytics-service business logic

To run the service
 (Use a Virtual Environment)

- python3 -m venv venv
- source venv/bin/activate
- pip install -r requirements.txt
- python app.py

Then Test:

- curl <http://localhost:8102/health>
- curl <http://localhost:8102/analytics>
