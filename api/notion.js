const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

const getText = async () => {
    const query = {
        method: "POST",
        path: `databases/${database_id}/query`,
        page_size: 1,
        filter: {
            property: 'ステージ',
            select: {
                name: "公開準備完了",
            },
        },
    };

    const { results } = await notion.request(query);

    const data = results.map((page) => {
        console.log(page);
        return {
            data: page,
            id: page.id,
            tweet: page.properties.Name.title[0].text.content,
            stage: page.properties.ステージ.select.name,
        };
    });

    return data;
};

module.exports = { getText };