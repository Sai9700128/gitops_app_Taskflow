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
		port = "8091"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "audit-log-service"})
	})

	http.HandleFunc("/audits", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"entries":[{"timestamp":"2026-05-20T10:00:00Z","actor":"admin","action":"user.create"}]}`))
	})

	log.Printf("audit-log-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
