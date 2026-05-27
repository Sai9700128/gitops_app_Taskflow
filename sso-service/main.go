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
		port = "8081"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "sso-service"})
	})

	http.HandleFunc("/sso/providers", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"providers":[{"name":"google","enabled":true,"client_id":"goog_xxx"},{"name":"github","enabled":true,"client_id":"gh_xxx"},{"name":"okta","enabled":false}]}`))
	})

	log.Printf("sso-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
