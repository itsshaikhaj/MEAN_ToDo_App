const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
const db = require('./config/db')

app.get('/', function (req, res) {
    res.send('Hello World!!!');
});


// Controllers
const todo = require('./routes/to_do_route');
app.use('/todo', todo);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
