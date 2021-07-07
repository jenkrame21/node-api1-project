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
            // WORKS!
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ message: "The users information could not be retrieved" });
        });
});

// GET - Returns the user object with the specified id
server.get("/api/users/:id", (req, res) => {

    dbFunctions.findById(req.params.id)
        .then(userById => {
            if(userById) {
                res.status(200).json(userById);
            } else{
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user information could not be retrieved" });
        });
});

// POST - Creates a user using the information sent inside the request body
server.post("/api/users", (req, res) => {
    const { name, bio } = req.body;

    if(!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
    } else {
        dbFunctions.insert(req.body)
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(() => {
                res.status(500).json({ message: "There was an error while saving the user to the database" });
            });
    }
});

// PUT - Updates the user with the specified id using data from the request body. Returns the modified user
server.put("/api/users/:id", (req, res) => {
    const userId = req.params.id 
    const { name, bio } = req.body;

    dbFunctions.update(userId, {name, bio})
        .then((userUpdated) => {
            if (!name || !bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" });
            } else if (!userUpdated) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else {
                res.status(200).json(userUpdated);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user information could not be modified" });
        });
});

// DELETE - Removes the user with the specified id and returns the deleted user
server.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id
    dbFunctions.remove(userId)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user could not be removed" })
        })
});

// CATCH-ALL - If any methods fail
server.use("*", (req, res) => {
    res.status(404).json({ message: "404 NOT FOUND" });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
