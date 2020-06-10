import req from './req'

const api = {
    getMsg: params => {
        return req('GET', '/users/', params)
    }
}
export default api