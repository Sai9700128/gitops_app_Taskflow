# activity-feed-service

**Language:** node
**Port:** 8116
**Endpoints:**

- `GET /health` — Health check
- `GET /feed` — activity-feed-service business logic

To Run the service

- cd activity-feed-service
- npm install
- node index.js

then test:
curl <http://localhost:8116/health>
curl <http://localhost:8116/feed>
