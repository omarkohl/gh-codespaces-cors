package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rs/cors"
)

func main() {
	r := chi.NewRouter()

	// Use default options
	r.Use(cors.Default().Handler)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	fmt.Println("Running on localhost:8080")
	http.ListenAndServe(":8080", r)
}
