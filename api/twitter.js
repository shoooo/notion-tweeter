const Twitter = require('twitter');
const { getText, updateStage, updateDate, updateLog } = require('../api/notion');

const twitter = new Twitter({
    consumer_key: process.env.TWITTER_API,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: process.env.AccessToken,
    access_token_secret: process.env.AccessToken_SECRET
});

const tweetText = async () => {
    const today = new Date().toISOString()
    const text = await getText();

    console.log(text[0].text);

    if (text.length === 0) {
        console.log("no tweet!");
    } else {
        const page_id = text[0].data.id

        if (text[0].number >= 140) {
            updateStage(page_id, "投稿しない/できない")
        } else {
            const params = {
                status: text[0].text,
            }

            twitter.post('statuses/update', params, (error, result) => {
                console.log(error || result);
                if (error) {
                    updateStage(page_id, "投稿しない/できない")
                    // updateLog(page_id, error[0].message)
                } else {
                    updateStage(page_id, "公開済み")
                    // updateDate(page_id, today);
                }
            });
        }
    }
};

module.exports = { tweetText };