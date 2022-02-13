package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"sort"
	"strconv"
	"time"

	"github.com/go-playground/validator"
	"github.com/gorilla/mux"
)

var validate *validator.Validate

type UpdateMessageValidate struct {
	Read *bool `json:"read" validate:"required"`
}

type CreateMessageValidate struct {
	Subject string `json:"subject" validate:"required"`
	Detail  string `json:"detail" validate:"required"`
}

func validateUpdate(m UpdateMessageValidate) error {
	validate = validator.New()
	err := validate.Struct(m)
	if err != nil {
		return err
	}
	return nil
}

func validateCreate(m CreateMessageValidate) error {
	validate = validator.New()
	err := validate.Struct(m)
	if err != nil {
		return errors.New("Fields subject and detail are required")
	}
	return nil
}

type ErrorResponse struct {
	Error string `json:"error"`
}

type SingleMessageResponse struct {
	Message Message `json:"message"`
}

type FindAllResponse struct {
	Messages []Message `json:"messages"`
}

type PingResponse struct {
	Message string `json:"message"`
}

type Message struct {
	ID        int    `json:"id"`
	Timestamp int    `json:"timestamp"`
	Subject   string `json:"subject"`
	Detail    string `json:"detail"`
	Read      bool   `json:"read"`
}

var messages = []Message{
	{
		ID:        1,
		Timestamp: 1644281883735,
		Subject:   "Golang Server",
		Detail:    "Create a backend service that serves JSON over HTTP",
	},
	{
		ID:        2,
		Timestamp: 1644281927508,
		Subject:   "New Server",
		Detail:    "Create a backend service that serves JSON over HTTP",
	},
}

func notFoundResponse(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNotFound)
	var response ErrorResponse
	response.Error = "Not found"
	json.NewEncoder(w).Encode(response)
}

func badRequestResponse(w http.ResponseWriter, m string) {
	w.WriteHeader(http.StatusBadRequest)
	var response ErrorResponse
	response.Error = m
	json.NewEncoder(w).Encode(response)
}

func pingHome(w http.ResponseWriter, r *http.Request) {
	var response PingResponse
	response.Message = "Server running"
	json.NewEncoder(w).Encode(response)
}

func createMessage(w http.ResponseWriter, r *http.Request) {
	var messageBody CreateMessageValidate
	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		badRequestResponse(w, "Fields subject and detail is required")
		return
	}

	json.Unmarshal(reqBody, &messageBody)

	err = validateCreate(messageBody)
	if err != nil {
		badRequestResponse(w, err.Error())
		return
	}

	var newMessage Message

	newMessage.Read = false
	newMessage.Timestamp = int(time.Now().UnixNano() / int64(time.Millisecond))
	newMessage.Subject = messageBody.Subject
	newMessage.Detail = messageBody.Detail

	biggestId := 0

	for i := range messages {
		if messages[i].ID > biggestId {
			biggestId = messages[i].ID
		}
	}

	newMessage.ID = biggestId + 1

	messages = append(messages, newMessage)
	w.WriteHeader(http.StatusCreated)

	var reponse SingleMessageResponse
	reponse.Message = newMessage
	json.NewEncoder(w).Encode(reponse)
}

func findOneMessage(w http.ResponseWriter, r *http.Request) {

	IDParam := mux.Vars(r)["id"]
	messageID, err := strconv.Atoi(IDParam)

	if err != nil {
		notFoundResponse(w)
		return
	}

	for _, messageLoop := range messages {
		if messageLoop.ID == messageID {
			var reponse SingleMessageResponse
			reponse.Message = messageLoop
			json.NewEncoder(w).Encode(reponse)
			return
		}
	}

	notFoundResponse(w)
}

func findAllMessages(w http.ResponseWriter, r *http.Request) {

	sort.SliceStable(messages, func(i, j int) bool {
		return messages[i].Timestamp > messages[j].Timestamp
	})

	json.NewEncoder(w).Encode(&FindAllResponse{Messages: messages})
}

func updateMessage(w http.ResponseWriter, r *http.Request) {
	IDParam := mux.Vars(r)["id"]
	messageID, err := strconv.Atoi(IDParam)

	if err != nil {
		notFoundResponse(w)
		return
	}

	var update UpdateMessageValidate

	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		badRequestResponse(w, "Field read is required")
		return
	}

	json.Unmarshal(reqBody, &update)

	err = validateUpdate(update)
	if err != nil {
		badRequestResponse(w, "Field read is required")
		return
	}

	for i, messageLoop := range messages {
		if messageLoop.ID == messageID {
			messageLoop.Read = *update.Read
			messages[i] = messageLoop
			var reponse SingleMessageResponse
			reponse.Message = messageLoop
			json.NewEncoder(w).Encode(reponse)
			return
		}
	}

	notFoundResponse(w)
}

func deleteMessage(w http.ResponseWriter, r *http.Request) {
	IDParam := mux.Vars(r)["id"]
	messageID, err := strconv.Atoi(IDParam)

	if err != nil {
		notFoundResponse(w)
		return
	}

	for i, messageLoop := range messages {
		if messageLoop.ID == messageID {
			messages = append(messages[:i], messages[i+1:]...)
			w.WriteHeader(http.StatusOK)
			var reponse SingleMessageResponse
			reponse.Message = messageLoop
			json.NewEncoder(w).Encode(reponse)
			return
		}
	}

	notFoundResponse(w)
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", pingHome)
	router.HandleFunc("/messages", findAllMessages).Methods("GET")
	router.HandleFunc("/messages/{id}", findOneMessage).Methods("GET")
	router.HandleFunc("/messages", createMessage).Methods("POST")
	router.HandleFunc("/messages/{id}", updateMessage).Methods("PATCH")
	router.HandleFunc("/messages/{id}", deleteMessage).Methods("DELETE")
	http.ListenAndServe(":8080", router)
}
