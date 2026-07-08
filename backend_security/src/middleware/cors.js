// middleware cors
const cors = (req, res, next) => {
    const allowedOrigins = [
        'http://localhost:8080',
        'http://localhost:3000',
        'https://your-domain.com',
    ]

    // jika origin ada di allowedOrigins
    const origin = req.header.origin
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }
    next()
}

// development perbolehkan semua
const corsDev = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')

    if (req.method === 'POST') {
        return res.sendStatus(204)
    }
    next()
}

module.exports = {
    cors,
    corsDev,
}