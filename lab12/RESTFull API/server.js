const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data
let users = [
    { id: 1, name: 'Tarun' },
    { id: 2, name: 'Rahul' }
];

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET single user by id
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    res.json(user);
});

// POST add user
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.json({ message: 'User added', users });
});

// PUT update user
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    users = users.map(u => u.id == id ? req.body : u);
    res.json({ message: 'User updated', users });
});

// DELETE user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    users = users.filter(u => u.id != id);
    res.json({ message: 'User deleted', users });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});