/*var swfUrl ="http://y0.ifengimg.com/swf/ifengZhPlayer_v1.0.36.swf";*/
/*var swfUrl ="http://vxml.ifengimg.com/swf/zuhe/zuhePlayer_v1.0.41.swf";*/
var swfUrl = "http://vxml.ifengimg.com/swf/zuhe/zuhePlayer_v1.0.47.swf";
/*http://y0.ifengimg.com/swf/ifengZhPlayer_v1.0.28.swf||http://img.ifeng.com/swf/zuheVplayer_v5.0.22.swf||http://img.ifeng.com/swf/zuheVplayer_v5.0.21.swf|http://img.ifeng.com/swf/zuheVplayer_v5.0.20.swf|http://img.ifeng.com/swf/zuheVplayer_v5.0.18.swf|http://img.ifeng.com/swf/zuheVplayer_v5.0.17.swf|http://img.ifeng.com/swf/zuheVplayer_v5.0.10.swf|http://img.ifeng.com/swf/zuheVplayer_v5.0.9.swf|http://img.ifeng.com/swf/zuheVplayer_v5.0.27.swf|http://v.ifeng.com/swf/huanghe/zuhelong/p2pVideo_t3.swf||http://img.ifeng.com/swf/p2p/zuhe/online/zuheVPplayer_v1.0.6.swf*/
function PlayItems(parentids) {
    this.OldPlayIndex = 0; // 从第几条开始播
    var items = []; // 所有条目
    var ItemCount = GetItemCout(); // 总视频数
    this.domain = "v"; // 引用频道域名，ent,news,phtv,finance
    this.ShowDivId = "playerDiv"; // flash播放器显示模块id
    this.swfWidth = '400'; // flash播放器宽
    this.swfHeight = '300'; // flash播放器高

    this.adUrl = ""; // 定向广告地址
    this.preAdurl = ""; // 定向前贴片广告地址
    this.AutoPlay = 'true'; // 视频自动播放---只有设置为自动播放，this.FirstAutoPlay第一条才能设定是否自动播放
    this.FirstAutoPlay = 'true'; // 第一条是否自动播放
    this.ClickPlay = 'false'; // 是否为点击播放
    this.ADPlay = 'true'; // 广告自动播放
    this.playitemcss = "";

    this.noRelatedPage = "";
    //this.canShare = "";

    this.postUrl = ""; //海报
    this.adType = ""; // 默认为2 (专题播放，只有前贴片)，当有preAdurl有效时，会强制转换为0，即自定义广告配置.   =1时，表示内页

    this.ivbAdUrl = ""; //adType=0时  有效
    this.postAdUrl = ""; //adType=0时  有效 
    this.pauseUrl = ""; //adType=0时  有效 
    this.cornerAdUrl = ""; //adType=0时  有效
    this.canShare = "true";
    this.ADOrderFirst = ""; //是否页面打开就播放广告
    this.subject = "";

    //缓存当前播放视频guid
    this.curGuid = '';
    //为统计记录的guid
    this.remGuid = '';

    // 获得播放条目数
    function GetItemCout() {
        var pid = parentids.split(",");

        for (var a = 0; a < pid.length; a++) // 计算节点数
        {
            var item = document.getElementById(pid[a]).getElementsByTagName("li");

            for (var i = 0; i < item.length; i++)
                items.push(item[i]);
        }

        var count = items.length;
        for (var i = 0; i < count; i++) { // 为所有item添加点击事件
            items[i].onclick = function() {
                for (var j = 0; j < count; j++)
                    if (this == items[j])
                        clickplay(j);
            };
        }

        return count;
    }
    // 播放
    this.ChangeStream = function(videoid, playindex, sClickPlay) {
        var sCp = sClickPlay;
        if (this.ClickPlay == sCp) {
            sCp = this.ClickPlay
        }
        this.curGuid = videoid;
        if (navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("iPhone") != -1 || navigator.userAgent.indexOf("Android") != -1) // ipad,iphone,android
        {
            var url = "http://dyn.v.ifeng.com/cmpp/video_msg_ipad.js?msg=" + videoid + "&callback=showhtml5video&param=playermsg";
            getScript_cds(url, showhtml5video);
        } else {
            fo = new FlashWriter({
                url: swfUrl,
                width: this.swfWidth,
                height: this.swfHeight,
                id: 'fplay'
            });
            fo.addVariable('guid', videoid);
            // fo.addVariable('from',this.domain);
            fo.addVariable('from', ph_get_ad_chl());
            if (sCp == 'true') // 点击播放
            {
                if (this.AutoPlay == 'true') // 点击播放自动播状态
                {
                    fo.addVariable("AutoPlay", "true");
                    fo.addVariable('forPlayNum', (parseInt(this.OldPlayIndex) + 1)); // 下次播放第几条,
                } else
                // 点击播放非自动播状态
                    fo.addVariable("AutoPlay", "true");
            } else
            // 自动播放
            {
                if (this.AutoPlay == 'true') // 是否自动播
                {
                    if (playindex == 0 && this.FirstAutoPlay == "false") // 第一条是否自动播放，除第一条外全自动播
                        fo.addVariable("AutoPlay", "false");
                    else {
                        fo.addVariable("AutoPlay", "true");

                    }
                    fo.addVariable('forPlayNum', (parseInt(this.OldPlayIndex) + 1)); // 下次播放第几条,
                } else
                    fo.addVariable("AutoPlay", "false");
            }

            if (this.adUrl != "")
                fo.addVariable('ADURL', this.adUrl); // 广告定向投放用。如果没有定向广告，请用符号 //
            // 注销此项。
            if (this.preAdurl != "") {
                fo.addVariable('preAdurl', this.preAdurl); // 前贴片广告定投地址
                fo.addVariable('adType', '0');
            } else {
                fo.addVariable('adType', '2');
            }


            if (this.noRelatedPage != "")
                fo.addVariable('noRelatedPage', this.noRelatedPage); //

            if (this.canShare != "")
                fo.addVariable('canShare', this.canShare); // 
            if (this.ADOrderFirst != "")
                fo.addVariable('ADOrderFirst', this.ADOrderFirst);
            if (this.subject != "")
                fo.addVariable('subject', this.subject);

            fo.addVariable('writeby', 'webjs'); //为了兼容以前的专题联播页面。如果source=webjs，表示是js渲染播放器，此时分享功能直接调用脚本方法；否则调用swf自身的分享方法
            fo.addVariable('width', p.swfWidth);
            fo.addVariable('height', p.swfHeight);
            fo.addVariable('ADPlay', this.ADPlay);
            fo.addVariable('postUrl', this.postUrl); // 自定义海报                
            fo.addVariable('ivbAdUrl', this.ivbAdUrl);
            fo.addVariable('postAdUrl', this.postAdUrl);
            fo.addVariable('pauseUrl', this.pauseUrl);
            fo.addVariable('cornerAdUrl', this.cornerAdUrl);
            fo.addVariable('ADOrderFirst', this.ADOrderFirst);
            //fo.addVariable('ADOrderFirst',this.ADOrderFirst);//重置参数
            //fo.addVariable('subject',this.subject);//专题名
            // fo.addVariable('canShare',this.canShare);//zjt 控制是否显示分享按钮

            fo.addVariable("clickPlay", 'true');
            fo.addVariable("special", 'true'); // 表示专题引用
            fo.addVariable('PlayerName', "VZHPlayer");
            fo.addParam('allowFullScreen', 'true');
            fo.addParam("wmode", "transparent");
            fo.addParam('allowScriptAccess', 'always');

            fo.write(this.ShowDivId);
        }
    },

    // 播放条目轮换
    this.RenderPlay = function(swfindex) {
        if (items.length > 0) {
            var playindex = parseInt(swfindex) % ItemCount;
            var curritem = items[playindex];
            var olditem = items[this.OldPlayIndex];
            olditem.className = "";
            curritem.className = this.playitemcss;
            this.OldPlayIndex = playindex;
            this.ChangeStream(curritem.getAttribute("name"), playindex, this.ClickPlay); // JQ(curritem).attr("name")
        }
    },
    this.RenderPlayById = function(id) {
        var count = items.length;
        for (var i = 0; i < count; i++) { // 为所有item添加点击事件
            if (curritem.getAttribute("name") == id)
                this.RenderPlay(i);
        }
    },
    //新加内容
    this.SendHTML5VideoInfo = function() {
        var sendRequest = function(params) {
            if (typeof params !== 'undefined') {
                // 合并对象。
                var _merge = function(s, t) {
                    var result = {};

                    if (!t) {
                        return result;
                    }

                    for (var i in s) {
                        result[i] = typeof t[i] !== "undefined" ? t[i] : s[i];
                    }

                    return result;
                };

                var url = 'http://stadig.ifeng.com/media.js';
                var data = _merge({
                    id: '',
                    sid: '',
                    uid: '',
                    from: 'HTML5',
                    provider: 'd5f1032b-fe8b-4fbf-ab6b-601caa9480eb',
                    loc: '', //空
                    cat: '',
                    se: '',
                    ptype: '',
                    vid: 'HTML5Player',
                    ref: '', //域名
                    tm: '' //时间戳
                }, params);

                pArr = [];
                for (var i in data) {
                    pArr.push(i + '=' + encodeURIComponent(data[i]));
                }
                var scriptDom = document.createElement('script');
                url = (pArr.length > 0) ? url + '?' + pArr.join('&') : url;
                scriptDom.src = url;
                document.getElementsByTagName("head").item(0).appendChild(scriptDom);
            }
        };

        var getCookie = function(name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg) {
                    return (function(offset) {
                        var endstr = document.cookie.indexOf(";", offset);
                        if (endstr == -1) {
                            endstr = document.cookie.length;
                        }
                        return decodeURIComponent(document.cookie.substring(offset, endstr));
                    })(j);
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) break;
            }
            return "";
        };
        if (this.curGuid !== this.remGuid) {
            this.remGuid = this.curGuid;
            var params = {};
            params.id = playermsg.videoid;
            params.sid = getCookie('sid');
            params.uid = getCookie('userid');
            var cid = playermsg.categoryId ? playermsg.categoryId : '';
            var cname = playermsg.columnName;
            params.cat = cid
            params.se = typeof cname !== 'undefined' ? cname : cid;
            params.ptype = cid.substr(0, 4);
            params.ref = window.location.href.replace(/#/g, '$');
            params.tm = new Date().getTime();
            sendRequest(params);
        }
    };
}

