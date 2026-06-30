const os = require('os')
console.log(os.platform())
console.log(os.arch())

const cpus = os.cpus()
console.log(`Jumlah CPU: ${cpus.length}`)
console.log(`Model CPU: ${cpus[0].model}`)
