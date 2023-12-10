const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, result) => {
        if (err) throw err;

        if (result.length > 0 ) {
            req.session.username = username;
            req.session.role = result[0].role
            res.redirect("/dashboard");
        } else {
            req.session.error = "Invalid Username or Password. Please try again";
            res.redirect("/login")
        }

    })
})

module.exports = router