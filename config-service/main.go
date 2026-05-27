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
		port = "8086"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "config-service"})
	})

	http.HandleFunc("/configs", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"feature_flags":{"dark_mode":true,"beta_ui":false},"version":"2.1.0"}`))
	})

	log.Printf("config-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
