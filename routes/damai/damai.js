const axios = require('../../utils/axios');
const config = require('../../config');

module.exports = async (ctx) => {
    const { cty, ctl } = ctx.params;

    const response = await axios({
        method: 'post',
        url: `https://search.damai.cn/searchajax.html?cty=${encodeURIComponent(cty)}&ctl=${encodeURIComponent(ctl)}&order=3&tsg=0`,
        headers: {
            'User-Agent': config.ua,
            Referer: 'https://search.damai.cn/search.htm?spm=a2oeg.home.category.ditem_0.591b48d3yAYAwS&ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=',
            Cookie: `x_hm_tuid=RwD8PAtBB8HJuHiiYy5lCPc80hUMzaAR3gXx8A4K9AEi+JgikL/Sa0FLVy3vtg/S; cookie2=1e452bceef0f6d15e76e42b3d86ebf77; t=fb395f5eab197d5ec95c443202e0142d; _tb_token_=ea561ff0ef7a1; destCity=%u5168%u56FD; _uab_collina=153474458470759440982183; _umdata=535523100CBE37C3C25A65714519973163D1A49E17CF16DEB912A123FA9F1BA8B83951FA5995782FCD43AD3E795C914C10A0DA414F62B4421FFE357C4FAB852A; isg=BAIC-YK67aewDvF7YqshbEImUwhk0wbtWXQEDkwbHXUqn6MZNWeg_8v-S9tGz36F; x5sec=7b226d65632d67756964652d7765623b32223a2239366664383934353237343133386130326562326637373636303837323230614350697736647346454e752b337161796d4a6d6852513d3d227d; enc=yd32wykLPDqe80zhDeN3IYE4rBSrVDyrcr741MM67lHlIDrvwwb7fLsWfTYg10hqgS%2BofEIrNxmFGKp%2FgZUGFQ%3D%3D`,
        },
    });

    const list = response.data.pageData.resultData;

    ctx.state.data = {
        title: `大麦网 - ${cty} - ${ctl}`,
        link: 'https://www.damai.cn/',
        item: list.map((item) => ({
            title: `${item.name}  - ${item.showtime}`,
            description: `<img src=${item.verticalPic} />${item.name}<br/>${item.actors}<br/>地点:${item.cityname} - ${item.venue}<br/>描述:${item.description}<br/>状态:${item.showstatus}`,
            link: `https://piao.damai.cn/${item.projectid}.html`,
        })),
    };
};
