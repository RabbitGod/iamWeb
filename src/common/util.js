
//公用方法
let util = {};
//根据某一个节点的过滤条件，获取其在一个及节点的路径。
const G =  window.g;
util.rootPath = G.rootPath || '';
util.getPathByKey = function (value, key, arr) {
    let temppath = [];
    try {
        function getNodePath(node){
            temppath.push(node);
            if (node[key] === value) {
                throw ("GOT IT!");
            }
            if (node.children && node.children.length > 0) {
                for (var i = 0; i < node.children.length; i++) {
                getNodePath(node.children[i]);
                }
                temppath.pop();
            }
            else {
                temppath.pop();
            }
        }
        for (let i = 0; i < arr.length; i++) {
            getNodePath(arr[i]);
        }
    } catch (e) {
    return temppath;
    }
};
 
// 判断参数是否是其中之一
util.oneOf = function (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
};

// 深度复制    

util.deepCopy = function (data) {
    const t = typeof(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if ( t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(util.deepCopydeepCopy(data[i]));
        }
    } else if ( t === 'object') {
        for (let i in data) {
            o[i] = util.deepCopydeepCopy(data[i]);
        }
    }
    return o;
}
// 生成随机字符串
util.random  = function (len = 32) {
    const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
}
// 首字母大写
util.firstUpperCase = function (str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1);
}
/**
 * 获取图片嗯滴url，在上传之前预览
 * @param file 选择的图片文件
 * @returns {*} url
 */
util.getFileLocationUrl = function (file) {
    var url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
/**
 * 得到今天、昨天、明天日期
 * @param {int} dates  0代表今日,-1代表昨日，1代表明日，
 * @returns {string}返回yyyy-mm-dd格式字符串
 */
util.getDate = function (dates) {
    var dd = new Date();
    var n = dates || 0;
    dd.setDate(dd.getDate() + n);

    return this.formatDateOrToday(dd);
}
/**
* 获取今日日期，或格式化日期为固定格式“yyyy-MM-dd”,
* @param {Date} date  指定的要格式化的日期，缺省时获取当前日期
* @returns {string}返回yyyy-mm-dd格式字符串
*/
util.formatDateOrToday = function (date) {
var dd = date || new Date();
var y = dd.getFullYear();
var m = dd.getMonth() + 1;
var d = dd.getDate();
m = m < 10 ? "0" + m : m;
d = d < 10 ? "0" + d : d;
var day = y + "-" + m + "-" + d;
return day;

}
util.getRawType = function(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
}

//数组去重合并，返回一个数组
util.unique = function(a, b) {
    let arr = a.concat(b);
    return arr.filter((item, index)=> {
        return arr.indexOf(item) === index
    })
}
console.log(util.unique([1,2],[2,3]))
//base64数据导出文件，文件下载
util.downloadFile = function(filename, data) {
	let DownloadLink = document.createElement('a');
	if (DownloadLink) {
		document.body.appendChild(DownloadLink);
		DownloadLink.style = 'display: none';
		DownloadLink.download = filename;
		DownloadLink.href = data;
		if (document.createEvent) {
			let DownloadEvt = document.createEvent('MouseEvents');
			DownloadEvt.initEvent('click', true, false);
			DownloadLink.dispatchEvent(DownloadEvt);
		} else if (document.createEventObject) {
			DownloadLink.fireEvent('onclick');
		} else if (typeof DownloadLink.onclick == 'function') {
			DownloadLink.onclick();
		}
		document.body.removeChild(DownloadLink);
	}
}
//检查数据是否是非数字值
util._isNaN = function(v){
    return !(typeof v === 'string' || typeof v === 'number') || isNaN(v)
}
export default util;