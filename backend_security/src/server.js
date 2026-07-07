require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
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