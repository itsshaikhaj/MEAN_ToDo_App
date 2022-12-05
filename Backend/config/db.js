const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
console.log('MONGO_URI :', MONGO_URI);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log('Error:', err.message);
});