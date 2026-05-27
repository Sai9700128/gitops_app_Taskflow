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
		port = "8082"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "session-service"})
	})

	http.HandleFunc("/sessions", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"session_id":"sess_abc","expires_at":"2026-12-01T00:00:00Z","active":true}`))
	})

	log.Printf("session-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
