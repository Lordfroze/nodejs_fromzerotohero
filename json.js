const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // response data berisi pesan, waktu, status, dan fitur
    const responseData = {
        pesan: "Halo ini adalah pesan JSON dari server",
        waktu: new Date().toISOString(),
        status: 'sukses',
        fitur: ["routing", "parsing URL", "response JSON"]
    }

    // response dan mengubah data menjadi JSON
    res.writeHeader(200);
    res.end(JSON.stringify(responseData));
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
})