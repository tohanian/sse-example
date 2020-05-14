const http = require('http');

const port = 5000;
const streamFreq = 1000; // freq in ms

http
  .createServer((req, res) => {
    let id = 1;

    res.writeHead(200, {
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': '*',
    });

    const streamTimer = setInterval(() => {
      res.write(`id: ${id}\nevent: update\ndata: ${getRandInt()}\n\n`);
      id++;
    }, streamFreq);

    res.socket.on('close', () => {
      clearInterval(streamTimer);
      res.end();
    });
  })
  .listen(port);

// utility functions
function getRandInt() {
  return Math.floor(Math.random() * Math.floor(100));
}
