require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const { cors, corsDev } = require('./middleware/corsPackage')
const { validateRegister, validateLogin, isValidUsername, isValidEmail } = require('./middleware/validator') // importasi middleware validasi


// middleware
app.use(corsDev) // development perbolehkan semua
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes

// test cors
app.get('/test-cors', (req, res) => {
    res.json({
        message: 'CORS Test is Working',
        origin: req.header.origin,
        timestamp: new Date().toISOString(),
    })
})

// endpoint validator
app.post('/validate', (req, res) => {
    const { username, email, password } = req.body

    res.json({
        received: { username, email, password },
        validation: {
            username: isValidUsername(username),
            email: isValidEmail(email),
            password: isValidPassword(password),
        }
    })
})

// endpoint register dengan validator
app.post('/register', validateRegister, (req, res) => {
    res.json({
        success: true,
        message: 'validasi register berhasil',
        data: req.body,
    })
})

// endpoint login dengan validator
app.post('/login', validateLogin, (req, res) => {
    res.json({
        success: true,
        message: 'validasi login berhasil',
        username: req.body.username
    })
})

// test endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Backend Security Demo',
        endpoint: {
            cors: 'GET/test-cors',
            validation: 'POST/validate',
            sanitization: 'POST/sanitize',
            auth: 'GET/protected (Basic Auth)',
            hashing: 'POST/register'
        }
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

module.exports = app