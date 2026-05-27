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
		port = "8096"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "circuit-breaker-service"})
	})

	http.HandleFunc("/circuits", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"circuits":{"payment-service":{"state":"closed","failures":0}}}`))
	})

	log.Printf("circuit-breaker-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
