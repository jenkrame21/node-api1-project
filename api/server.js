// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
server.use(express.json());

const dbFunctions = require('./users/model');

// CRUD Operations here
// GET - Returns an array users
server.get("/api/users", (req, res) => {
    dbFunctions.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ message: "The users information could not be retrieved" });
        });
});

// GET - Returns the user object with the specified id
server.get("/api/users/:id", (req, res) => {

});

// POST - Creates a user using the information sent inside the request body
server.post("/api/users", (req, res) => {

});

// PUT - Updates the user with the specified id using data from the request body. Returns the modified user
server.put("/api/users/:id", (req, res) => {

});

// DELETE - Removes the user with the specified id and returns the deleted user
server.delete("/api/users/:id", (req, res) => {

});

// CATCH-ALL - If any methods fail
server.get("*", (req, res) => {
    res.status(404).json({ message: "404 NOT FOUND" });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
