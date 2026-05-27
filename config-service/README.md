# config-service

**Language:** go
**Port:** 8086
**Endpoints:**

- `GET /health` — Health check
- `GET /configs` — config-service business logic

To run the Service:

- brew install go
- cd config-service
- go run main.go

Then Test:

- curl <http://localhost:8086/health>
- curl <http://localhost:8086/configs>
