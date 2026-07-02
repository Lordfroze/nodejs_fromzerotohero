const http = require('http')

const server = http.createServer((req, res) => {
    const { url, method } = req

    // success 200 OK
    if (url === '/success' && method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-control': 'public, max-age=60'
        })

        res.end(JSON.stringify({
            message: 'success'
        }))
        // created 201 Created
    } else if (url === '/created' && method === 'POST') {
        res.writeHead(201, {
            'Content-Type': 'application/json',
        })

        res.end(JSON.stringify({
            message: 'created',
            id: 123,
            name: 'yoga'
        }))
        // not found 404 Not Found
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({ message: 'Halaman tidak ditemukan' }))
    }
})

const port = 3000
server.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})
