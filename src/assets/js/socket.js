import io from 'socket.io-client';

//websocket地址
const wsUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9977' : 'https://xiongxiong.site:9978'
//建立websocket连接
// const socket = io(wsUrl);
// //收到server的连接确认
// socket.on('open', (msg) => {
//     console.log(msg);
// });

class Socket {

    // 单例化
    static getInstance() {
        if (!Socket.instance) {
            Socket.instance = new Socket();
        }
        return Socket.instance

    }

    constructor() {
        this.connect();
    }

    connect() {
        // 防止多次连接 实现单次长连接
        if (!this.socket) {
            this.socket = io(wsUrl);
        }
    }

    on(dirName, fn) {
        this.socket.on(dirName, fn)
    }

    emit(dirName, data) {
        this.socket.emit(dirName, data)
    }

}

export default Socket
