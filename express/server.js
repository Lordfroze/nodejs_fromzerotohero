const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())
// welcome page
app.get('/', (req, res) => {
    res.send('Hello World! from express');
});

// get all users
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'yoga', role: 'admin' },
        { id: 2, name: 'jane', role: 'user' },
        { id: 3, name: 'jim', role: 'user' }
    ]
    res.json({
        status: 'success',
        data: users
    })
})

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'yoga' && password === '1234') {
        res.json({
            status: 'success',
            message: 'Login success'
        })
    } else {
        res.json({
            status: 'error',
            message: 'Login failed'
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}`);
});