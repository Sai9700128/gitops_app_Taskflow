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
		port = "8092"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "event-bus-service"})
	})

	http.HandleFunc("/events", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"pending":42,"processed_today":15600,"consumers":8,"dead_letter":3}`))
	})

	log.Printf("event-bus-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
