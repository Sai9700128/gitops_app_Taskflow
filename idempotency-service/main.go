package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8095"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "idempotency-service"})
	})

	http.HandleFunc("/keys", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"key":"idem_abc123","status":"completed","created_at":"2026-05-20T09:00:00Z"}`))
	})

	log.Printf("idempotency-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
