const fs = require('fs')
fs.unlink('riwayat.txt', (err) => {
    if (err) {
        console.log('Gagal menghapus file', err.message)
        return
    } else {
        console.log('Berhasil menghapus file')
    }
})