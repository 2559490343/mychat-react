// 取出本地存储
export const getStorage = (key) => {
    key = key ? key : 'default';
    return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : {}
};

// 存入本地存储
export const saveStorage = (key, data) => {
    key = key ? key : 'default';
    return sessionStorage.setItem(key, JSON.stringify(data));
};
//移除本地存储
export const removeStorage = (key) => {
    key = key ? key : 'default';
    return sessionStorage.removeItem(key);
};

// 深复制
export const deepCopy = (data) => {
    return JSON.parse(JSON.stringify(data));
};


// 日期格式化
export const dateFormat = (fmt, date) => {
    date = new Date(date);
    let o = {
        "M+": date.getMonth() + 1,                 //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

export default {
    getStorage,
    saveStorage,
    removeStorage,
    deepCopy,
    dateFormat
}