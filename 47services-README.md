# TaskFlow — 47 Microservices

50 total services (3 existing core + 47 new) across 5 languages demonstrating CI/CD and infrastructure at scale.

## Language Breakdown

| Language | Count | Ports | Services |
|----------|-------|-------|----------|
| Go | 20 | 8081–8100 | sso, session, rbac, api-gateway, rate-limiter, config, cache, scheduler, health-aggregator, metric-collector, audit-log, event-bus, feature-flag, service-registry, idempotency, circuit-breaker, request-validator, token, webhook, queue-processor |
| Python | 10 | 8101–8110 | email, analytics, reporting, search, recommendation, ml-inference, data-pipeline, sentiment, export, geo |
| Node.js | 9 | 8111–8119 | notification, chat, file-upload, template, comment, activity-feed, realtime, markdown, localization |
| Java | 5 | 8120–8124 | payment, invoice, subscription, billing, compliance |
| Rust | 3 | 8125–8127 | encryption, image-processor, compression |

---

## Prerequisites

Install these before testing:

- **Go** 1.21+ → https://go.dev/dl/
- **Python** 3.10+ with pip → `brew install python` or https://python.org
- **Node.js** 20+ → `brew install node` or https://nodejs.org
- **Java** 21 + Maven → `brew install openjdk@21 maven`
- **Rust** 1.75+ → `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- **Docker** (for container testing) → https://docker.com

---

## Testing — One Service Per Language

You don't need to run all 47. Test one per language. If it works, all services in that language will work.

### 1. Go — sso-service (port 8081)

```bash
cd sso-service
go run main.go
```

Test in another terminal:
```bash
curl http://localhost:8081/health
# {"service":"sso-service","status":"healthy"}

curl http://localhost:8081/sso/providers
# {"providers":[{"name":"google","enabled":true,...}]}
```

Stop with `Ctrl+C`.

---

### 2. Python — email-service (port 8101)

```bash
cd email-service
pip install -r requirements.txt
python app.py
```

Test:
```bash
curl http://localhost:8101/health
# {"service":"email-service","status":"healthy"}

curl http://localhost:8101/emails
# {"sent":[{"to":"user@example.com","subject":"Welcome","status":"delivered"}]}
```

Run tests:
```bash
cd email-service
pytest test_app.py -v
```

Stop with `Ctrl+C`.

---

### 3. Node.js — notification-service (port 8111)

```bash
cd notification-service
npm install
node index.js
```

Test:
```bash
curl http://localhost:8111/health
# {"status":"healthy","service":"notification-service"}

curl http://localhost:8111/notifications
# {"notifications":[{"id":"notif_1","type":"push",...}]}
```

Run tests:
```bash
cd notification-service
npm install   # devDependencies needed for jest
npx jest
```

Stop with `Ctrl+C`.

---

### 4. Java — payment-service (port 8120)

```bash
cd payment-service
mvn spring-boot:run
```

> First run takes a few minutes to download Spring Boot dependencies. Be patient.

Test:
```bash
curl http://localhost:8120/health
# {"status":"healthy","service":"payment-service"}

curl http://localhost:8120/payments
# [{"id":"pay_1","amount":99.99,"currency":"USD","status":"completed"}]
```

Stop with `Ctrl+C`.

---

### 5. Rust — encryption-service (port 8125)

```bash
cd encryption-service
cargo run
```

> First run takes a few minutes to compile Actix Web dependencies. Be patient.

Test:
```bash
curl http://localhost:8125/health
# {"service":"encryption-service","status":"healthy"}

curl http://localhost:8125/encrypt
# {"algorithm":"AES-256-GCM","key_id":"key_prod_01","status":"ready"}
```

Stop with `Ctrl+C`.

---

## Docker Testing (Optional)

After verifying the raw services work, test one Docker build per language:

```bash
# Go
docker build -t sso-service ./sso-service
docker run --rm -p 8081:8081 sso-service
curl http://localhost:8081/health

# Python
docker build -t email-service ./email-service
docker run --rm -p 8101:8101 email-service
curl http://localhost:8101/health

# Node
docker build -t notification-service ./notification-service
docker run --rm -p 8111:8111 notification-service
curl http://localhost:8111/health

# Java
docker build -t payment-service ./payment-service
docker run --rm -p 8120:8120 payment-service
curl http://localhost:8120/health

# Rust
docker build -t encryption-service ./encryption-service
docker run --rm -p 8125:8125 encryption-service
curl http://localhost:8125/health
```

---

## Repo Structure After Adding These

```
taskflow-repo/
├── .github/workflows/       # CI (existing + new)
├── front-end/               # Existing — React/TS
├── user-service/            # Existing — Node.js
├── task-service/            # Existing — Node.js
├── sso-service/             # NEW — Go
├── session-service/         # NEW — Go
├── rbac-service/            # NEW — Go
├── api-gateway-service/     # NEW — Go
├── rate-limiter-service/    # NEW — Go
├── config-service/          # NEW — Go
├── cache-service/           # NEW — Go
├── scheduler-service/       # NEW — Go
├── health-aggregator/       # NEW — Go
├── metric-collector/        # NEW — Go
├── audit-log-service/       # NEW — Go
├── event-bus-service/       # NEW — Go
├── feature-flag-service/    # NEW — Go
├── service-registry/        # NEW — Go
├── idempotency-service/     # NEW — Go
├── circuit-breaker-service/ # NEW — Go
├── request-validator/       # NEW — Go
├── token-service/           # NEW — Go
├── webhook-service/         # NEW — Go
├── queue-processor/         # NEW — Go
├── email-service/           # NEW — Python
├── analytics-service/       # NEW — Python
├── reporting-service/       # NEW — Python
├── search-service/          # NEW — Python
├── recommendation-service/  # NEW — Python
├── ml-inference-service/    # NEW — Python
├── data-pipeline-service/   # NEW — Python
├── sentiment-service/       # NEW — Python
├── export-service/          # NEW — Python
├── geo-service/             # NEW — Python
├── notification-service/    # NEW — Node.js
├── chat-service/            # NEW — Node.js
├── file-upload-service/     # NEW — Node.js
├── template-service/        # NEW — Node.js
├── comment-service/         # NEW — Node.js
├── activity-feed-service/   # NEW — Node.js
├── realtime-service/        # NEW — Node.js
├── markdown-service/        # NEW — Node.js
├── localization-service/    # NEW — Node.js
├── payment-service/         # NEW — Java
├── invoice-service/         # NEW — Java
├── subscription-service/    # NEW — Java
├── billing-service/         # NEW — Java
├── compliance-service/      # NEW — Java
├── encryption-service/      # NEW — Rust
├── image-processor/         # NEW — Rust
├── compression-service/     # NEW — Rust
├── docker-compose.yaml      # Existing
├── README.md                # Existing
└── services.json            # NEW — manifest of all 50 services
```

---

## What's Next

1. ✅ Test one service per language locally
2. ✅ Test Docker builds for each language
3. Push all services to GitHub
4. Build GitHub Actions CI with change detection + matrix builds
5. Set up ArgoCD ApplicationSets for auto-discovery
6. Write Terraform modules with for_each for all 50 services
