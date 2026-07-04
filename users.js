const http = require('http')
const url = require('url')

// Memuat data user
let users = [
    { id: 1, nama: 'Yoga', email: 'yoga@example.com' },
    { id: 2, nama: 'Yoga2', email: 'yoga2@example.com' },
]

//  Menentukan id yang akan digunakan selanjutnya
let nextId = 3

// Membuat helper function untuk mengirim response json
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data))
}

// Membuat helper untuk mengambil body request JSON
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = ''
        req.on('data', (chunk) => body += chunk.toString())
        req.on('end', () => {
            try {
                resolve(JSON.parse(body))
            } catch (err) {
                reject(new Error('Invalid JSON Format'))
            }
        })
    })

}

// Membuat server HTTP
const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    // Handle jika terjadi OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.end()
    }

    // parsing URL
    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname
    const method = req.method

    // get all users request
    if (path === '/users' && method === 'GET') {
        sendJSON(res, 200, users)
    }

    // get user by id request
    else if (path.startsWith('/users/') && method === 'GET') {

        const id = parseInt(path.split('/')[2]) // mengambil id 2 dari path untuk contoh
        const user = users.find(u => u.id === id)
        if (user) {
            sendJSON(res, 200, user)
        } else {
            sendJSON(res, 404, { error: 'User tidak ditemukan' })
        }
    }

    // create user request
    else if (path === '/users' && method === 'POST') {
        try {
            const data = await parseBody(req)
            if (!data.nama || !data.email) {
                return sendJSON(res, 400, { error: 'Nama dan email wajib diisi' })
            }

            const newUser = {
                id: nextId++,
                ...data
            }
            users.push(newUser)
            sendJSON(res, 201, newUser)
        } catch (err) {
            sendJSON(res, 400, { error: 'Body request tidak valid' })
        }
    }

    // update user request
    else if (path.startsWith('/users/') && method === 'PUT') {
        const id = parseInt(path.split('/')[2])
        const userIndex = users.findIndex(u => u.id === id)

        if (userIndex === -1) {
            return sendJSON(res, 404, { error: 'User tidak ditemukan' })
        }

        try {
            const data = await parseBody(req)
            if (!data.nama && !data.email) {
                return sendJSON(res, 400, { error: 'Nama dan email wajib diisi' })
            }

            users[userIndex] = { id, ...data }
            sendJSON(res, 200, users[userIndex])
        } catch (err) {
            sendJSON(res, 400, { error: 'Body request tidak valid' })
        }
    }

    // delete user request
    else if (path.startsWith('/users/') && method === 'DELETE') {
        const id = parseInt(path.split('/')[2])
        const initialLength = users.length

        users = users.filter(u => u.id !== id) // menghapus user dengan id yang sesuai

        if (users.length < initialLength) {
            sendJSON(res, 200, { message: 'User berhasil dihapus' })
        } else {
            sendJSON(res, 404, { error: 'User tidak ditemukan' })
        }
    }

    else {
        sendJSON(res, 404, { error: 'Route tidak ditemukan' })
    }
})

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`)
})
