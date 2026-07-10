require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const { cors, corsDev } = require('./middleware/corsPackage')
const { validateRegister, validateLogin, isValidUsername, isValidEmail } = require('./middleware/validator') // importasi middleware validasi
const { escapeHTML, sanitizeFields, sanitizeBody } = require('./middleware/sanitizer') // import middleware sanitasi
const { basicAuth, requireRole } = require('./middleware/auth') // import middleware auth
const { hashPassword, verifyPassword, generateRandomPassword } = require('./middleware/bcrypt') // import middleware bcrypt

const users = [] // Membuat array untuk menyimpan data user

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

// endpoint sanitasi
app.post('/sanitize', sanitizeBody, (req, res) => {
    res.json({
        original: req.body,
        sanitized: req.body,
        message: `Sanitasi data berhasil dilakukan`,
    })
})

// endpoint sanitasi dengan fields
app.post('/sanitize-comment', sanitizeFields, (req, res) => {
    res.json({
        sanitized: req.body,
        message: `Comment sanitasi berhasil dilakukan`,
    })
})

// endpoint protected
app.get('/protected', basicAuth, (req, res) => {
    res.json({
        success: true,
        message: 'Acces Granted to Protected endpoint',
        user: req.user,
    })
})

// endpoint protected dengan role
app.get('/protected-admin', basicAuth, requireRole(['admin']), (req, res) => {
    res.json({
        success: true,
        message: 'Acces Granted to Protected Admin endpoint',
        user: req.user,
    })
})

// endpoint dashboard protected dengan role user dan admin
app.get('/dashboard', basicAuth, requireRole(['user', 'admin']), (req, res) => {
    res.json({
        success: true,
        message: 'Acces Granted to Dashboard endpoint',
        user: req.user,
        role: req.user.role,
    })
})

// endpoint hashing password
app.post('/daftar', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.json({
            error: 'Username and password are required',
        })
    }

    // debug hashing password
    console.log("input password:", password)
    const hashed = await hashPassword(password)
    console.log("hashed password:", hashed)

    // simpan user ke array users
    const newUser = {
        id: users.length + 1,
        username,
        password: hashed,
    }
    users.push(newUser)

    console.log("user tersimpan:", { id: newUser.id, username: newUser.username })

    res.json({
        success: true,
        message: 'Password hashed successfully',
        data: { id: newUser.id, username: newUser.username, }
    })
})

app.post('/masuk', async (req, res) => {
    const { username, password } = req.body

    const user = users.find(u => u.username === username)
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials',
        })
    }
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials',
        })
    }

    res.json({
        success: true,
        message: 'Login successful',
        user: { id: user.id, username: user.username, }
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