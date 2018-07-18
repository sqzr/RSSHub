const axios = require('../../utils/axios');
const config = require('../../config');


module.exports = async (ctx) => {


    const response = await axios({
        method: 'get',
        url: 'https://dig.chouti.com/getTopTenLinksOrComments.json',
        headers: {
            'User-Agent': config.ua,
        },
    });

    const data = response.data.result.data;


    ctx.state.data = {
        title:'抽屉最热榜',
        link: 'https://dig.chouti.com',
        description: '抽屉最热榜',
        item:
        data &&
        data
            .map((item) => {
                return {
                    title: item.title,
                    description: `<a href="${item.url}">link</a><br/><img src="${item.originalImgUrl}"/><br/>`,
                    link: `https://dig.chouti.com${item.commentsUrl}`
                };
            }),
    };
};
