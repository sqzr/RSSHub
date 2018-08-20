const axios = require('../../utils/axios');
const config = require('../../config');

module.exports = async (ctx) => {
    const { id } = ctx.params;

    const response = await axios({
        method: 'post',
        url: `http://www.xiji.com/product-ajax_product_price-${id}.html`,
        headers: {
            'User-Agent': config.ua,
            Referer: 'http://www.xiji.com',
        },
    });
    const responseData = response.data;

    const info = {
        title: `价格:${responseData.price}`,
        guid: `${responseData.price}`,
        link: `http://www.xiji.com/product-${id}.html`,
    };
    const list1 = [];
    list1.push(info);
    ctx.state.data = {
        title: `西集网 - 价格监控 - ${id}`,
        link: 'http://www.xiji.com/',
        item: list1,
    };
};