function showhtml5video(playermsg) {
    if (typeof(playermsg) != "undefined") {
        var nextvideo = parseInt(p.OldPlayIndex) + 1;
        var strvideo = '';
        if (p.AutoPlay == 'true') // 是否自动播
            strvideo = '<video  poster = "' + p.postUrl + '" src="' + playermsg.videoplayurl + '" width="' + p.swfWidth + '" height="' + p.swfHeight + '" controls  id="player" onplay="p.SendHTML5VideoInfo();" onended="p.RenderPlay(' + nextvideo + ');"/>';
        else
            strvideo = '<video  poster = "' + p.postUrl + '" src="' + playermsg.videoplayurl + '" width="' + p.swfWidth + '" height="' + p.swfHeight + '" onplay="p.SendHTML5VideoInfo();" controls  id="player" onended="p.RenderPlay(' + nextvideo + ');"/>';
        document.getElementById(p.ShowDivId).innerHTML = strvideo;
        if (p.AutoPlay == 'true' || p.ClickPlay == 'true') // 是否自动播
        {
            document.getElementById('player').load();
            document.getElementById('player').play();
        }
    }
}

function clickplay(swfindex) {
    p.ClickPlay = 'true'; // 视频自动播放
    p.ADOrderFirst = "0";
    p.RenderPlay(swfindex);
}
// swf调用的js
function swfplay(swfindex) {
    p.ADOrderFirst = '0';
    p.RenderPlay(swfindex);
}

