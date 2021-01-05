const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const apiKey = '029d3bb3dac24583a1a986973e3136d6';

app.get('/v2', (req, res) => {
  console.log(req.query);
  request(
    { url: `http://newsapi.org/v2/everything?q=watches&sortBy=publishedAt&apiKey=${apiKey}&page=${req.query.page}` },
    // eslint-disable-next-line consistent-return
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error ? error.message : 'Error' });
      }

      res.json(JSON.parse(body));
    },
  );
});

const PORT = 8080;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
