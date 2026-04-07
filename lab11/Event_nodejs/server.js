const http = require('http');
const fs = require('fs');
const url = require('url');
const events = require('events');

// Create event emitter object
const eventEmitter = new events.EventEmitter();

// First listener
eventEmitter.on('welcome', (name) => {
    console.log('Listener 1: Welcome ' + name);
});

// Second listener
eventEmitter.on('welcome', (name) => {
    console.log('Listener 2: Event received for ' + name);
});

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);

    if (q.pathname === '/') {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }

    else if (q.pathname === '/trigger') {
        
        // Emit custom event with data
        eventEmitter.emit('welcome', 'Tarun');

        res.write('Custom event triggered successfully');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});