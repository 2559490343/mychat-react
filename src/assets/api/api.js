import req from './req'

const api = {
    // 登录
    handleLogin: params => {
        return req('post', '/users/login', params, true)
    },
    // 注册
    handleRegister: params => {
        return req('post', '/users/register', params, true)
    },
    // 发送消息
    sendChatMsg: params => {
        return req('post', '/chat/sendChatMsg', params, false)
    },
    // 获取聊天列表(暂时使用好友列表)
    getChatList: params => {
        return req('get', '/chat/getChatList', params, false)
    },
    // 获取和某个好友的历史聊天记录
    getHisChatMsgList: params => {
        return req('post', '/chat/getHisChatMsgList', params, false)
    },
}
export default api