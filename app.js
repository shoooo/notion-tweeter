const express = require("express");
require("dotenv").config();
const { tweetText } = require('./api/twitter');
const { getText, updatePage } = require('./api/notion');

const app = express();
require('dotenv').config();

const cron = async () => {
    tweetText();
};

cron();

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));