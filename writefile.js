const fs = require('fs')
const data = JSON.stringify({
    pesan: "halo dari backend",
    waktu: new Date()
})

fs.writeFile('output.json', data, 'utf-8', (err) => {
    if (err) {
        console.log('Gagal menulis file', err.message)
        return
    } else {
        console.log('Berhasil menulis file')
    }
})
