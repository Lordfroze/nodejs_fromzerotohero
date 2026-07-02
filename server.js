const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true)
    const path = parseUrl.pathname
    const method = req.method

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('content-type', 'application/json')

    // routing manual
    if (path === '/' && method === 'GET') {
        res.writeHead(201)
        res.end(JSON.stringify({ message: 'selamat datang di server' }))
    } else if (path === '/users' && method === 'GET') {
        res.writeHead(201)
        res.end(JSON.stringify({ users: ['yoga', 'yoga2', 'yoga3'] }))
    } else {
        res.writeHead(404)
        res.end(JSON.stringify({ message: 'Halaman tidak ditemukan' }))
    }
})

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`)
})
