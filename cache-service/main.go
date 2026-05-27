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
		port = "8087"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "cache-service"})
	})

	http.HandleFunc("/cache/stats", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"hits":15234,"misses":421,"hit_rate":0.973,"evictions":12}`))
	})

	log.Printf("cache-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
