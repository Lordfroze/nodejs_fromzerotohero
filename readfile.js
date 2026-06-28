const fs = require('fs').promises

// promise based
async function bacaFile() {
    try {
        const data = await fs.readFile('catatan.txt', 'utf-8')
        console.log(data)
    } catch (error) {
        console.log('Gagal membaca file', err.message)
    }
}

bacaFile()
