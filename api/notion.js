const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const getText = async () => {
    const { results } = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
            property: 'ステージ',
            select: {
                equals: "公開準備完了",
            },
        },
    });

    const data = results.map((page) => {
        return {
            data: page,
            id: page.id,
            text: page.properties.ツイート.title[0].text.content,
            date: page.properties.公開日.date,
            number: page.properties.文字数.formula.number,
        };
    });

    return data;
};

const updateStage = async (page_id, select) => {
    notion.pages.update({
        page_id: page_id,
        properties: {
            "ステージ": {
                select: {
                    name: select
                },
            },
        },
    });
};

const updateDate = async (page_id, date) => {
    await notion.pages.update({
        page_id: page_id,
        properties: {
            "公開日": {
                "date": {
                    "start": date
                },
            }
        },
    });
};

const updateLog = async (page_id, log) => {
    await notion.pages.update({
        page_id: page_id,
        properties: {
            "エラー": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": log
                        }
                    }
                ]
            },
        },
    });
};

module.exports = { getText, updateStage, updateDate, updateLog };
