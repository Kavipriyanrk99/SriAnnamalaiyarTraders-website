require('dotenv').config();
const express = require('express');
const app = express();
const fsPromises = require('fs').promises;
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errHandler');

const PORT = process.env.PORT || 5500;

const pool = require('./config/dbConnection').getPool();

app.use(logger);

app.use(cookieParser());
app.use(express.urlencoded({ extended : false}));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'views', 'build', 'css')));
app.use('/', express.static(path.join(__dirname, 'views', 'build', 'js')));
app.use('/', express.static(path.join(__dirname, 'views', 'build', 'assets')));

app.use('/email', require('./routes/email'));

app.use('/admin', require('./routes/admin'));

app.get(`^(/|/index(.html)?)$`, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'index.html'));
})

app.get('/contact(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'contact.html'));
})

app.get('/tnpl-ace-marvel(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'tnpl-ace-marvel.html'));
})

app.get('/tnpl-copy-crown(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'tnpl-copy-crown.html'));
})

app.get('/tnpl-eco-maplitho(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'tnpl-eco-maplitho.html'));
})

app.get('/tnpl-elegant-print(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'tnpl-elegant-print.html'));
})

app.get('/tnpl-hitech-maplitho(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'tnpl-hitech-maplitho.html'));
})

app.get('/tnpl-platinum-copier(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'tnpl-platinum-copier.html'));
})

app.get('/tnpl-print-fine(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'tnpl-print-fine.html'));
})

app.get('/tnpl-radiant-platinum(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'tnpl-radiant-platinum.html'));
})

app.get('/tnpl-radiant-stationery(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'build', 'tnpl-radiant-stationery.html'));
})

app.all('*', (req, res)=>{
    res.sendStatus(404);
})

app.use(errorHandler);

pool
    .then(() => {
        console.log('MySQL connection pool created');
        app.listen(PORT, () => { console.log(`server is running at port ${PORT}`)});
    })
    .catch(error => {
        console.error('Error creating MySQL connection pool:', error);
        process.exit(1);
    })
