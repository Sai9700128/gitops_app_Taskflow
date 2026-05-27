# event-bus-service

**Language:** go
**Port:** 8092
**Endpoints:**

- `GET /health` — Health check
- `GET /events` — event-bus-service business logic

To run the Service:

- brew install go
- cd event-bus-service
- go run main.go

Then Test:

- curl <http://localhost:8092/health>
- curl <http://localhost:8092/events>