function getScript_cds(src, callback) {
    var head = document.getElementsByTagName("head")[0];
    var js = document.createElement("script");
    js.setAttribute("src", src);
    js.onload = js.onreadystatechange = function() {
        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
            head.removeChild(js);
            if (callback)
                callback();
        }
    }
    head.appendChild(js);
}

function ph_get_ad_chl() {
    var _domain = location.host;
    var _domain_array = _domain.split('.');
    if (_domain_array.length >= 3 && _domain.indexOf("ifeng.com") != -1)
        _domain = _domain_array[_domain_array.length - 3];
    return _domain;
}

function Play() {
    this.OldPlayIndex = 0; // 从第几条开始播
    this.domain = "v"; // 引用频道域名，ent,news,phtv,finance
    this.ShowDivId = "playerDiv"; // flash播放器显示模块id
    this.swfWidth = '400'; // flash播放器宽
    this.swfHeight = '300'; // flash播放器高

    this.adUrl = ""; // 定向广告地址
    this.preAdurl = ""; // 定向前贴片广告地址
    this.AutoPlay = 'true'; // 视频自动播放---只有设置为自动播放，this.FirstAutoPlay第一条才能设定是否自动播放
    this.FirstAutoPlay = 'true'; // 第一条是否自动播放
    this.ClickPlay = 'false'; // 是否为点击播放
    this.ADPlay = 'true'; // 广告自动播放
    this.ivbAdUrl = ""; //adType=0时  有效
    this.postAdUrl = ""; //adType=0时  有效 
    this.pauseUrl = ""; //adType=0时  有效 
    this.cornerAdUrl = ""; //adType=0时  有效
    this.canShare = "true";
    this.ADOrderFirst = ""; //是否页面打开就播放广告
    this.subject = "";

    this.noRelatedPage = "";

    this.PlayID = function(videoid) {
        if (navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("iPhone") != -1 || navigator.userAgent.indexOf("Android") != -1) // ipad,iphone,android
        {
            var url = "http://partner.itv.ifeng.com/IfengVideoSearch/getplayermsg.aspx?msg=" + videoid;
            getScript_cds(url, showhtml5video);
        } else {
            fo = new FlashWriter({
                url: swfUrl,
                width: this.swfWidth,
                height: this.swfHeight,
                id: 'fplay'
            });
            fo.addVariable('guid', videoid);
            // fo.addVariable('from',this.domain);
            fo.addVariable('from', ph_get_ad_chl());
            if (this.ClickPlay == 'true') // 点击播放
            {
                if (this.AutoPlay == 'true') // 点击播放自动播状态
                {
                    fo.addVariable("AutoPlay", "true");
                    fo.addVariable('forPlayNum', 0); // 下次播放第几条,
                } else
                // 点击播放非自动播状态
                    fo.addVariable("AutoPlay", "true");
            } else
            // 自动播放
            {
                if (this.AutoPlay == 'true') // 是否自动播
                {
                    fo.addVariable("AutoPlay", "true");
                    fo.addVariable('forPlayNum', (parseInt(this.OldPlayIndex) + 1)); // 下次播放第几条,
                } else
                    fo.addVariable("AutoPlay", "false");
            }

            if (this.adUrl != "")
                fo.addVariable('ADURL', this.adUrl); // 广告定向投放用。如果没有定向广告，请用符号 //
            // 注销此项。
            if (this.preAdurl != "") {
                fo.addVariable('preAdurl', this.preAdurl); // 前贴片广告定投地址
                fo.addVariable('adType', '0');
            } else {
                fo.addVariable('adType', '2');
            }

            if (this.noRelatedPage != "")
                fo.addVariable('noRelatedPage', this.noRelatedPage); //

            if (this.canShare != "")
                fo.addVariable('canShare', this.canShare); // 

            if (this.ADOrderFirst != "")
                fo.addVariable('ADOrderFirst', this.ADOrderFirst);
            if (this.subject != "")
                fo.addVariable('subject', this.subject);

            fo.addVariable('writeby', 'webjs'); //为了兼容以前的专题联播页面。如果source=webjs，表示是js渲染播放器，此时分享功能直接调用脚本方法；否则调用swf自身的分享方法
            fo.addVariable('width', p.swfWidth);
            fo.addVariable('height', p.swfHeight);
            fo.addVariable('ADPlay', this.ADPlay);
            fo.addVariable('postUrl', this.postUrl); // 自定义海报
            fo.addVariable("clickPlay", 'true');
            fo.addVariable('ivbAdUrl', this.ivbAdUrl);
            fo.addVariable('postAdUrl', this.postAdUrl);
            fo.addVariable('pauseUrl', this.pauseUrl);
            fo.addVariable('cornerAdUrl', this.cornerAdUrl);
            fo.addVariable('ADOrderFirst', p.ADOrderFirst);
            //fo.addVariable('canShare',this.canShare);//zjt 控制是否显示分享按钮

            fo.addVariable("special", 'true'); // 表示专题引用
            fo.addVariable('PlayerName', "VZHPlayer");
            fo.addParam('allowFullScreen', 'true');
            fo.addParam("wmode", "transparent");
            fo.addParam('allowScriptAccess', 'always');
            fo.write(this.ShowDivId);
        }
    }
}


