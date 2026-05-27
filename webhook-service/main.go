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
		port = "8099"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "webhook-service"})
	})

	http.HandleFunc("/webhooks", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"webhooks":[{"id":"wh_1","url":"https://example.com/hook","events":["task.created"]}]}`))
	})

	log.Printf("webhook-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
