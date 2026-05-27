# idempotency-service

**Language:** go
**Port:** 8095
**Endpoints:**

- `GET /health` — Health check
- `GET /keys` — idempotency-service business logic

To run the Service:

- brew install go
- cd idempotency-service

- go run main.go

Then Test:

curl <http://localhost:8095/health>
curl <http://localhost:8095/keys>
