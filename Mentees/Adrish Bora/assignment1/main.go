package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
)

// User struct defines the data model for a user
type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

// CreateUserRequest struct defines the expected JSON body for POST requests
// We use binding:"required" for basic validation
type CreateUserRequest struct {
	Name  string `json:"name" binding:"required"`
	Email string `json:"email" binding:"required,email"` // Gin also supports 'email' validation
}

// Global variables
var (
	jsonFilePath = "users.json"  // Path to our JSON "database"
	fileMutex    = &sync.Mutex{} // Mutex to prevent race conditions when accessing the file
)

// readUsersFromFile reads the list of users from users.json
// This internal function assumes the mutex is already locked.
func readUsersFromFileInternal() ([]User, error) {
	// Read the file
	data, err := os.ReadFile(jsonFilePath)
	if err != nil {
		// If file doesn't exist, it's not an error. Return an empty slice.
		if os.IsNotExist(err) {
			return []User{}, nil
		}
		return nil, err
	}

	// If file is empty, return an empty slice
	if len(data) == 0 {
		return []User{}, nil
	}

	// Unmarshal JSON data into a slice of Users
	var users []User
	if err := json.Unmarshal(data, &users); err != nil {
		return nil, err
	}

	// If unmarshaling results in a nil slice (e.g., from "null" in the file),
	// return an empty slice instead.
	if users == nil {
		return []User{}, nil
	}

	return users, nil
}

// writeUsersToFile writes the provided slice of users back to users.json
// This internal function assumes the mutex is already locked.
func writeUsersToFileInternal(users []User) error {
	// Marshal the slice into JSON with indentation
	data, err := json.MarshalIndent(users, "", "  ")
	if err != nil {
		return err
	}

	// Write the data to the file, overwriting existing content
	// 0644 provides standard file permissions
	return os.WriteFile(jsonFilePath, data, 0644)
}

// getUsers handles GET /users
func getUsers(c *gin.Context) {
	// Lock the mutex to ensure safe concurrent reading
	fileMutex.Lock()
	defer fileMutex.Unlock()

	users, err := readUsersFromFileInternal()
	if err != nil {
		log.Printf("Error reading from file: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not read user data"})
		return
	}

	// Ensure we return an empty array `[]` instead of `null` if no users exist.
	if users == nil {
		c.JSON(http.StatusOK, []User{})
		return
	}

	c.JSON(http.StatusOK, users)
}

// createUser handles POST /users
func createUser(c *gin.Context) {
	var req CreateUserRequest

	// Bind the request body to the struct and validate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Lock the mutex for a "read-modify-write" operation
	fileMutex.Lock()
	defer fileMutex.Unlock()

	// Read existing users
	users, err := readUsersFromFileInternal()
	if err != nil {
		log.Printf("Error reading from file: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not read user data"})
		return
	}

	// Check for duplicate email (case-insensitive)
	for _, user := range users {
		if strings.EqualFold(user.Email, req.Email) {
			c.JSON(http.StatusConflict, gin.H{"error": "User with this email already exists"})
			return
		}
	}

	// Auto-generate the new ID
	newID := 1
	if len(users) > 0 {
		// Get the ID of the last user and increment it
		newID = users[len(users)-1].ID + 1
	}

	// Create the new user
	newUser := User{
		ID:    newID,
		Name:  req.Name,
		Email: req.Email,
	}

	// Add the new user to the slice
	users = append(users, newUser)

	// Write the updated slice back to the file
	if err := writeUsersToFileInternal(users); err != nil {
		log.Printf("Error writing to file: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save user data"})
		return
	}

	// Return the newly created user with a 201 Created status
	c.JSON(http.StatusCreated, newUser)
}

func main() {
	// Initialize Gin router
	router := gin.Default()

	// Define API routes
	router.GET("/users", getUsers)
	router.POST("/users", createUser)

	log.Println("Server starting on :8080...")
	// Start the server
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
