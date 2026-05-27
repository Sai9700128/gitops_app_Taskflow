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
		port = "8094"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "service-registry"})
	})

	http.HandleFunc("/services", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"registered":[{"name":"user-service","host":"10.0.1.5","port":8080,"healthy":true}]}`))
	})

	log.Printf("service-registry listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
