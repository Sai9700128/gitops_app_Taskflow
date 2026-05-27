# health-aggregator

**Language:** go
**Port:** 8089
**Endpoints:**

- `GET /health` — Health check
- `GET /status` — health-aggregator business logic

To run the Service:

- brew install go
- cd health-aggregator
- go run main.go

Then Test:

curl <http://localhost:8089/health>
curl <http://localhost:8089/status>