//分享统计begin  add by wangjie

//元素事件调用开始
var domShareEvent = function(dom) {
    var shareType = {
        "sinateew": "sina",
        "qqzone": "qqZone",
        "qqteew": "qq"
    };
    var objectType = Object.prototype.toString.call(dom).replace(/\[|\]/g, "").split(" ")[1];
    var type = "";
    if (objectType === "String") {
        type = "v_" + (shareType[dom] || dom);
    } else {
        type = shareType[F.attr(dom, 'data-tag') + ""] || F.attr(dom, 'data-tag');
    }
    sendStatisticInfoC(type);
}

//链接参数操作
var opeOfUrl = function(type, url, name, val) {
    var rst = null;

    if (typeof url !== 'undefined') {
        //hash起始索引
        var hIndex = url.indexOf('#'),
            //param起始索引
            pIndex = url.indexOf('?');
        //hash操作
        if (type === 'hash') {

            if (hIndex === -1) {
                hIndex = url.length;
            }
            var hashStr = url.substr(hIndex),
                preStr = url.substring(0, hIndex);
            //获取操作
            if (typeof val === 'undefined') {
                rst = opeOfHash(hashStr, name);
                //设置一个操作
            } else {
                rst = preStr + opeOfHash(hashStr, name, val);
            }
            //参数操作
        } else if (type === 'param') {
            var paramStr, hashStr, uri;
            //没有参数也，没有hash
            if (pIndex === -1 && hIndex === -1) {
                paramStr = '';
                hashStr = '';
                uri = url;
                //只有参数，没有hash
            } else if (pIndex > -1 && hIndex === -1) {
                paramStr = url.substr(pIndex);
                hashStr = '';
                uri = url.substr(0, pIndex);
                //只有hash，没有参数
            } else if (pIndex === -1 && hIndex > -1) {
                paramStr = '';
                hashStr = url.substr(hIndex);
                uri = url.substr(0, hIndex);
                //hash和参数都有
            } else {
                //?在#之后
                if (pIndex > hIndex) {
                    paramStr = '';
                    hashStr = url.substr(hIndex);
                    uri = url.substr(0, hIndex);
                    //?在#之前
                } else {
                    paramStr = url.substring(pIndex, hIndex);
                    hashStr = url.substr(hIndex);
                    uri = url.substr(0, pIndex);
                }
            }
            //获取操作
            if (typeof val === 'undefined') {
                rst = opeOfParam(paramStr, name);
                //设置一个操作
            } else {
                rst = uri + opeOfParam(paramStr, name, val) + hashStr;
            }
        }
    }

    return rst;
};

