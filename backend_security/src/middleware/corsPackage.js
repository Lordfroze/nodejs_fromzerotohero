const cors = require('cors')

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:8080',
            'http://localhost:3000',
            'https://your-domain.com',
        ]

        // jika tidak ada origin, perbolehkan semua
        if (!origin) return callback(null, true)

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = "Not allowed by CORS"
            return callback(new Error(msg), false)
        }

        // informasi cors
        credentials: true;
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'];
    }
}

const corsDev = cors({
    origin: '*',
    credentials: true,
})

module.exports = {
    cors: cors(corsOptions),
    corsDev
}
