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
		port = "8084"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "api-gateway-service"})
	})

	http.HandleFunc("/routes", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"routes":[{"path":"/api/v1/users","upstream":"user-service:8080"}]}`))
	})

	log.Printf("api-gateway-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
