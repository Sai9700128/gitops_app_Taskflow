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
		port = "8090"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "metric-collector"})
	})

	http.HandleFunc("/metrics", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"cpu_percent":42.5,"memory_mb":512,"requests_per_sec":1250,"error_rate":0.02}`))
	})

	log.Printf("metric-collector listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
