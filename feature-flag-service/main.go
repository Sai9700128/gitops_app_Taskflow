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
		port = "8093"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "feature-flag-service"})
	})

	http.HandleFunc("/flags", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"flags":{"new_dashboard":{"enabled":true,"rollout_pct":25}}}`))
	})

	log.Printf("feature-flag-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
