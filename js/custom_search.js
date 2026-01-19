// MD5哈希函数实现
function md5(string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function md5_F(x, y, z) { return (x & y) | ((~x) & z); }
    function md5_G(x, y, z) { return (x & z) | (y & (~z)); }
    function md5_H(x, y, z) { return (x ^ y ^ z); }
    function md5_I(x, y, z) { return (y ^ (x | (~z))); }

    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function md5_WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, d, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, d, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, d, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, d, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, d, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, d, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }

    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}

// 生成时间相关的加密参数
function getCurrentDateInfo() {
    let r = new Date();
    let o = r.getTime();
    let s = 6e4 * r.getTimezoneOffset();
    let a = new Date(o + s + 36e5 * 8);

    // 构建z参数 - 使用日期和md5加密
    let dayValue = a.getDate() + 9 + 9 ^ 10;
    let zValue = md5(String(dayValue));
    zValue = zValue.substring(0, 10);
    zValue = md5(zValue); // 再次加密

    // 构建s1ig参数
    let s1igValue = a.getDay() + 11397;

    // 构建g参数
    let gValue = Math.floor(Math.random() * 1000000).toString();

    return {
        z: zValue,
        s1ig: s1igValue,
        g: gValue
    };
}

var rule = {
    title: '360影视',
    host: 'https://www.360kan.com',
    homeUrl: 'https://api.web.360kan.com/v1/rank?cat=2&size=9',
    detailUrl: 'https://api.web.360kan.com/v1/detail?cat=fyclass&id=fyid',
    searchUrl: 'https://api.so.360kan.com/index?force_v=1&kw=**&from=&pageno=fypage&v_ap=1&tab=all',
    //url:'https://api.web.360kan.com/v1/filter/list?catid=fyclass&rank=rankhot&cat=&year=&area=&act=&size=35&pageno=fypage&callback=',
    url: 'https://api.web.360kan.com/v1/filter/list?catid=fyclassfyfilter',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}&rank={{fl.by}}&cat={{fl.class}}&year={{fl.year}}&area={{fl.area}}&act={{fl.act}}&size=35&pageno=fypage&callback=',
    filter: {
        "1": [
            {
                "key": "class", "name": "剧情", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "喜剧", "v": "喜剧"},
                    {"n": "爱情", "v": "爱情"},
                    {"n": "动作", "v": "动作"},
                    {"n": "恐怖", "v": "恐怖"},
                    {"n": "科幻", "v": "科幻"},
                    {"n": "剧情", "v": "剧情"},
                    {"n": "犯罪", "v": "犯罪"},
                    {"n": "奇幻", "v": "奇幻"},
                    {"n": "战争", "v": "战争"},
                    {"n": "悬疑", "v": "悬疑"},
                    {"n": "动画", "v": "动画"},
                    {"n": "文艺", "v": "文艺"},
                    {"n": "纪录", "v": "纪录"},
                    {"n": "传记", "v": "传记"},
                    {"n": "歌舞", "v": "歌舞"},
                    {"n": "古装", "v": "古装"},
                    {"n": "历史", "v": "历史"},
                    {"n": "惊悚", "v": "惊悚"},
                    {"n": "伦理", "v": "伦理"},
                    {"n": "其他", "v": "其他"}]
            },

            {
                "key": "area", "name": "地区", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "内地", "v": "大陆"},
                    {"n": "中国香港", "v": "香港"},
                    {"n": "中国台湾", "v": "台湾"},
                    {"n": "泰国", "v": "泰国"},
                    {"n": "美国", "v": "美国"},
                    {"n": "韩国", "v": "韩国"},
                    {"n": "日本", "v": "日本"},
                    {"n": "法国", "v": "法国"},
                    {"n": "英国", "v": "英国"},
                    {"n": "德国", "v": "德国"},
                    {"n": "印度", "v": "印度"},
                    {"n": "其他", "v": "其他"}]
            },

            {
                "key": "act", "name": "明星", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "成龙", "v": "成龙"},
                    {"n": "周星驰", "v": "周星驰"},
                    {"n": "李连杰", "v": "李连杰"},
                    {"n": "林正英", "v": "林正英"},
                    {"n": "吴京", "v": "吴京"},
                    {"n": "徐峥", "v": "徐峥"},
                    {"n": "黄渤", "v": "黄渤"},
                    {"n": "王宝强", "v": "王宝强"},
                    {"n": "李小龙", "v": "李小龙"},
                    {"n": "张国荣", "v": "张国荣"},
                    {"n": "洪金宝", "v": "洪金宝"},
                    {"n": "姜文", "v": "姜文"},
                    {"n": "沈腾", "v": "沈腾"},
                    {"n": "邓超", "v": "邓超"},
                    {"n": "巩俐", "v": "巩俐"},
                    {"n": "马丽", "v": "马丽"},
                    {"n": "闫妮", "v": "闫妮"},
                    {"n": "周冬雨", "v": "周冬雨"},
                    {"n": "刘昊然", "v": "刘昊然"},
                    {"n": "汤唯", "v": "汤唯"},
                    {"n": "舒淇", "v": "舒淇"},
                    {"n": "白百何", "v": "白百何"}]
            },

            {
                "key": "year", "name": "年份", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "2026", "v": "2026"},
                    {"n": "2025", "v": "2025"},
                    {"n": "2024", "v": "2024"},
                    {"n": "2023", "v": "2023"},
                    {"n": "2022", "v": "2022"},
                    {"n": "2021", "v": "2021"},
                    {"n": "2020", "v": "2020"},
                    {"n": "2019", "v": "2019"},
                    {"n": "2018", "v": "2018"},
                    {"n": "2017", "v": "2017"},
                    {"n": "2016", "v": "2016"},
                    {"n": "2015", "v": "2015"},
                    {"n": "2014", "v": "2014"},
                    {"n": "2013", "v": "2013"},
                    {"n": "2012", "v": "2012"},
                    {"n": "更早", "v": "lt_year"}]
            },

            {
                "key": "by", "name": "排序", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "最近热映", "v": "rankhot"},
                    {"n": "最近上映", "v": "ranklatest"},
                    {"n": "最受好评", "v": "rankpoint"}]
            }],

        "2": [
            {
                "key": "class", "name": "剧情", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "言情", "v": "言情"},
                    {"n": "剧情", "v": "剧情"},
                    {"n": "伦理", "v": "伦理"},
                    {"n": "喜剧", "v": "喜剧"},
                    {"n": "悬疑", "v": "悬疑"},
                    {"n": "都市", "v": "都市"},
                    {"n": "偶像", "v": "偶像"},
                    {"n": "古装", "v": "古装"},
                    {"n": "军事", "v": "军事"},
                    {"n": "警匪", "v": "警匪"},
                    {"n": "历史", "v": "历史"},
                    {"n": "励志", "v": "励志"},
                    {"n": "神话", "v": "神话"},
                    {"n": "谍战", "v": "谍战"},
                    {"n": "青春", "v": "青春剧"},
                    {"n": "家庭", "v": "家庭剧"},
                    {"n": "动作", "v": "动作"},
                    {"n": "情景", "v": "情景"},
                    {"n": "武侠", "v": "武侠"},
                    {"n": "科幻", "v": "科幻"},
                    {"n": "其他", "v": "其他"}]
            },

            {
                "key": "area", "name": "地区", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "内地", "v": "内地"},
                    {"n": "中国香港", "v": "香港"},
                    {"n": "中国台湾", "v": "台湾"},
                    {"n": "泰国", "v": "泰国"},
                    {"n": "日本", "v": "日本"},
                    {"n": "韩国", "v": "韩国"},
                    {"n": "美国", "v": "美国"},
                    {"n": "英国", "v": "英国"},
                    {"n": "新加坡", "v": "新加坡"}]
            },

            {
                "key": "act", "name": "明星", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "杨幂", "v": "杨幂"},
                    {"n": "热巴", "v": "迪丽热巴"},
                    {"n": "张嘉译", "v": "张嘉译"},
                    {"n": "赵丽颖", "v": "赵丽颖"},
                    {"n": "赵又廷", "v": "赵又廷"},
                    {"n": "胡歌", "v": "胡歌"},
                    {"n": "孙俪", "v": "孙俪"},
                    {"n": "韩东君", "v": "韩东君"},
                    {"n": "周迅", "v": "周迅"},
                    {"n": "张一山", "v": "张一山"},
                    {"n": "李小璐", "v": "李小璐"},
                    {"n": "李沁", "v": "李沁"},
                    {"n": "陈坤", "v": "陈坤"},
                    {"n": "刘亦菲", "v": "刘亦菲"},
                    {"n": "唐嫣", "v": "唐嫣"},
                    {"n": "李小冉", "v": "李小冉"},
                    {"n": "周冬雨", "v": "周冬雨"},
                    {"n": "于和伟", "v": "于和伟"},
                    {"n": "李易峰", "v": "李易峰"},
                    {"n": "雷佳音", "v": "雷佳音"},
                    {"n": "何冰", "v": "何冰"},
                    {"n": "阮经天", "v": "阮经天"},
                    {"n": "梅婷", "v": "梅婷"},
                    {"n": "徐峥", "v": "徐峥"},
                    {"n": "祖峰", "v": "祖峰"},
                    {"n": "秦海璐", "v": "秦海璐"},
                    {"n": "杨紫", "v": "杨紫"},
                    {"n": "任嘉伦", "v": "任嘉伦"},
                    {"n": "贾乃亮", "v": "贾乃亮"},
                    {"n": "罗晋", "v": "罗晋"}]
            },

            {
                "key": "year", "name": "年份", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "2026", "v": "2026"},
                    {"n": "2025", "v": "2025"},
                    {"n": "2024", "v": "2024"},
                    {"n": "2023", "v": "2023"},
                    {"n": "2022", "v": "2022"},
                    {"n": "2021", "v": "2021"},
                    {"n": "2020", "v": "2020"},
                    {"n": "2019", "v": "2019"},
                    {"n": "2018", "v": "2018"},
                    {"n": "2017", "v": "2017"},
                    {"n": "2016", "v": "2016"},
                    {"n": "更早", "v": "lt_year"}]
            },

            {
                "key": "by", "name": "排序", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "最近热映", "v": "rankhot"},
                    {"n": "最近上映", "v": "ranklatest"},
                    {"n": "最受好评", "v": "rankpoint"}]
            }],

        "3": [
            {
                "key": "class", "name": "剧情", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "脱口秀", "v": "脱口秀"},
                    {"n": "真人秀", "v": "真人秀"},
                    {"n": "搞笑", "v": "搞笑"},
                    {"n": "选秀", "v": "选秀"},
                    {"n": "八卦", "v": "八卦"},
                    {"n": "访谈", "v": "访谈"},
                    {"n": "情感", "v": "情感"},
                    {"n": "生活", "v": "生活"},
                    {"n": "晚会", "v": "晚会"},
                    {"n": "音乐", "v": "音乐"},
                    {"n": "职场", "v": "职场"},
                    {"n": "美食", "v": "美食"},
                    {"n": "时尚", "v": "时尚"},
                    {"n": "游戏", "v": "游戏"},
                    {"n": "少儿", "v": "少儿"},
                    {"n": "体育", "v": "体育"},
                    {"n": "纪实", "v": "纪实"},
                    {"n": "科教", "v": "科教"},
                    {"n": "曲艺", "v": "曲艺"},
                    {"n": "歌舞", "v": "歌舞"},
                    {"n": "财经", "v": "财经"},
                    {"n": "汽车", "v": "汽车"},
                    {"n": "播报", "v": "播报"},
                    {"n": "其他", "v": "其他"}]
            },

            {
                "key": "area", "name": "地区", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "内地", "v": "大陆"},
                    {"n": "中国香港", "v": "香港"},
                    {"n": "中国台湾", "v": "台湾"},
                    {"n": "日本", "v": "日本"},
                    {"n": "欧美", "v": "欧美"}]
            },

            {
                "key": "act", "name": "明星", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "邓超", "v": "邓超"},
                    {"n": "陈赫", "v": "陈赫"},
                    {"n": "何炅", "v": "何炅"},
                    {"n": "汪涵", "v": "汪涵"},
                    {"n": "王俊凯", "v": "王俊凯"},
                    {"n": "黄磊", "v": "黄磊"},
                    {"n": "谢娜", "v": "谢娜"},
                    {"n": "黄渤", "v": "黄渤"},
                    {"n": "周杰伦", "v": "周杰伦"},
                    {"n": "薛之谦", "v": "薛之谦"},
                    {"n": "Angelababy", "v": "Angelababy"},
                    {"n": "易烊千玺", "v": "易烊千玺"},
                    {"n": "岳云鹏", "v": "岳云鹏"},
                    {"n": "王嘉尔", "v": "王嘉尔"},
                    {"n": "鹿晗", "v": "鹿晗"},
                    {"n": "杨幂", "v": "杨幂"},
                    {"n": "沈腾", "v": "沈腾"},
                    {"n": "张艺兴", "v": "张艺兴"},
                    {"n": "潘玮柏", "v": "潘玮柏"},
                    {"n": "华晨宇", "v": "华晨宇"},
                    {"n": "李维嘉", "v": "李维嘉"},
                    {"n": "宋小宝", "v": "宋小宝"},
                    {"n": "贾玲", "v": "贾玲"},
                    {"n": "沙溢", "v": "沙溢"},
                    {"n": "撒贝宁", "v": "撒贝宁"},
                    {"n": "涂磊", "v": "涂磊"}]
            },

            {
                "key": "by", "name": "排序", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "最近热映", "v": "rankhot"},
                    {"n": "最近上映", "v": "ranklatest"}]
            }],

        "4": [
            {
                "key": "class", "name": "剧情", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "热血", "v": "热血"},
                    {"n": "科幻", "v": "科幻"},
                    {"n": "美少女", "v": "美少女"},
                    {"n": "魔幻", "v": "魔幻"},
                    {"n": "经典", "v": "经典"},
                    {"n": "励志", "v": "励志"},
                    {"n": "少儿", "v": "少儿"},
                    {"n": "冒险", "v": "冒险"},
                    {"n": "搞笑", "v": "搞笑"},
                    {"n": "推理", "v": "推理"},
                    {"n": "恋爱", "v": "恋爱"},
                    {"n": "治愈", "v": "治愈"},
                    {"n": "幻想", "v": "幻想"},
                    {"n": "校园", "v": "校园"},
                    {"n": "动物", "v": "动物"},
                    {"n": "机战", "v": "机战"},
                    {"n": "亲子", "v": "亲子"},
                    {"n": "儿歌", "v": "儿歌"},
                    {"n": "运动", "v": "运动"},
                    {"n": "悬疑", "v": "悬疑"},
                    {"n": "怪物", "v": "怪物"},
                    {"n": "战争", "v": "战争"},
                    {"n": "益智", "v": "益智"},
                    {"n": "青春", "v": "青春"},
                    {"n": "童话", "v": "童话"},
                    {"n": "竞技", "v": "竞技"},
                    {"n": "动作", "v": "动作"},
                    {"n": "社会", "v": "社会"},
                    {"n": "友情", "v": "友情"},
                    {"n": "真人版", "v": "真人版"},
                    {"n": "电影版", "v": "电影版"},
                    {"n": "OVA版", "v": "OVA版"}]
            },

            {
                "key": "area", "name": "地区", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "内地", "v": "大陆"},
                    {"n": "日本", "v": "日本"},
                    {"n": "美国", "v": "美国"}]
            },

            {
                "key": "year", "name": "年份", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "2026", "v": "2026"},
                    {"n": "2025", "v": "2025"},
                    {"n": "2024", "v": "2024"},
                    {"n": "2023", "v": "2023"},
                    {"n": "2022", "v": "2022"},
                    {"n": "2021", "v": "2021"},
                    {"n": "2020", "v": "2020"},
                    {"n": "2019", "v": "2019"},
                    {"n": "2018", "v": "2018"},
                    {"n": "2017", "v": "2017"},
                    {"n": "2016", "v": "2016"},
                    {"n": "更早", "v": "更早"}]
            },

            {
                "key": "by", "name": "排序", "value": [
                    {"n": "全部", "v": ""},
                    {"n": "最近热映", "v": "rankhot"},
                    {"n": "最近上映", "v": "ranklatest"}]
            }]
    },
    headers: {
        'User-Agent': 'MOBILE_UA'
    },
    timeout: 5000,
    class_name: '电视剧&电影&综艺&动漫',
    class_url: '2&1&3&4',
    limit: 5,
    multi: 1,
    searchable: 2,
    play_parse: true,
    lazy: '',
    // 疑似t4专用的
    // lazy:'js:input={parse: 1, playUrl: "", jx: 1, url: input.split("?")[0]}',
    // 手动调用解析请求json的url,此lazy不方便
    // lazy:'js:input="https://cache.json.icu/home/api?type=ys&uid=292796&key=fnoryABDEFJNPQV269&url="+input.split("?")[0];log(input);let html=JSON.parse(request(input));log(html);input=html.url||input',
    推荐: 'json:data;title;cover;comment;cat+ent_id;description',
    一级: 'json:data.movies;title;cover;pubdate;id;description',
    二级: '',
    // ... existing code ...
    二级: `js:
            // 内联函数定义
            function md5(string) {
                function md5_RotateLeft(lValue, iShiftBits) {
                    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
                }

                function md5_AddUnsigned(lX, lY) {
                    var lX4, lY4, lX8, lY8, lResult;
                    lX8 = (lX & 0x80000000);
                    lY8 = (lY & 0x80000000);
                    lX4 = (lX & 0x40000000);
                    lY4 = (lY & 0x40000000);
                    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                    if (lX4 & lY4) {
                        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                    }
                    if (lX4 | lY4) {
                        if (lResult & 0x40000000) {
                            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                        } else {
                            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                        }
                    } else {
                        return (lResult ^ lX8 ^ lY8);
                    }
                }

                function md5_F(x, y, z) { return (x & y) | ((~x) & z); }
                function md5_G(x, y, z) { return (x & z) | (y & (~z)); }
                function md5_H(x, y, z) { return (x ^ y ^ z); }
                function md5_I(x, y, z) { return (y ^ (x | (~z))); }

                function md5_FF(a, b, c, d, x, s, ac) {
                    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
                    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
                };

                function md5_GG(a, b, c, d, x, s, ac) {
                    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
                    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
                };

                function md5_HH(a, b, c, d, x, s, ac) {
                    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
                    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
                };

                function md5_II(a, b, c, d, x, s, ac) {
                    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
                    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
                };

                function md5_ConvertToWordArray(string) {
                    var lWordCount;
                    var lMessageLength = string.length;
                    var lNumberOfWords_temp1 = lMessageLength + 8;
                    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                    var lWordArray = Array(lNumberOfWords - 1);
                    var lBytePosition = 0;
                    var lByteCount = 0;
                    while (lByteCount < lMessageLength) {
                        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                        lBytePosition = (lByteCount % 4) * 8;
                        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                        lByteCount++;
                    }
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                    return lWordArray;
                };

                function md5_WordToHex(lValue) {
                    var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
                    for (lCount = 0; lCount <= 3; lCount++) {
                        lByte = (lValue >>> (lCount * 8)) & 255;
                        WordToHexValue_temp = "0" + lByte.toString(16);
                        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
                    }
                    return WordToHexValue;
                };

                function md5_Utf8Encode(string) {
                    string = string.replace(/\\r\\n/g, "\\n");
                    var utftext = "";

                    for (var n = 0; n < string.length; n++) {
                        var c = string.charCodeAt(n);

                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        }
                        else if ((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                    }

                    return utftext;
                };

                var x = Array();
                var k, AA, BB, CC, DD, a, b, c, d;
                var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
                var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
                var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
                var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

                string = md5_Utf8Encode(string);
                x = md5_ConvertToWordArray(string);
                a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

                for (k = 0; k < x.length; k += 16) {
                    AA = a; BB = b; CC = c; DD = d;
                    a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                    d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                    c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                    b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                    a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                    d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                    c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                    b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                    a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                    d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                    c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                    b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                    a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                    d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                    c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                    b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                    a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                    d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                    c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                    b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                    a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                    d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                    c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                    b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                    a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                    d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                    c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                    b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                    a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                    d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                    c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                    b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                    a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                    d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                    c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                    b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                    a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                    d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                    c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                    b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                    a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                    d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                    c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                    b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                    a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                    d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                    c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                    b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                    a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                    d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                    c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                    b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                    a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                    d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                    c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                    b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                    a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                    d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                    c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                    b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                    a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                    d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                    c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                    b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                    a = md5_AddUnsigned(a, AA);
                    b = md5_AddUnsigned(b, BB);
                    c = md5_AddUnsigned(c, CC);
                    d = md5_AddUnsigned(d, DD);
                }

                return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
            }

            // 生成时间相关的加密参数
            function getCurrentDateInfo() {
                let r = new Date();
                let o = r.getTime();
                let s = 6e4 * r.getTimezoneOffset();
                let a = new Date(o + s + 36e5 * 8);

                // 构建z参数 - 使用日期和md5加密
                let dayValue = a.getDate() + 9 + 9 ^ 10;
                let zValue = md5(String(dayValue));
                zValue = zValue.substring(0, 10);
                zValue = md5(zValue); // 再次加密

                // 构建s1ig参数
                let s1igValue = a.getDay() + 11397;

                // 构建g参数
                let gValue = Math.floor(Math.random() * 1000000).toString();

                return {
                    z: zValue,
                    s1ig: s1igValue,
                    g: gValue
                };
            }

            let html = JSON.parse(fetch(input, fetch_params));
            let data = html.data;
            let tilte = data.title;
            let img = data.cdncover;
            let year = data.pubdate;
            let vod_type = data.moviecategory.join(",");
            let area = data.area.join(",");
            let director = data.director.join(",");
            let actor = data.actor.join(",");
            let content = data.description;
            
            let base_vod = {
                vod_id: input,
                vod_name: tilte,
                type_name: vod_type,
                vod_actor: actor,
                vod_director: director,
                vod_content: content,
                vod_area: area,
                vod_pic: urljoin2(input, img)
            };
            
            // 获取自定义API的播放源
            try {
                let dateInfo = getCurrentDateInfo();
                let encodedTitle = encodeURIComponent(tilte);
                let searchUrl = "https://m1-a1.cloud.nnpp.vip:2223/api/v/?z=" + dateInfo.z + "&jx=" + encodedTitle + "&s1ig=" + dateInfo.s1ig + "&g=" + dateInfo.g;

                let customResponse = request(searchUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        'Cookie': 'aliyungf_tc=AQAAAFvyfRtP/AIATUWYDheCsQtZUPVB'
                    }
                });

                let customJson = JSON.parse(customResponse);
                let customPlayLists = {
                    "自定义源": []  // 直接初始化
                };
                 base_vod.vod_name ="111"
                if(customJson.data && Array.isArray(customJson.data)) {
                    for(let item of customJson.data) {
                        if(item.name.includes(tilte) || tilte.includes(item.name)) {
                            for(let ep of item.source.eps) {
                                customPlayLists["自定义源"].push(ep.name + "$" + ep.url);
                            }
                        }
                    }
                }

                // 获取360的播放源
                let delta = 200;
                let vod_play = {};

                

                // 合并360和自定义源的播放列表
                   if(customPlayLists["自定义源"] && customPlayLists["自定义源"].length > 0) {
                       base_vod.vod_name = "自定义源";
                       vod_play["自定义源"] = customPlayLists["自定义源"].join("#");
                   }
   

                let playUrls = [];
                let tabs = Object.keys(vod_play);

                tabs.forEach(function(site) {
                    playUrls.push(vod_play[site]);
                });

                if (tabs.length > 0) {
                    let vod_play_from = tabs.join("$$$");
                    let vod_play_url = playUrls.join("$$$");
                    base_vod.vod_play_from = vod_play_from;
                    base_vod.vod_play_url = vod_play_url;
                }
            } catch(e) {
                
            }

            VOD = base_vod;
            `,
    // ... existing code ...
    //二级: `js:let html=JSON.parse(fetch(input,fetch_params));let data=html.data;let tilte=data.title;let img=data.cdncover;let vod_type=data.moviecategory.join(",");let area=data.area.join(",");let director=data.director.join(",");let actor=data.actor.join(",");let content=data.description;let base_vod={vod_id:input,vod_name:tilte,type_name:vod_type,vod_actor:actor,vod_director:director,vod_content:content,vod_remarks:area,vod_pic:urljoin2(input,img)};let delta=200;let vod_play={};let sites=data.playlink_sites;sites.forEach(function(site){let playList="";let vodItems=[];if(data.allupinfo){let total=parseInt(data.allupinfo[site]);for(let j=1;j<total;j+=delta){let end=Math.min(total,j+delta-1);let url2=buildUrl(input,{start:j,end:end,site:site});let vod_data=JSON.parse(fetch(url2),fetch_params).data;if(vod_data.allepidetail){vod_data=vod_data.allepidetail[site];vod_data.forEach(function(item,index){vodItems.push((item.playlink_num||"")+"$"+urlDeal(item.url||""))})}else{vod_data=vod_data.defaultepisode;vod_data.forEach(function(item,index){vodItems.push((item.period||"")+(item.name||"")+"$"+urlDeal(item.url)||"")})}}}else{let item=data.playlinksdetail[site];vodItems.push((item.sort||"")+"$"+urlDeal(item.default_url||""))}if(vodItems.length>0){playList=vodItems.join("#")}if(playList.length<1){return}vod_play[site]=playList});let tabs=Object.keys(vod_play);let playUrls=[];for(let id in tabs){print("id:"+id);playUrls.push(vod_play[tabs[id]])}if(tabs.length>0){let vod_play_from=tabs.join("$$$");let vod_play_url=playUrls.join("$$$");base_vod.vod_play_from=vod_play_from;base_vod.vod_play_url=vod_play_url;try{let __dbg=[];tabs.forEach(function(t){let arr=(vod_play[t]||"").split("#");__dbg.push(t+": "+arr.slice(0,3).join(" | "))});print("DEBUG_EPISODES: "+__dbg.join(" || "))}catch(e){print("DEBUG_EPISODES_ERR:"+e.message)}}VOD=base_vod;`,
    搜索: 'json:data.longData.rows;titleTxt||titlealias;cover;cat_name;cat_id+en_id;description',
};
