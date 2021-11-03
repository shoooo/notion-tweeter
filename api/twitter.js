const Twitter = require('twitter');

const twitter = new Twitter({
    consumer_key: process.env.TWITTER_API,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: process.env.AccessToken,
    access_token_secret: process.env.AccessToken_SECRET
});

const tweet = async () => {
    const { getText } = require('../api/notion');
    const text = await getText();

    const params = {
        status: text,
    }

    twitter.post('statuses/update', params, (error, tweets, response) => {
        console.log(error || tweets);
    });
};

module.exports = { tweet };