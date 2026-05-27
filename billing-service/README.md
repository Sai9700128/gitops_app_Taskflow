# billing-service

**Language:** java
**Port:** 8123
**Endpoints:**

- `GET /health` — Health check
- `GET /billing/summary` — billing-service business logic

To run:

brew install openjdk@21 maven

cd billing-service
mvn spring-boot:run

Then to test:
curl <http://localhost:8123/health>
curl <http://localhost:8123/billing/summary>
