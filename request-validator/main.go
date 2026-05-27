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
		port = "8097"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "request-validator"})
	})

	http.HandleFunc("/rules", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"rules":[{"field":"email","type":"regex","pattern":"^.+@.+$"}]}`))
	})

	log.Printf("request-validator listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
