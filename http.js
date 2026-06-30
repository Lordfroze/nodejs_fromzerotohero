const http = require('http')
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World! dari nodejs native\n')
})

server.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000')
})