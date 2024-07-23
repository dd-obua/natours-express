const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => console.log(`Database connection successful!`))
  .catch((error) => console.error(`Error: ${error}`));

// Tour schema
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a name'] },
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () => {
  console.log();
  console.log(`App running on port ${port}...`);
  console.log('-------------------------------');
});
