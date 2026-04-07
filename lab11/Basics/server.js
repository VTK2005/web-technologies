const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    
    // Set header
    res.setHeader('Content-Type', 'text/html');

    // Read frontend file
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.write('Error loading file');
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

// Run server on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});