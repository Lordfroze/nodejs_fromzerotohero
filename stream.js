const fs = require('fs')

const readStream = fs.createReadStream('video.mp4')
const writeStream = fs.createWriteStream('video-copy.mp4')

readStream.pipe(writeStream)

writeStream.on('finish', () => {
    console.log('Video berhasil di copy')
})

readStream.on('error', (err) => {
    console.log('Error saat membaca video', err.message)
})

writeStream.on('error', (err) => {
    console.log('Error saat menulis video', err.message)
})
