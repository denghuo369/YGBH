var rule = {
    title: '荐片加速',
    host: 'https://pchwjiasu.abkc4.com',
    homeUrl: '/', // 首页
    url: '/?s=vod-type-id-fyclass-wd--year-0-area--tag--order-hits_week-p-fypage.html', // 分类列表接口 - 修复分页
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
        "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.2; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; Tablet PC 2.0)",
        "Accept": "*/*",
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
    推荐: '.list-main li;a&&title;img&&data-original;.mark&&Text;a&&onclick',
    一级: '.list-main li;a&&title;img&&data-original;.mark&&Text;a&&onclick',
    二级: `js:
        try {
            // 调试：检查输入URL和提取的ID
            console.log('🎬 === 开始解析详情页 ===');
            console.log('�� 输入内容: ' + input);
            console.log('📥 输入类型: ' + typeof input);
            console.log('📥 输入长度: ' + input.length);
            
            // 处理可能的复杂输入格式
            let actualUrl = input;
            let videoId = null;
            
            // 检查是否是onclick格式
            if(input.includes('TT.Play.OpenTab')) {
                console.log('📋 检测到onclick格式，开始提取URL...');
                // 从onclick中提取URL
                let match = input.match(/vod-read-id-(\\d+)/);
                if(match) {
                    actualUrl = '/?s=vod-read-id-' + match[1] + '.html';
                    videoId = match[1];
                    console.log('✅ 成功从onclick中提取到URL: ' + actualUrl);
                    console.log('✅ 提取到的视频ID: ' + videoId);
                } else {
                    console.log('❌ 从onclick中提取URL失败');
                    console.log('🔍 onclick内容: ' + input);
                }
            } else if(input.includes('vod-read-id-')) {
                console.log('📋 输入是标准URL格式');
                let match = input.match(/vod-read-id-(\\d+)/);
                if(match) {
                    videoId = match[1];
                    console.log('✅ 从标准URL中提取到视频ID: ' + videoId);
                }
            } else {
                console.log('❌ 无法识别的输入格式');
                console.log('🔍 尝试直接匹配数字...');
                let match = input.match(/(\\d+)/);
                if(match) {
                    actualUrl = '/?s=vod-read-id-' + match[1] + '.html';
                    videoId = match[1];
                    console.log('✅ 通过数字匹配提取到URL: ' + actualUrl);
                }
            }
            
            if (!videoId) {
                console.log('❌ 无法提取视频ID，尝试其他方法...');
                // 尝试从任何地方提取数字
                let anyMatch = input.match(/(\\d{4,})/);
                if(anyMatch) {
                    actualUrl = '/?s=vod-read-id-' + anyMatch[1] + '.html';
                    videoId = anyMatch[1];
                    console.log('✅ 通过通用数字匹配提取到URL: ' + actualUrl);
                }
            }
            
            if (videoId) {
                console.log('🎯 最终提取到的视频ID: ' + videoId);
                console.log('🔗 最终使用的URL: ' + actualUrl);
            } else {
                console.log('❌ 完全无法提取视频ID');
                console.log('🔗 将使用原始输入: ' + input);
                actualUrl = input;
            }
            
            console.log('🌐 开始请求HTML内容...');
            let html = request('https://pchwjiasu.abkc4.com'+actualUrl);
            if(typeof html !== 'string') html = String(html);
            
            // 调试：检查HTML内容长度
            console.log('📄 获取到的HTML长度: ' + html.length);
            console.log('📝 HTML前200字符: ' + html.substring(0, 200));
            
            // 检查是否获取到有效内容
            if(html.length < 100) {
                console.log('❌ HTML内容过短，可能请求失败');
                console.log('🔍 尝试使用原始输入重新请求...');
                if(actualUrl !== input) {
                    html = request(input);
                    if(typeof html !== 'string') html = String(html);
                    console.log('📄 重新请求后的HTML长度: ' + html.length);
                }
            }
            
            console.log('🔍 开始提取电影信息...');
            // 动态提取 - 根据实际内容搜索
            let title = '';
            let img = '';
            let actor = '';
            let director = '';
            let type = '';
            let year = '';
            let area = '';
            let update = '';
            
            // 标题 - 从m-title中提取
            let titleMatch = html.match(/<div[^>]*class="[^"]*m-title[^"]*"[^>]*>([^<]+)/);
            if (titleMatch) {
                title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
                console.log('✅ 找到标题: ' + title);
            } else {
                console.log('❌ 未找到标题，尝试其他方法...');
                // 尝试从其他地方提取标题
                let altTitleMatch = html.match(/<title>([^<]+)<\\/title>/);
                if(altTitleMatch) {
                    title = altTitleMatch[1].trim();
                    console.log('✅ 从title标签找到标题: ' + title);
                }
            }
            
            // 图片 - 从data-original中提取
            let imgMatch = html.match(/data-original="([^"]+)"/);
            if (imgMatch) {
                img = imgMatch[1];
                console.log('✅ 找到图片: ' + img);
            } else {
                console.log('❌ 未找到图片');
            }
            
            // 演员 - 从m-tag中提取
            let actorMatch = html.match(/主演：<\\/span>([^<]+)/);
            if (actorMatch) {
                actor = actorMatch[1].trim();
                console.log('✅ 找到演员: ' + actor);
            } else {
                console.log('❌ 未找到演员');
            }
            
            // 导演 - 从m-tags中提取
            let directorMatch = html.match(/导演：<\\/span><a[^>]*>([^<]+)<\\/a>/);
            if (directorMatch) {
                director = directorMatch[1].trim();
                console.log('✅ 找到导演: ' + director);
            } else {
                console.log('❌ 未找到导演');
            }
            
            // 类型 - 从m-tags中提取
            let typeMatch = html.match(/类型：<\\/span><a[^>]*>([^<]+)<\\/a>/);
            if (typeMatch) {
                type = typeMatch[1].trim();
                console.log('✅ 找到类型: ' + type);
            } else {
                console.log('❌ 未找到类型');
            }
            
            // 年份 - 从m-tags中提取
            let yearMatch = html.match(/上映：<\\/span>([^<]+)/);
            if (yearMatch) {
                year = yearMatch[1].trim();
                console.log('✅ 找到年份: ' + year);
            } else {
                console.log('❌ 未找到年份');
            }
            
            // 地区 - 从m-tags中提取
            let areaMatch = html.match(/地区：<\\/span>([^<]+)/);
            if (areaMatch) {
                area = areaMatch[1].trim();
                console.log('✅ 找到地区: ' + area);
            } else {
                console.log('❌ 未找到地区');
            }
            
            // 更新 - 从m-comment中提取
            let updateMatch = html.match(/更新：([^<]+)/);
            if (updateMatch) {
                update = updateMatch[1].trim();
                console.log('✅ 找到更新: ' + update);
            } else {
                console.log('❌ 未找到更新');
            }
            
            // 播放链接 - 从g_PlayUrl中提取
            let playUrls = [];
            let playNames = [];
            let scriptMatch = html.match(/g_PlayUrl='([^']+)'/);
            if (scriptMatch && scriptMatch[1]) {
                let arr = scriptMatch[1].split('#');
                for(let i = 0; i < arr.length; i++) {
                    let kv = arr[i].split('$');
                    if(kv.length == 2) {
                        playNames.push(kv[0]);
                        playUrls.push(kv[1]);
                    }
                }
                console.log('✅ 找到播放源数量: ' + playUrls.length);
            } else {
                console.log('❌ 未找到播放源');
            }
            
            // 构建播放列表
            let playFrom = '荐片';
            let playList = '';
            if(playUrls.length > 0) {
                playList = playUrls.map((url, index) => {
                    return (playNames[index] || '播放' + (index + 1)) + '$tvbox-xg:' + url;
                }).join('#');
            } else {
                playList = '暂无播放源$http://www.baidu.com';
            }
            
            // 构建VOD对象
            VOD = {
                vod_id: videoId || '11111',
                vod_name: title || '未知标题',
                vod_pic: img || '',
                type_name: type || '未知类型',
                vod_year: year || '',
                vod_area: area || '',
                vod_remarks: update || '',
                vod_actor: actor || '',
                vod_director: director || '',
                vod_content: (title || '未知标题') + '\\n主演：' + (actor || '未知') + '\\n导演：' + (director || '未知') + '\\n类型：' + (type || '未知') + '\\n上映：' + (year || '未知') + '\\n地区：' + (area || '未知') + '\\n更新：' + (update || '未知'),
                vod_play_from: playFrom,
                vod_play_url: playList
            };
            
            // 调试输出
            console.log('🎉 === 解析完成！最终VOD对象 ===');
            console.log('🆔 视频ID: ' + VOD.vod_id);
            console.log('📺 电影名称: ' + VOD.vod_name);
            console.log('🖼️ 封面图片: ' + VOD.vod_pic);
            console.log('🎭 主演: ' + VOD.vod_actor);
            console.log('🎬 导演: ' + VOD.vod_director);
            console.log('🎥 播放源: ' + VOD.vod_play_url);
            console.log('✨ === 详情页解析成功！===');
            
        } catch(e) {
            console.log('💥 解析详情页出错：' + e.message);
            console.log('🔧 错误堆栈: ' + e.stack);
            console.log('🔧 请检查网络连接或网站结构是否变化');
        }
    `,
    搜索: '.search-main li.s-m-item;.s-t-title h4 a&&Text;a.pic img&&data-original;a.pic span.mark&&Text;a.pic&&onclick'
};
