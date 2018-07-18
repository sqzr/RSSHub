const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const config = require('../../config');


module.exports = async (ctx) => {
    var type = ctx.params.type;
    if (type === 'movie') {
        type = '';
    }else {
        type = `${type}/`;
    }

    const response = await axios({
        method: 'get',
        url: `http://www.dysfz.cc/${type}`,
        headers: {
            'User-Agent': config.ua,
        },
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $(".movie-list li");

    ctx.state.data = {
        title:'电影首发站',
        link: 'http://www.dysfz.cc/',
        description: '国内最优秀的高清电影下载网站，每天更新迅雷中英双字电影百度云盘下载，搜集和分享高清中英双字电影百度云盘下载站，致力于构建最大的高清电影下载汇聚地，迅雷电影下载、免费电影下载尽在电影首发站高清电影下载站',
        item:
        list &&
        list
            .map((index, item) => {
                item = $(item);
                return {
                    title: item.find('h2 a').text(),
                    description: `${item.find(".pic").html()} <br/> ${item.find(".txt").html()}`,
                    link: item.find('h2 a').attr("href"),
                    pubDate: new Date(item.find("p span").first().text()).toUTCString(),
                    guid: `${item.find('h2 a').attr("href")} - ${item.find('h2 a').text()}`
                };
            })
            .get(),
    };
};
