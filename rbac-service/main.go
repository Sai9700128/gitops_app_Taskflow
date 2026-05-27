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
		port = "8083"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "rbac-service"})
	})

	http.HandleFunc("/roles", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"roles":[{"id":1,"name":"admin","permissions":["read","write","delete"]}]}`))
	})

	log.Printf("rbac-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
