var rule = {
    title: '荐片加速',
    host: 'https://pchwjiasu.abkc4.com/',
    homeUrl: '/', // 首页
    url: '/index.php?s=vod-type-id-fyclass-pg-fypage', // 分类列表接口
    class_name: '电影&电视剧&动漫&综艺&纪录片',
    class_url: '1&2&3&4&5',
    detailUrl: '/index.php?s=vod-detail-id-fyid', // 详情接口
    searchUrl: '/index.php?s=vod-search&wd=**', // 搜索接口
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    filter: {
        "1": [{"key": "class", "name": "分类", "value": [{"n": "全部", "v": ""}, {"n": "动作", "v": "动作"}, {"n": "喜剧", "v": "喜剧"}, {"n": "爱情", "v": "爱情"}, {"n": "科幻", "v": "科幻"}, {"n": "恐怖", "v": "恐怖"}, {"n": "剧情", "v": "剧情"}, {"n": "战争", "v": "战争"}, {"n": "动画", "v": "动画"}]}, {"key": "area", "name": "地区", "value": [{"n": "全部", "v": ""}, {"n": "大陆", "v": "大陆"}, {"n": "香港", "v": "香港"}, {"n": "台湾", "v": "台湾"}, {"n": "美国", "v": "美国"}, {"n": "韩国", "v": "韩国"}, {"n": "日本", "v": "日本"}, {"n": "泰国", "v": "泰国"}, {"n": "印度", "v": "印度"}]}, {"key": "year", "name": "年份", "value": [{"n": "全部", "v": ""}, {"n": "2025", "v": "2025"}, {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}]}],
        "2": [{"key": "class", "name": "分类", "value": [{"n": "全部", "v": ""}, {"n": "国产剧", "v": "国产剧"}, {"n": "港台剧", "v": "港台剧"}, {"n": "日韩剧", "v": "日韩剧"}, {"n": "欧美剧", "v": "欧美剧"}, {"n": "泰剧", "v": "泰剧"}]}, {"key": "area", "name": "地区", "value": [{"n": "全部", "v": ""}, {"n": "大陆", "v": "大陆"}, {"n": "香港", "v": "香港"}, {"n": "台湾", "v": "台湾"}, {"n": "美国", "v": "美国"}, {"n": "韩国", "v": "韩国"}, {"n": "日本", "v": "日本"}, {"n": "泰国", "v": "泰国"}]}, {"key": "year", "name": "年份", "value": [{"n": "全部", "v": ""}, {"n": "2025", "v": "2025"}, {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}]}],
        "3": [{"key": "class", "name": "分类", "value": [{"n": "全部", "v": ""}, {"n": "国产动漫", "v": "国产动漫"}, {"n": "日本动漫", "v": "日本动漫"}, {"n": "欧美动漫", "v": "欧美动漫"}, {"n": "港台动漫", "v": "港台动漫"}, {"n": "韩国动漫", "v": "韩国动漫"}]}, {"key": "area", "name": "地区", "value": [{"n": "全部", "v": ""}, {"n": "大陆", "v": "大陆"}, {"n": "日本", "v": "日本"}, {"n": "美国", "v": "美国"}, {"n": "韩国", "v": "韩国"}, {"n": "香港", "v": "香港"}, {"n": "台湾", "v": "台湾"}]}, {"key": "year", "name": "年份", "value": [{"n": "全部", "v": ""}, {"n": "2025", "v": "2025"}, {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}]}],
        "4": [{"key": "class", "name": "分类", "value": [{"n": "全部", "v": ""}, {"n": "大陆综艺", "v": "大陆综艺"}, {"n": "港台综艺", "v": "港台综艺"}, {"n": "日韩综艺", "v": "日韩综艺"}, {"n": "欧美综艺", "v": "欧美综艺"}]}, {"key": "area", "name": "地区", "value": [{"n": "全部", "v": ""}, {"n": "大陆", "v": "大陆"}, {"n": "香港", "v": "香港"}, {"n": "台湾", "v": "台湾"}, {"n": "美国", "v": "美国"}, {"n": "韩国", "v": "韩国"}, {"n": "日本", "v": "日本"}]}, {"key": "year", "name": "年份", "value": [{"n": "全部", "v": ""}, {"n": "2025", "v": "2025"}, {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}]}],
        "5": [{"key": "class", "name": "分类", "value": [{"n": "全部", "v": ""}, {"n": "自然", "v": "自然"}, {"n": "历史", "v": "历史"}, {"n": "军事", "v": "军事"}, {"n": "社会", "v": "社会"}, {"n": "人物", "v": "人物"}]}, {"key": "area", "name": "地区", "value": [{"n": "全部", "v": ""}, {"n": "大陆", "v": "大陆"}, {"n": "美国", "v": "美国"}, {"n": "英国", "v": "英国"}, {"n": "法国", "v": "法国"}, {"n": "德国", "v": "德国"}, {"n": "日本", "v": "日本"}]}, {"key": "year", "name": "年份", "value": [{"n": "全部", "v": ""}, {"n": "2025", "v": "2025"}, {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}]}]
    },
    filter_url: '&class={{fl.class}}&area={{fl.area}}&year={{fl.year}}',
    filter_def: {
        1: {class: '', area: '', year: ''},
        2: {class: '', area: '', year: ''},
        3: {class: '', area: '', year: ''},
        4: {class: '', area: '', year: ''},
        5: {class: '', area: '', year: ''}
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://pchwjiasu.abkc4.com/'
    },
    timeout: 5000,
    limit: 8,
    play_parse: true,
    play_json: [{
        re: '*',
        json: {
            parse: 0,
            jx: 0
        }
    }],
    lazy: '',
    推荐: '.module-items .module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
    一级: '.module-items .module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
    二级: {
        title: '.page-title&&Text;.module-info-tag&&Text',
        img: '.module-item-pic&&img&&data-src',
        desc: '.module-info-item:eq(0)&&Text;.module-info-item:eq(1)&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(3)&&Text',
        content: '.module-info-introduction&&Text',
        tabs: '.module-tab-item',
        lists: '.module-play-list:eq(#id) a'
    },
    搜索: '.module-items .module-search-item;a&&title;img&&data-src;.video-serial&&Text;a&&href'
}; 