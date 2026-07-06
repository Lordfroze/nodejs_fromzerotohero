require("dotenv").config(); // load .env file

const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(express.json());
// welcome page
app.get("/", (req, res) => {
    res.send("Hello World! from express");
});

// get all users
app.get("/api/users", (req, res) => {
    const users = [
        { id: 1, name: "yoga", role: "admin" },
        { id: 2, name: "jane", role: "user" },
        { id: 3, name: "jim", role: "user" },
    ];
    res.json({
        status: "success",
        data: users,
    });
});

// Login
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME; // get admin username from .env file
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // get admin password from .env file

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.status(200).json({
            status: "success",
            message: "Login success",
        });
    } else {
        res.status(401).json({
            status: "error",
            message: "username atau password salah",
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}`);
});