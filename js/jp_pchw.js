var rule = {
    title: '荐片加速',
    host: 'https://pchwjiasu.abkc4.com/',
    homeUrl: '/', // 首页
    url: '/?s=vod-type-id-fyclass-wd--year-0-area--tag--order-hits_week-p-fypage.html', // 分类列表接口 - 修复分页
    class_name: '电影2&电视剧&动漫&综艺&纪录片',
    class_url: '1&2&3&4&22',
    detailUrl: '/?s=vod-read-id-fyid.html', // 详情接口
    searchUrl: '/?s=vod-search&wd=**', // 搜索接口
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    class_parse: '.navbar-nav li;a&&Text;a&&href;.*/vod-type-id-(\\d+)-order-hits_week.html', // 动态获取分类
    filter: {
        '类型': {
            '电影': '1',
            '电视剧': '2', 
            '动漫': '3',
            '综艺': '4',
            '纪录片': '22'
        },
        '地区': {
            '大陆': '大陆',
            '香港': '香港',
            '台湾': '台湾',
            '美国': '美国',
            '韩国': '韩国',
            '日本': '日本',
            '英国': '英国',
            '法国': '法国',
            '德国': '德国',
            '印度': '印度',
            '泰国': '泰国',
            '其他': '其他'
        },
        '年份': {
            '2025': '2025',
            '2024': '2024',
            '2023': '2023',
            '2022': '2022',
            '2021': '2021',
            '2020': '2020',
            '2019': '2019',
            '2018': '2018',
            '2017': '2017',
            '2016': '2016',
            '2015': '2015',
            '2014': '2014',
            '2013': '2013',
            '2012': '2012',
            '2011': '2011',
            '2010': '2010',
            '2009': '2009',
            '2008': '2008',
            '2007': '2007',
            '2006': '2006',
            '2005': '2005',
            '2004': '2004',
            '2003': '2003',
            '2002': '2002',
            '2001': '2001',
            '2000': '2000',
            '90年代': '90年代',
            '80年代': '80年代',
            '70年代': '70年代',
            '60年代': '60年代',
            '50年代': '50年代',
            '更早': '更早'
        }
    },
    filter_url: '&class={{fl.class}}&area={{fl.area}}&year={{fl.year}}',
    filter_def: {
        '类型': '1',
        '地区': '0',
        '年份': '0'
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://pchwjiasu.abkc4.com/',
        'Accept-Encoding': 'identity' // 修复内容压缩问题
    },
    timeout: 5000,
    limit: 8,
    pagecount: 10, // 修复分页：设置10页
    play_parse: true,
    play_json: [{
        re: '*',
        json: {
            parse: 0,
            jx: 0
        }
    }],
    lazy: '',
    推荐: '.h-s-list li;a&&title;img&&data-original;.mark&&Text;a&&title',
    一级: '.list li;a&&title;img&&data-original;.mark&&Text;a&&onclick',
    二级: {
        title: '.m-title&&Text',
        img: '.m-i-pic img&&data-original',
        desc: "js:let html=request(input);if(typeof html!=='string')html=String(html);let desc='';let title=html.match(/<div[^>]*class=\"[^\"]*m-title[^\"]*\"[^>]*>([^<]+)/);if(title)desc+=title[1].replace(/<[^>]*>/g,'')+'\\n';let actor=html.match(/主演：<\\/span>([\\s\\S]*?)<\\/div>/);if(actor)desc+='主演：'+actor[1].replace(/<[^>]*>/g,'').replace(/[\\s]+/g,' ')+'\\n';let director=html.match(/导演：<\\/span><a[^>]*>([^<]+)<\\/a>/);if(director)desc+='导演：'+director[1]+'\\n';let type=html.match(/类型：<\\/span><a[^>]*>([^<]+)<\\/a>/);if(type)desc+='类型：'+type[1]+'\\n';let year=html.match(/上映：<\\/span>([^<]+)/);if(year)desc+='上映：'+year[1]+'\\n';let area=html.match(/地区：<\\/span>([^<]+)/);if(area)desc+='地区：'+area[1]+'\\n';let update=html.match(/更新：([^<]+)/);if(update)desc+='更新：'+update[1];setResult(desc);",
        content: '.md-info&&Text',
        tabs: '道长在线',
        lists: "js:let d=[];let html=request(input);if(typeof html!=='string')html=String(html);let playUrls=[];let playNames=[];let scriptMatch=html.match(/<script[^>]*>g_PlayUrl='([\\s\\S]*?)'[\\s\\S]*?<\\/script>/);if(scriptMatch && scriptMatch[1] && scriptMatch[1].length>0){let arr=scriptMatch[1].split('#');for(let i=0;i<arr.length;i++){let kv=arr[i].split('$');if(kv.length==2){playNames.push(kv[0]);playUrls.push(kv[1]);}}}for(let i=0;i<playUrls.length;i++){d.push(playNames[i]||'播放'+(i+1)+'$'+playUrls[i]);}if(d.length==0){d.push('暂无播放源$http://www.baidu.com')} setResult([d]);"
    },
    搜索: '.search-main li.s-m-item;.s-t-title h4 a&&Text;a.pic img&&data-original;a.pic span.mark&&Text;a.pic&&onclick'
}; 