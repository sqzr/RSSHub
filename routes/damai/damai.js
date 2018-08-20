const axios = require('../../utils/axios');
const config = require('../../config');

module.exports = async (ctx) => {
    const { cty, ctl } = ctx.params;

    const response = await axios({
        method: 'post',
        url: `https://search.damai.cn/searchajax.html`,
        data: {
            keyword: '',
            cty: cty,
            ctl: ctl,
            tn: '',
            sctl: '',
            singleChar: '',
            tsg: 0,
            order: 3,
        },
        headers: {
            'User-Agent': config.ua,
            Referer: 'https://search.damai.cn/search.htm?spm=a2oeg.home.category.ditem_0.591b48d3yAYAwS&ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=',
        },
    });

    const list = response.data.pageData.resultData;


    ctx.state.data = {
        title: `大麦网 - ${cty}-${ctl}`,
        link: 'https://www.damai.cn/',
        item: list.map((item) => ({
            title: `${item.name} - ${item.actors}`,
            description: `${item.name}<br/>${item.actors}<br/>地点:${item.cityname} - ${item.venue}<br/>描述:${item.description}`,
            link: `https://piao.damai.cn/${item.projectid}.html`,
        })),
    };
};
