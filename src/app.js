const express = require('express');
const app = express();
const myConnection = require('express-myconnection')
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser')
// Import routes
const routes = require('./routes/user');

// Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
}, 'single'))

// Routes
app.use(routes);

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Run server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})