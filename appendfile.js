const fs = require('fs')
const pesanBaru = "Transaksi berhasil: Rp.50.000\n"

fs.appendFile('riwayat.txt', pesanBaru, 'utf-8', (err) => {
    if (err) {
        console.log('Gagal menambahkan data', err.message)
        return
    } else {
        console.log('Berhasil menambahkan data')
    }
})