# audit-log-service

**Language:** go
**Port:** 8091
**Endpoints:**

- `GET /health` — Health check
- `GET /audits` — audit-log-service business logic

To run the Service:

- brew install go
- cd api-gateway-service
- go run main.go

Then Test:

- curl <http://localhost:8091/health>
- curl <http://localhost:8091/audits>