//发送分享统计信息
var sendStatisticInfoC = function(type) {
    var statistic = {};
    statistic.datatype = 'share';
    statistic.value = type;

    var doms = document.getElementsByTagName("script");
    statistic.ref = '';

    for (var i = 0; i < doms.length; i++) {
        var dom = doms[i];
        if (dom.src.indexOf('http://stadig.ifeng.com/page.js') > -1) {
            var ref = opeOfUrl('param', dom.src, 'ref');
            statistic.ref = (ref !== null) ? ref : '';
            var uid = opeOfUrl('param', dom.src, 'uid');
            statistic.uid = (uid !== null) ? uid : '';
            var sid = opeOfUrl('param', dom.src, 'sid');
            statistic.sid = (uid !== null) ? sid : '';
        }
    };

    var uri = window.location.href,
        hash = window.location.hash;

    if (opeOfUrl('param', uri, '_share') !== null) {
        statistic.uri = opeOfUrl('param', uri, '_share', type);

    } else {
        //没有hash
        if (hash === '') {
            statistic.uri = uri + '#_share=' + type;
            //已经存在哈希
        } else {
            //如果hash中已经存在_share参数，则在hash中添加
            if (opeOfUrl('hash', uri, '_share') !== null) {
                statistic.uri = opeOfUrl('hash', uri, '_share', type);
                //如果hash中不存在_share参数，则在param中添加
            } else {
                statistic.uri = opeOfUrl('param', uri, '_share', type);
            }
        }
    }


    statistic.time = new Date().getTime();
    //频道信息
    if (typeof getChannelInfo !== 'undefined') {
        statistic.ci = getChannelInfo();
    }

    if (typeof getStaPara === 'function') {
        statistic.pt = getStaPara();
    }

    sendStatisticInfoM(statistic);
    return statistic;
};

