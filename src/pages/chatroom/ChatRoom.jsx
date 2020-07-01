import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import './ChatRoom.scss'
class ChatRoom extends Component {
  state = {
    chatList: []
  }
  handleSend = async () => {
  }
  toSingleChat = (info) => {
    this.props.history.push('/singlechat', { nickname: info.nickname, _id: info._id })
  }
  getChatList = () => {
    React.api.getChatList().then(res => {
      this.setState({
        chatList: res.data.chatList
      })
    })
  }
  getChatMsg = msgObj => {
    console.log("chatroom:", msgObj);
  }
  componentDidMount() {
    // console.log('聊天室');
    this.getChatList();
    // 监听 接收到的信息
    React.socket.on("getChatMsg", this.getChatMsg)
  }
  componentWillUnmount() {
    // 移除socket事件监听
    React.socket.socket.removeListener('getChatMsg', this.getChatMsg)
  }
  render() {
    return (
      <div className="chatRoom">
        {
          this.state.chatList.map(item => {
            return (<div className='chat-item' key={item._id} onClick={this.toSingleChat.bind(this, { _id: item._id, nickname: item.nickname })}>
              <div className='chat-avatar'>
                <img src={item.avatarUrl} alt="" />
              </div>
              <div className='chat-inner'>
                <div className='chat-info'>
                  <h3>{item.nickname}</h3>
                  <span>12:29</span>
                </div>
                <div className='chat-context'>
                  <p>哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或</p>
                </div>
              </div>
            </div>)
          })
        }
      </div>
    )
  }
}

export default withRouter(ChatRoom)
