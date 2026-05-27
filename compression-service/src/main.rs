use actix_web::{App, HttpServer, HttpResponse, get};
use serde_json::json;

#[get("/health")]
async fn health() -> HttpResponse {
    HttpResponse::Ok().json(json!({"status": "healthy", "service": "compression-service"}))
}

#[get("/compress")]
async fn business_logic() -> HttpResponse {
    HttpResponse::Ok().json(json!({"algorithms":["gzip","brotli","zstd"],"default":"zstd"}))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port: u16 = std::env::var("PORT")
        .unwrap_or_else(|_| "8127".to_string())
        .parse()
        .expect("PORT must be a number");

    println!("compression-service listening on :{}", port);
    HttpServer::new(|| {
        App::new()
            .service(health)
            .service(business_logic)
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
