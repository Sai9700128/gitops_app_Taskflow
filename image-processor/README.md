# image-processor

**Language:** rust
**Port:** 8126
**Endpoints:**

- `GET /health` — Health check
- `GET /process` — image-processor business logic

To run:

brew install rustup
curl --proto '=https' --tlsv1.2 -sSf <https://sh.rustup.rs> | sh
1 (when promted)
source $HOME/.cargo/env

cd image-processor
cargo run

then test:
curl <http://localhost:8126/health>
curl <http://localhost:8126/process>
