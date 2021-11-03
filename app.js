const { tweet } = require('./api/twitter');
const { getText } = require('./api/notion');

require('dotenv').config();

const cron = async () => {
    tweet();
    // const text = await getText();
    // console.log(text)
};

cron();