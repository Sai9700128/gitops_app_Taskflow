# chat-service

**Language:** node
**Port:** 8112
**Endpoints:**

- `GET /health` — Health check
- `GET /messages` — chat-service business logic

To run:
cd chat-service
npm install
node index.js

Then test:
curl <http://localhost:8112/health>
curl <http://localhost:8112/messages>
