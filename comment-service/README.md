# comment-service

**Language:** node
**Port:** 8115
**Endpoints:**

- `GET /health` — Health check
- `GET /comments` — comment-service business logic

To Run the service

- cd comment-service
- npm install
- node index.js

then test:
curl <http://localhost:8115/health>
curl <http://localhost:8115/comments>
