# file-upload-service

**Language:** node
**Port:** 8113
**Endpoints:**

- `GET /health` — Health check
- `GET /files` — file-upload-service business logic

To Run the service

- cd file-upload-service
- npm install
- node index.js

then test:
curl <http://localhost:8113/health>
curl <http://localhost:8113/files>
