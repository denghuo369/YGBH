var rule = {
    title: '荐片加速',
    host: 'https://pchwjiasu.abkc4.com/',
    homeUrl: '/', // 首页路径，实际采集时可根据站点API调整
    url: '/', // 分类/分页API路径，需根据实际API调整
    class_name: '电影&电视剧&动漫&综艺&纪录片',
    class_url: '1&2&3&4&5',
    detailUrl: '/', // 详情API路径，需根据实际API调整
    searchUrl: '/', // 搜索API路径，需根据实际API调整
    searchable: 1,
    quickSearch: 1,
    filterable: 0,
    filter: {},
    filter_url: '',
    filter_def: {},
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
    推荐: '', // 推荐内容采集规则，需根据实际页面结构调整
    一级: '', // 一级列表采集规则，需根据实际页面结构调整
    二级: '', // 详情页采集规则，需根据实际页面结构调整
    搜索: '' // 搜索采集规则，需根据实际页面结构调整
}; 