// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const cors = require('cors');
const cookieSession = require("cookie-session");

//Setup cross origin resource sharing
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieSession({
  name: 'session',
  keys: ['session-key'], 
  // maxAge: 24 * 60 * 60 * 1000, // 24 hours
  // credentials: true
})); 

app.use(express.json());

const db = require("./db");

// Separated Routes for each Resource
const spots = require("./routes/spots");
const labels = require("./routes/labels");
const users = require("./routes/users");
const login = require('./routes/login');
const visits = require("./routes/visits");

// Mount all resource routes
app.use("/api", spots(db));
app.use("/api", labels(db));
app.use("/api", users(db));
app.use('/api', login(db));
app.use("/api", visits(db));

// Home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});