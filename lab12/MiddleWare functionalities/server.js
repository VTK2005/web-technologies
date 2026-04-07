const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Global middleware
app.use((req, res, next) => {
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
});

// Second global middleware
app.use((req, res, next) => {
    console.log('Global Middleware 2 Executed');
    next();
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route-level middleware
function routeMiddleware(req, res, next) {
    console.log('Route Middleware Executed');
    next();
}

// Protected route
app.get('/middleware', routeMiddleware, (req, res) => {
    res.send('Middleware executed successfully');
});

// Another route
app.get('/about', (req, res) => {
    res.send('About Page');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});