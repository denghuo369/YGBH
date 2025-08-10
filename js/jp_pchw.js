var rule = {
    title: '荐片加速',
    host: 'https://pchwjiasu.abkc4.com/',
    homeUrl: '/', // 首页
    url: '/?s=vod-type-id-fyclass-order-hits_week.html', // 分类列表接口 - 移除分页参数，因为网站不支持URL分页
    class_name: '电影&电视剧&动漫&综艺&纪录片',
    class_url: '1&2&3&4&22',
    detailUrl: '/?s=vod-detail-id-fyid.html', // 详情接口
    searchUrl: '/?s=vod-search&wd=**', // 搜索接口
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    class_parse: '.navbar-nav li;a&&Text;a&&href;.*/vod-type-id-(\\d+)-order-hits_week.html', // 动态获取分类
    filter: {
        "1": [{"key": "class", "name": "分类", "value": [{"n": "全部", "v": ""}, {"n": "动作片", "v": "动作片"}, {"n": "喜剧片", "v": "喜剧片"}, {"n": "爱情片", "v": "爱情片"}, {"n": "科幻片", "v": "科幻片"}, {"n": "恐怖片", "v": "恐怖片"}, {"n": "战争片", "v": "战争片"}, {"n": "剧情片", "v": "剧情片"}, {"n": "动画", "v": "动画"}, {"n": "其他", "v": "其他"}]}, {"key": "area", "name": "地区", "value": [{"n": "全部", "v": ""}, {"n": "大陆", "v": "大陆"}, {"n": "香港", "v": "香港"}, {"n": "台湾", "v": "台湾"}, {"n": "美国", "v": "美国"}, {"n": "韩国", "v": "韩国"}, {"n": "日本", "v": "日本"}, {"n": "泰国", "v": "泰国"}, {"n": "新加坡", "v": "新加坡"}, {"n": "马来", "v": "马来"}, {"n": "印度", "v": "印度"}, {"n": "英国", "v": "英国"}, {"n": "法国", "v": "法国"}, {"n": "加拿大", "v": "加拿大"}, {"n": "西班牙", "v": "西班牙"}, {"n": "俄罗斯", "v": "俄罗斯"}, {"n": "其它", "v": "其它"}]}, {"key": "year", "name": "年份", "value": [{"n": "全部", "v": ""}, {"n": "2025", "v": "2025"}, {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}, {"n": "2017", "v": "2017"}, {"n": "2016", "v": "2016"}, {"n": "2015", "v": "2015"}, {"n": "2014", "v": "2014"}, {"n": "2013", "v": "2013"}, {"n": "2012", "v": "2012"}, {"n": "90年代", "v": "90年代"}, {"n": "80后", "v": "80后"}, {"n": "更早", "v": "更早"}]}],
        "2": [{"key": "class", "name": "分类", "value": [{"n": "全部", "v": ""}, {"n": "国产剧", "v": "国产剧"}, {"n": "港台剧", "v": "港台剧"}, {"n": "日韩剧", "v": "日韩剧"}, {"n": "欧美剧", "v": "欧美剧"}, {"n": "泰剧", "v": "泰剧"}]}, {"key": "area", "name": "地区", "value": [{"n": "全部", "v": ""}, {"n": "大陆", "v": "大陆"}, {"n": "香港", "v": "香港"}, {"n": "台湾", "v": "台湾"}, {"n": "美国", "v": "美国"}, {"n": "韩国", "v": "韩国"}, {"n": "日本", "v": "日本"}, {"n": "泰国", "v": "泰国"}, {"n": "新加坡", "v": "新加坡"}, {"n": "马来", "v": "马来"}, {"n": "印度", "v": "印度"}, {"n": "英国", "v": "英国"}, {"n": "法国", "v": "法国"}, {"n": "加拿大", "v": "加拿大"}, {"n": "西班牙", "v": "西班牙"}, {"n": "俄罗斯", "v": "俄罗斯"}, {"n": "其它", "v": "其它"}]}, {"key": "year", "name": "年份", "value": [{"n": "全部", "v": ""}, {"n": "2025", "v": "2025"}, {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}, {"n": "2017", "v": "2017"}, {"n": "2016", "v": "2016"}, {"n": "2015", "v": "2015"}, {"n": "2014", "v": "2014"}, {"n": "2013", "v": "2013"}, {"n": "2012", "v": "2012"}, {"n": "90年代", "v": "90年代"}, {"n": "80后", "v": "80后"}, {"n": "更早", "v": "更早"}]}],
        "3": [{"key": "class", "name": "分类", "value": [{"n": "全部", "v": ""}, {"n": "国产动漫", "v": "国产动漫"}, {"n": "日本动漫", "v": "日本动漫"}, {"n": "欧美动漫", "v": "欧美动漫"}, {"n": "港台动漫", "v": "港台动漫"}, {"n": "韩国动漫", "v": "韩国动漫"}]}, {"key": "area", "name": "地区", "value": [{"n": "全部", "v": ""}, {"n": "大陆", "v": "大陆"}, {"n": "日本", "v": "日本"}, {"n": "美国", "v": "美国"}, {"n": "韩国", "v": "韩国"}, {"n": "香港", "v": "香港"}, {"n": "台湾", "v": "台湾"}]}, {"key": "year", "name": "年份", "value": [{"n": "全部", "v": ""}, {"n": "2025", "v": "2025"}, {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}, {"n": "2017", "v": "2017"}, {"n": "2016", "v": "2016"}, {"n": "2015", "v": "2015"}, {"n": "2014", "v": "2014"}, {"n": "2013", "v": "2013"}, {"n": "2012", "v": "2012"}, {"n": "90年代", "v": "90年代"}, {"n": "80后", "v": "80后"}, {"n": "更早", "v": "更早"}]}],
        "4": [{"key": "class", "name": "分类", "value": [{"n": "全部", "v": ""}, {"n": "大陆综艺", "v": "大陆综艺"}, {"n": "港台综艺", "v": "港台综艺"}, {"n": "日韩综艺", "v": "日韩综艺"}, {"n": "欧美综艺", "v": "欧美综艺"}]}, {"key": "area", "name": "地区", "value": [{"n": "全部", "v": ""}, {"n": "大陆", "v": "大陆"}, {"n": "香港", "v": "香港"}, {"n": "台湾", "v": "台湾"}, {"n": "美国", "v": "美国"}, {"n": "韩国", "v": "韩国"}, {"n": "日本", "v": "日本"}]}, {"key": "year", "name": "年份", "value": [{"n": "全部", "v": ""}, {"n": "2025", "v": "2025"}, {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}, {"n": "2017", "v": "2017"}, {"n": "2016", "v": "2016"}, {"n": "2015", "v": "2015"}, {"n": "2014", "v": "2014"}, {"n": "2013", "v": "2013"}, {"n": "2012", "v": "2012"}, {"n": "90年代", "v": "90年代"}, {"n": "80后", "v": "80后"}, {"n": "更早", "v": "更早"}]}],
        "22": [{"key": "class", "name": "分类", "value": [{"n": "全部", "v": ""}, {"n": "自然", "v": "自然"}, {"n": "历史", "v": "历史"}, {"n": "军事", "v": "军事"}, {"n": "社会", "v": "社会"}, {"n": "人物", "v": "人物"}]}, {"key": "area", "name": "地区", "value": [{"n": "全部", "v": ""}, {"n": "大陆", "v": "大陆"}, {"n": "美国", "v": "美国"}, {"n": "英国", "v": "英国"}, {"n": "法国", "v": "法国"}, {"n": "德国", "v": "德国"}, {"n": "日本", "v": "日本"}]}, {"key": "year", "name": "年份", "value": [{"n": "全部", "v": ""}, {"n": "2025", "v": "2025"}, {"n": "2024", "v": "2024"}, {"n": "2023", "v": "2023"}, {"n": "2022", "v": "2022"}, {"n": "2021", "v": "2021"}, {"n": "2020", "v": "2020"}, {"n": "2019", "v": "2019"}, {"n": "2018", "v": "2018"}, {"n": "2017", "v": "2017"}, {"n": "2016", "v": "2016"}, {"n": "2015", "v": "2015"}, {"n": "2014", "v": "2014"}, {"n": "2013", "v": "2013"}, {"n": "2012", "v": "2012"}, {"n": "90年代", "v": "90年代"}, {"n": "80后", "v": "80后"}, {"n": "更早", "v": "更早"}]}]
    },
    filter_url: '&class={{fl.class}}&area={{fl.area}}&year={{fl.year}}',
    filter_def: {
        1: {class: '', area: '', year: ''},
        2: {class: '', area: '', year: ''},
        3: {class: '', area: '', year: ''},
        4: {class: '', area: '', year: ''},
        22: {class: '', area: '', year: ''}
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://pchwjiasu.abkc4.com/'
    },
    timeout: 5000,
    limit: 8,
    // 移除pagecount，因为网站不支持URL分页
    play_parse: true,
    play_json: [{
        re: '*',
        json: {
            parse: 0,
            jx: 0
        }
    }],
    lazy: '',
    推荐: '.list-main li;a&&title;img&&data-original;.mark&&Text;a&&onclick',
    一级: '.list-main li;a&&title;img&&data-original;.mark&&Text;a&&onclick',
    二级: {
        title: '.m-title&&Text', // 修复：直接使用.m-title，不需要h1
        img: '.m-i-pic img&&data-original',
        desc: "js:let html=request(input);let desc='';let title=html.match(/<div[^>]*class=\"[^\"]*m-title[^\"]*\"[^>]*>([^<]+)/);if(title)desc+=title[1].replace(/<[^>]*>/g,'')+'\\n';let actor=html.match(/主演：<\/span><a[^>]*>([^<]+)<\/a>/);if(actor)desc+='主演：'+actor[1]+'\\n';let director=html.match(/导演：<\/span><a[^>]*>([^<]+)<\/a>/);if(director)desc+='导演：'+director[1]+'\\n';let type=html.match(/类型：<\/span><a[^>]*>([^<]+)<\/a>/);if(type)desc+='类型：'+type[1]+'\\n';let year=html.match(/上映：<\/span>([^<]+)/);if(year)desc+='上映：'+year[1]+'\\n';let area=html.match(/地区：<\/span>([^<]+)/);if(area)desc+='地区：'+area[1]+'\\n';let update=html.match(/更新：([^<]+)/);if(update)desc+='更新：'+update[1];setResult(desc);",
        content: '.md-info&&Text',
        tabs: '道长在线', // 恢复tabs设置
        lists: "js:let d=[];let html=request(input);console.log('Extracting play URLs...');let playUrls=[];let playNames=[];let m=html.match(/g_PlayUrl='([\\s\\S]*?)';/);if(m && m[1] && m[1].length>0){console.log('Found g_PlayUrl, length:', m[1].length);let arr=m[1].split('#');for(let i=0;i<arr.length;i++){let kv=arr[i].split('$');if(kv.length==2){playNames.push(kv[0]);playUrls.push(kv[1]);}}}if(playUrls.length==0){console.log('g_PlayUrl empty, trying script content...');let scriptMatch=html.match(/<script>g_PlayUrl='([\\s\\S]*?)';<\\/script>/);if(scriptMatch && scriptMatch[1] && scriptMatch[1].length>0){console.log('Found script content, length:', scriptMatch[1].length);let arr=scriptMatch[1].split('#');for(let i=0;i<arr.length;i++){let kv=arr[i].split('$');if(kv.length==2){playNames.push(kv[0]);playUrls.push(kv[1]);}}}}if(playUrls.length==0){console.log('Still no URLs, trying onclick method...');let onclickMatches=html.match(/onclick=\"TT\\.History\\.Insert\\([^)]+\\)/g);if(onclickMatches){for(let i=0;i<onclickMatches.length;i++){let match=onclickMatches[i];let nameMatch=match.match(/第([^']+)集/);let urlMatch=match.match(/ftp:\\/\\/[^']+/);if(nameMatch && urlMatch){playNames.push('第'+nameMatch[1]+'集');playUrls.push(urlMatch[0]);}}}if(playUrls.length==0){console.log('No play URLs found, checking for movie play buttons...');let playButtons=html.match(/<a[^>]*class=\"[^\"]*play[^\"]*\"[^>]*>([^<]+)<\/a>/g);if(playButtons){for(let i=0;i<playButtons.length;i++){let button=playButtons[i];let nameMatch=button.match(/>([^<]+)</);if(nameMatch){playNames.push(nameMatch[1]);playUrls.push('movie_play_'+i);}}}}console.log('Total play options found:', playUrls.length);for(let i=0;i<playUrls.length;i++){d.push([playNames[i]||'播放'+i, playUrls[i]]);}setResult([d]);"
    },
    搜索: '.search-main li.s-m-item;.s-t-title h4 a&&Text;a.pic img&&data-original;a.pic span.mark&&Text;a.pic&&onclick'
}; 