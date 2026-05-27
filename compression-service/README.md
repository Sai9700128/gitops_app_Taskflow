# compression-service

**Language:** rust
**Port:** 8127
**Endpoints:**

- `GET /health` — Health check
- `GET /compress` — compression-service business logic

To run:

brew install rustup
curl --proto '=https' --tlsv1.2 -sSf <https://sh.rustup.rs> | sh
1 (when promted)
source $HOME/.cargo/env

cd compression-service
cargo run

then test:
curl <http://localhost:8127/health>
curl <http://localhost:8127/compress>
