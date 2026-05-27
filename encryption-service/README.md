# encryption-service

**Language:** rust
**Port:** 8125
**Endpoints:**

- `GET /health` — Health check
- `GET /encrypt` — encryption-service business logic

To run:

brew install rustup
curl --proto '=https' --tlsv1.2 -sSf <https://sh.rustup.rs> | sh
1 (when promted)
source $HOME/.cargo/env

cd encryption-service
cargo run

then test:
curl <http://localhost:8125/health>
curl <http://localhost:8125/encrypt>