//字符串参数操作
var opeOfStr = function(str, name, val) {
    var rst = null;

    if (typeof str !== 'undefined') {
        var pStrArr = str.split('&');

        if (str === '' && typeof val !== 'undefined') {
            rst = name + '=' + val;

        } else {
            for (var i = 0; i < pStrArr.length; i++) {
                var pStr = pStrArr[i];
                var index = i;
                var pArr = pStr.split('=');
                if (pArr[0] === name) {
                    //获取指定参数值
                    if (typeof val === 'undefined') {
                        rst = pArr[1];
                        //设置参数
                    } else {
                        pStrArr[index] = name + '=' + val;
                        rst = pStrArr.join('&');
                    }

                    return false;

                } else if (index === pStrArr.length - 1 && typeof val !== 'undefined') {
                    rst = str + '&' + name + '=' + val;
                }
            };
        }
    }


    return rst;
};

//hash参数操作
var opeOfHash = function(hash, name, val) {
    var rst = null;

    if (typeof hash !== 'undefined') {

        if (hash.indexOf('#') === 0) {
            hash = hash.substr(1);
        }
        var hashStrArr = hash.split('#');
        for (var i = 0; i < hashStrArr.length; i++) {
            var hashStr = hashStrArr[i];
            var index = i;
            var result = opeOfStr(hashStr, name);
            //获取操作
            if (typeof val === 'undefined') {

                if (result !== null) {
                    rst = result;
                    return false;
                }
                //设置操作
            } else {
                //存在指定参数
                if (result !== null) {
                    hashStrArr[index] = opeOfStr(hashStr, name, val);
                    rst = '#' + hashStrArr.join('#');

                    return false;
                    //不存在指定参数
                } else if (result === null && index === hashStrArr.length - 1) {

                    if (hash === '') {
                        rst = '#' + name + '=' + val;

                    } else {
                        rst = '#' + hash + '&' + name + '=' + val;
                    }

                    return false;
                }
            }
        };
    }

    return rst;
};

//hash参数操作
var opeOfParam = function(paramStr, name, val) {
    var rst = null;

    if (typeof paramStr !== 'undefined') {

        if (paramStr.indexOf('?') === 0) {
            paramStr = paramStr.substr(1);
        }
        //获取操作
        if (typeof val === 'undefined') {
            rst = opeOfStr(paramStr, name);
            //设置操作
        } else {
            rst = '?' + opeOfStr(paramStr, name, val);
        }
    }

    return rst;
};


