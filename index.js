const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Browserbase SSE Server is running!');
});

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ message: 'ping' })}\n\n`);
  }, 10000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`SSE Server running on port ${port}`);
});

