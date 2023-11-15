// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

const db = require("./db");

// Separated Routes for each Resource
const spots = require("./routes/spots");

// Mount all resource routes
app.use("/api", spots(db));

// Home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});