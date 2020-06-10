import axios from 'axios'
import qs from 'qs'
var loadingInstance;// 显示loading
var reqCount = 0;//请求数

axios.interceptors.request.use(function (config) {
    reqCount++;

    let token = sessionStorage.getItem('token');
    if (token && typeof token !== 'undefined') {
        config.headers.token = token;
    }
    config.headers.timeStamp = new Date().getTime()
    return config;
}, function (err) {
    return Promise.reject(err);
})

// 添加响应拦截器(对接口响应返回数据做点什么)----------------------------------------------------------------
axios.interceptors.response.use(function (res) {
    reqCount--;
    if (reqCount <= 0) {
    }

    if (res.headers.token && typeof res.headers.token !== 'undefined') {
        sessionStorage.setItem('token', res.headers.token);
    }
    // 生成文件
    // if (res.headers['content-type'].indexOf('application/octet-stream') == -1 && !res.data.error) {
    //     let reader = new FileReader();
    //     reader.readAsText(res.data);
    //     return new Promise((resolve) => {
    //         reader.onload = function () {
    //             let result = JSON.parse(reader.result);
    //             resolve(result);
    //         };
    //     });
    // }
    return res.data
}, function (err) {
    reqCount--;
    if (reqCount <= 0) {
    }
    return Promise.reject(err);
})

//需要重新登录--------------------------------------------------------------------------------------
function goLogin() {
    sessionStorage.clear();
}
// 封装axios--------------------------------------------------------------------------------------
/**
 * @params method  String POST
 * @params url     String 地址
 * @params params  String 传参
 * @params Deal    String 是否需要进行状态码判断操作，为了处理不需要登录的页面调用了需要登录才能使用的接口返回的状态码
 * */
function req(method, url, params) {
    params = params || {};
    //处理pageNo参数
    if (params.pageNo && params.pageNo > 0) {
        params.pageNo -= 1;
    }

    let httpDefault = {
        method: method,
        baseURL: 'http://localhost:9001',
        url: url,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        // data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
        data: method === 'POST' || method === 'PUT' ? params : null,
        timeout: 20000,
        headers: { 'Content-Type': 'application/json' }
    };
    //上传文件
    // if (params.file && params.catalog) {
    //     let fileData = new FormData();
    //     fileData.append('file', params.file);
    //     fileData.append('catalog', params.catalog);
    //     // fileData.append('loginKey', loginKey);
    //     if (params.is_public_read) {
    //         fileData.append('is_public_read', params.is_public_read);
    //     }
    //     httpDefault.data = fileData;
    // }
    //如果设置了响应数据类型
    if (params.responseType) {
        httpDefault.responseType = params.responseType;
    }

    return new Promise((resolve, reject) => {
        axios(httpDefault)
            .then((res) => {
                //0代表正常,1代表异常,222代表登录失效
                if (res.code === 0) {
                    resolve(res);
                } else if (res.code === 1) {
                    resolve(res);
                } else if (res.code === 222) {
                    // 登录失效重新登录
                    goLogin();
                    resolve(res);
                }
                else {
                    reject(res);
                }

            }).catch((err) => {
                console.log(err)
            })
    })
}


export default req