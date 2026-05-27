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
		port = "8085"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "rate-limiter-service"})
	})

	http.HandleFunc("/limits", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"client":"api-key-123","requests_remaining":98,"window_seconds":60}`))
	})

	log.Printf("rate-limiter-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
