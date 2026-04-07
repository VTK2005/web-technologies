const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);

    if (q.pathname === '/') {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }

    else if (q.pathname === '/create') {
        fs.writeFile('sample.txt', 'Hello! File created.\n', (err) => {
            if (err) {
                res.write('Error creating file');
            } else {
                res.write('File created successfully');
            }
            res.end();
        });
    }

    else if (q.pathname === '/append') {
        fs.appendFile('sample.txt', 'New data appended.\n', (err) => {
            if (err) {
                res.write('Error appending file');
            } else {
                res.write('Data appended successfully');
            }
            res.end();
        });
    }

    else if (q.pathname === '/read') {
        fs.readFile('sample.txt', 'utf8', (err, data) => {
            if (err) {
                res.write('Error reading file');
            } else {
                res.write(data);
            }
            res.end();
        });
    }

    else if (q.pathname === '/delete') {
        fs.unlink('sample.txt', (err) => {
            if (err) {
                res.write('Error deleting file');
            } else {
                res.write('File deleted successfully');
            }
            res.end();
        });
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});