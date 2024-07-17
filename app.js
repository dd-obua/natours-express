const fs = require('fs');

const express = require('express');

const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Start server
const port = 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App running on port ${port}...`);
});
