# circuit-breaker-service

**Language:** go
**Port:** 8096
**Endpoints:**

- `GET /health` — Health check
- `GET /circuits` — circuit-breaker-service business logic

To run the Service:

- brew install go
- cd circuit-breaker-service
- go run main.go

Then Test:

- curl <http://localhost:8096/health>
- curl <http://localhost:8096/circuits>
