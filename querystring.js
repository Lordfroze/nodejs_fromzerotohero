const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname
    const query = parsedUrl.query

    res.setHeader('Content-Type', 'application/json')

    // validasi query string
    if (pathname === '/cari' && req.method === 'GET') {
        const { kategori, harga_max } = query

        if (!kategori) {
            res.writeHead(400)
            res.end(JSON.stringify({ message: 'Kategori wajib diisi' }))
        }

        // filter data berdasarkan kategori/nama dan harga max
        const hasil = [
            { nama: 'Laptop', harga: 1000000 },
            { nama: 'Monitor', harga: 500000 },
        ].filter(item => {
            const matchKategori = kategori === 'semua' || item.nama.toLowerCase().includes(kategori.toLowerCase())
            const matchHarga = !harga_max || item.harga <= parseInt(harga_max)

            return matchKategori && matchHarga
        })

        res.writeHead(200)
        res.end(JSON.stringify({
            query_diterima: query,
            jumlah_hasil: hasil.length,
            data: hasil
        }))
    }
    else if (pathname === '/') {
        res.writeHead(200)
        res.end(JSON.stringify({
            message: `Coba akses /cari?kategori=semua&harga_max=1000000`
        }))
    }
    else {
        res.writeHead(404)
        res.end(JSON.stringify({ error: 'Route tidak ditemukan' }))
    }
})

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`)
})