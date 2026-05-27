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
		port = "8098"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "token-service"})
	})

	http.HandleFunc("/tokens/validate", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"valid":true,"token_type":"access","expires_in":3600}`))
	})

	log.Printf("token-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
