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
    // 获取好友列表
    getFrientsList: params => {
        return req('get', '/users/getFrientsList', params, false)
    },
    // 搜索添加好友
    searchFriends: params => {
        return req('get', '/users/searchFriends', params, true)
    },
    // 修改头像
    changeUserAvatar: params => {
        return req('post', '/users/changeUserAvatar', params, true)
    },
    // 修改昵称
    changeUserNickname: params => {
        return req('get', '/users/changeUserNickname', params, false)
    },
    // 发送好友申请
    sendAddApply: params => {
        return req('get', '/users/sendAddFriends', params, false)
    },
    // 获取好友申请列表
    getApplyList: params => {
        return req('get', '/users/getApplyList', params, false)
    },
    // 同意好友申请
    agreeApply: params => {
        return req('get', '/users/agreeApply', params, false)
    },
}
export default api