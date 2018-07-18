const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const config = require('../../config');


module.exports = async (ctx) => {


    const response = await axios({
        method: 'get',
        url: 'https://dig.chouti.com/all/hot/recent/1',
        headers: {
            'User-Agent': config.ua,
        },
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $(".item");

    ctx.state.data = {
        title:'抽屉最热列表',
        link: 'https://dig.chouti.com',
        description: '抽屉最热列表',
        item:
        list &&
        list
            .map((index, item) => {
                item = $(item);
                return {
                    title: item.find('.part1 a').first().text(),
                    description: item.find('.part1 a').first().text(),
                    link: item.find('.part1 a').first().attr("href"),
                };
            })
            .get(),
    };
};
