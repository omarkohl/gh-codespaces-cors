package main

import (
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func main() {
	r := chi.NewRouter()

	// Use default options
	//r.Use(cors.Default().Handler)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	r.Post("/api/user", func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()
		b, err := io.ReadAll(r.Body)
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Println(string(b))
		w.Write([]byte("{\"message\": \"user created\"}"))
	})

	fmt.Println("Running on localhost:8080")
	http.ListenAndServe(":8080", r)
}
