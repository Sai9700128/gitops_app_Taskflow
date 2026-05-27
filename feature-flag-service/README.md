# feature-flag-service

**Language:** go
**Port:** 8093
**Endpoints:**

- `GET /health` — Health check
- `GET /flags` — feature-flag-service business logic

To run the Service:

- brew install go
- cd feature-flag-service
- go run main.go

Then Test:

- curl <http://localhost:8093/health>
- curl <http://localhost:8093/flags>
