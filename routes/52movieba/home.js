const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const config = require('../../config');


module.exports = async (ctx) => {


    const response = await axios({
        method: 'get',
        url: 'http://www.52movieba.com',
        headers: {
            'User-Agent': config.ua,
        },
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $(".thread");

    ctx.state.data = {
        title:'52movieba论坛',
        link: 'http://www.52movieba.com/',
        description: '52movieba论坛',
        item:
        list &&
        list
            .map((index, item) => {
                item = $(item);
                return {
                    title: item.find(".subject a").last().text(),
                    description: item.find(".td-subject .row").html(),
                    link: `http://www.52movieba.com/${item.find(".subject a").last().attr("href")}`,
                    guid: `${item.find(".subject a").last().attr("href")} - ${item.find(".subject a").last().text()}`
                };
            })
            .get(),
    };
};
