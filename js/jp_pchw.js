var rule = {
    title: '荐片加速',
    host: 'https://pchwjiasu.abkc4.com/',
    homeUrl: '/', // 首页
    url: '/?s=vod-type-id-fyclass-wd--year-0-area--tag--order-hits_week-p-{fypage}.html', // 分类列表接口 - 修复分页
    class_name: '电影&电视剧&动漫&综艺&纪录片',
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
    推荐: "js:let html=request(input);let d=[];let list=html.match(/<li[^>]*>[\s\S]*?<\/li>/g);if(list){for(let i=0;i<list.length;i++){let item=list[i];let title=item.match(/title=\"([^\"]+)\"/);let img=item.match(/data-original=\"([^\"]+)\"/);let mark=item.match(/<span[^>]*class=\"[^\"]*mark[^\"]*\"[^>]*>([^<]+)<\/span>/);let onclick=item.match(/TT\.Play\.OpenTab\\('([^']+)'[^)]*\)/);if(title && onclick){d.push([title[1],img?img[1]:'',mark?mark[1]:'',onclick[1]]);}}}setResult(d);",
    一级: "js:let html=request(input);let d=[];let list=html.match(/<li[^>]*>[\s\S]*?<\/li>/g);if(list){for(let i=0;i<list.length;i++){let item=list[i];let title=item.match(/title=\"([^\"]+)\"/);title=title?title[1]:'';let img=item.match(/data-original=\"([^\"]+)\"/);img=img?img[1]:'';let mark=item.match(/<span[^>]*class=\"[^\"]*mark[^\"]*\"[^>]*>([^<]+)<\/span>/);mark=mark?mark[1]:'';let onclick=item.match(/TT\.Play\.OpenTab\\('([^']+)'[^)]*\)/);if(onclick){d.push([title,img,mark,onclick[1]]);}}setResult(d);}",
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