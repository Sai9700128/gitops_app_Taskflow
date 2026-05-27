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
		port = "8088"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "scheduler-service"})
	})

	http.HandleFunc("/jobs", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"jobs":[{"id":"job_1","cron":"0 */5 * * *","status":"active"}]}`))
	})

	log.Printf("scheduler-service listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
