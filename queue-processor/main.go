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
		port = "8100"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "queue-processor"})
	})

	http.HandleFunc("/queues", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"queues":[{"name":"email","depth":23,"consumers":3}]}`))
	})

	log.Printf("queue-processor listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
