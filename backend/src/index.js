// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const cors = require('cors');

//Setup cross origin resource sharing
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const db = require("./db");

// Separated Routes for each Resource
const spots = require("./routes/spots");
const labels = require("./routes/labels");
const users = require("./routes/users");
const login = require('./routes/login');

// Mount all resource routes
app.use("/api", spots(db));
app.use("/api", labels(db));
app.use("/api", users(db));
app.use('/api', login);

// Home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.options('/api/login', (req, res) => {
  // Respond to preflight request
  res.status(200).end();
});



app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});