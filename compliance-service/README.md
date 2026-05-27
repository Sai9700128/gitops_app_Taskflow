# compliance-service

**Language:** java
**Port:** 8124
**Endpoints:**

- `GET /health` — Health check
- `GET /compliance/status` — compliance-service business logic

To run:

brew install openjdk@21 maven

cd compliance-service
mvn spring-boot:run

Then to test:
curl <http://localhost:8124/health>
curl <http://localhost:8124/compliance/status>
