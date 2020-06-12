import req from './req'

const api = {
    handleLogin: params => {
        return req('post', '/users/login', params,true)
    },
    handleRegister: params => {
        return req('post', '/users/register', params,true)
    },
}
export default api