# api-gateway-service

**Language:** go
**Port:** 8084
**Endpoints:**

- `GET /health` — Health check
- `GET /routes` — api-gateway-service business logic

To run the Service:

- brew install go
- cd api-gateway-service
- go run main.go

Then Test:

- curl <http://localhost:8084/health>
- curl <http://localhost:8084/routes>
