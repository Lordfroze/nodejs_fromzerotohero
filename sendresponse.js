const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json')

    // option ketika cors
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // url submit dan method POST
    if (req.url === '/submit' && req.method === 'POST') {
        let body = '';

        // menangkap data dari request body
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        // request end dan validasi data
        req.on('end', () => {
            try {
                const data = JSON.parse(body);

                if (!data.name || !data.email) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({ error: 'Nama dan email wajib diisi' }));
                }
                console.log("data diterima", data);

                res.writeHead(201);
                res.end(JSON.stringify({
                    pesan: 'Data berhasil diterima',
                    data_yangdikirim: data
                }))
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Data tidak valid' }));
            }
        })
    } else if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: 'Server siap untuk menerima request',
        }));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
})