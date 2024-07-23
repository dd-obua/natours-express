const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// Start server
const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () => {
  console.log();
  console.log(`App running on port ${port}...`);
  console.log('-------------------------------');
});
