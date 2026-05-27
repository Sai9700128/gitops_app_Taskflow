# cache-service

**Language:** go
**Port:** 8087
**Endpoints:**

- `GET /health` — Health check
- `GET /cache/stats` — cache-service business logic

To run the Service:

- brew install go
- cd cache-service
- go run main.go

Then Test:

- curl <http://localhost:8087/health>
- curl <http://localhost:8087/cache/stats>