//发送统计信息
var sendStatisticInfoM = function(param) {
    var statisticUrl = "http://stadig.ifeng.com/actsta.js";
    var url = statisticUrl;
    var jQueryM = null;
    if (typeof jQuery !== "undefined") {
        jQueryM = jQuery;
    } else if (typeof F !== "undefined") {
        jQueryM = F;
    } else {
        return;
    }
    if (jQueryM.ajax) {
        jQueryM.ajax({
            url: url,
            data: param,
            cache: true,
            dataType: 'script'
        });
    }
};
//分享统计end


/*2011-04-15 bshare begin*/
function shareTo(site, pic, url, title, smallimg) {
    var vlink = url; //'http://v.ifeng.com/news/world/201101/57b5bddb-36b4-4178-90d3-0f96bad889af.shtml';
    var _url = encodeURIComponent(vlink);
    var vtitle = title;
    var _title = encodeURIComponent(vtitle);
    var _content = "";
    var _tp = new Date().getTime();
    /*if (eval("_oFlv_c.Content != null")) {
        _content = encodeURIComponent(_oFlv_c.Content);
    }*/

    domShareEvent(site); //发送统计接口信息 add by wangjie
    var shareType = {
        "sinateew": "sina",
        "qqzone": "qqZone",
        "qqteew": "qq"
    };
    var objectType = Object.prototype.toString.call(site).replace(/\[|\]/g, "").split(" ")[1];
    if (objectType === "String") {
        type = "v_" + (shareType[site] || site);
    } else {
        type = shareType[F.attr(site, 'data-tag') + ""] || F.attr(site, 'data-tag');
    }

    switch (site) {
        case "ifengkuaibo":
            break;
        case "ifengteew":
            var t = title,
                z = url,
                id = "凤凰视频",
                type = 1,
                p;
            var s = screen,
                d = document,
                e = encodeURIComponent;
            var f = "http://t.ifeng.com/interface.php?_c=share&_a=share&",
                u = z || d.location,
                pa = ["sourceUrl=", e(u + "#share=" + type), "&title=", e(t || d.title), "&pic=", e(p || ""), "&source=", e(id || ""), "&type=", e(type || 0)].join("");

            function a() {
                if (!window.open([f, pa].join(""), "", ["toolbar=0,status=0,resizable=1,width=640,height=481,left=", (s.width - 640) / 2, ",top=", (s.height - 480) / 2].join(""))) {
                    u.href = [f, pa].join("");
                }
            }

            if (/Firefox/.test(navigator.userAgent)) {
                setTimeout(a, 0);
            } else {
                a();
            }
            break;
        case "kaixin":
            window.open("http://www.kaixin001.com/repaste/share.php?rurl=" + _url + encodeURIComponent("#_share=" + type) + "&rtitle=" + _title);
            break;
        case "renren":
            window.open("http://share.renren.com/share/buttonshare.do?link=" + _url + encodeURIComponent("#_share=" + type) + "&title=" + _title);
            break;
        case "sinateew":
            var l = (screen.width - 440) / 2;
            var t = (screen.height - 430) / 2;
            var smallimg = "";
            //ifeng.util.getScript('http://api.t.sina.com.cn/friendships/create/1806128454.xml?source=168486312');
            /* nina_20110916*/
            window.open("http://v.t.sina.com.cn/share/share.php?appkey=168486312&url=" + _url + encodeURIComponent("?tp=" + _tp + "#_share=" + type) + "&title=" + _title + "&source=ifeng&sourceUrl=http://v.ifeng.com/&content=utf8&pic=" + smallimg + "&ralateUid=1806128454", "_blank", "toolbar=0,status=0,resizable=1,width=440,height=430,left=" + l + ",top=" + t);
            break;
        case "qqzone":
            window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + _url + encodeURIComponent("?tp=" + _tp + "#_share=" + type));
            break;
        case "qqteew":
            var _appkey = encodeURI("f8ca1cd768da4529ab190fae9f1bf21d"),
                _pic = encodeURI(""),
                _site = "http://v.ifeng.com";
            var _u = "http://v.t.qq.com/share/share.php?title=" + _title + "&url=" + _url + encodeURIComponent("?tp=" + _tp + "#_share=" + type) + "&appkey=" + _appkey + "&site=" + _site + "&pic=" + _pic;
            window.open(_u, "\u8F6C\u64AD\u5230\u817E\u8BAF\u5FAE\u535A", "width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no");
            break;
        case "163":
            var url = "link=http://www.ifeng.com&source=" + encodeURIComponent("凤凰网") + "&info=" + _title + " " + _url + encodeURIComponent("#_share=" + type);
            window.open("http://t.163.com/article/user/checkLogin.do?" + url + "&" + new Date().getTime(), "newwindow", "height=330,width=550,top=" + (screen.height - 280) / 2 + ",left=" + (screen.width - 550) / 2 + ", toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no");
            break;
        case "feixin":
            var u = "http://space.fetion.com.cn/api/share?Source=" + encodeURIComponent("凤凰视频") + "&Title=" + _title + "&url=" + _url + encodeURIComponent("#_share=" + type) + "&IsEditTitle=false";
            window.open(u, "newwindow", "top=" + (screen.height - 280) / 2 + ",left=" + (screen.width - 550) / 2 + ", toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no");
            break;
        case "sohuteew":
            var d = document;
            var s = screen;
            var e = encodeURIComponent;
            z = url;
            t = title;
            var f = "http://t.sohu.com/third/post.jsp?",
                u = z || d.location,
                p = ["&url=", e(u + "#_share=" + type), "&title=", e(t || d.title), "&content=utf-8", "&pic=", e(p || "")].join("");

            function b() {
                if (!window.open([f, p].join(""), "mb", ["toolbar=0,status=0,resizable=1,width=660,height=470,left=", (s.width - 660) / 2, ",top=", (s.height - 470) / 2].join(""))) {
                    u.href = [f, p].join("");
                }
            }

            if (/Firefox/.test(navigator.userAgent)) {
                setTimeout(b, 0);
            } else {
                b();
            }
            break;

        case "51com":
            /* nina_20110915*/
            var u = "http://share.51.com/share/out_share_video.php?from=" + encodeURIComponent("凤凰视频") + "&title=" + _title + "&vaddr=" + _url + encodeURIComponent("#_share=" + type) + "&IsEditTitle=false&charset=utf-8";
            window.open(u, "newwindow", "top=" + (screen.height - 280) / 2 + ",left=" + (screen.width - 550) / 2 + ", toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no");
            break;
        case "baiduI":
            var d = document,
                e = encodeURIComponent,
                u = 'http://tieba.baidu.com/i/app/open_share_api?link=' + e(d.location.href + "#_share=" + type),
                o = function() {
                    if (!window.open(u)) location.href = u
                };
            if (/Firefox/.test(navigator.userAgent)) {
                setTimeout(o, 0)
            } else {
                o()
            };
            return false;
            break;
        default:
            return false;
    }

}

function shareToTweet(t, z, id, p, type, s, d, e) {
    if (undefined == s) {
        s = screen;
    }
    if (undefined == d) {
        d = document;
    }
    if (undefined == e) {
        e = encodeURIComponent;
    }
    var f = "http://t.ifeng.com/interface.php?_c=share&_a=share&",
        u = z || d.location,
        pa = ["sourceUrl=", e(u), "&title=", e(t || d.title), "&pic=", e(p || ""), "&source=", e(id || ""), "&type=", e(type || 0)].join("");

    function a() {
        if (!window.open([f, pa].join(""), "", ["toolbar=0,status=0,resizable=1,width=640,height=481,left=", (s.width - 640) / 2, ",top=", (s.height - 480) / 2].join(""))) {
            u.href = [f, pa].join("");
        }
    }

    if (/Firefox/.test(navigator.userAgent)) {
        setTimeout(a, 0);
    } else {
        a();
    }
}