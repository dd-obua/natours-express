const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../../model/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB Connection successful!'));

// Read JSON file
const filePath = `${__dirname}/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded.');
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

// Delete all data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfuly deleted!');
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
