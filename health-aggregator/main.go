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
		port = "8089"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "health-aggregator"})
	})

	http.HandleFunc("/status", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"services":{"user-service":"healthy","task-service":"healthy"},"overall":"healthy"}`))
	})

	log.Printf("health-aggregator listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
