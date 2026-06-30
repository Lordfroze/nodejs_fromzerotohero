const path = require('path')
const filePath = path.join('data', 'users', 'profile.json')
console.log(filePath)

const configPath = path.resolve(__dirname, 'config', 'app.json')
console.log(configPath)

const fullPath = 'home/user/documents/report.pdf'
console.log(fullPath)
console.log(path.basename(fullPath))
console.log(path.extname(fullPath))
