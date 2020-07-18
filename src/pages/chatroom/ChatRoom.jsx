import React, { Component } from 'react'
import { Badge } from 'antd-mobile';
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
      if (res.code === 1) {
        this.setState({
          chatList: res.data.chatList
        })
      }
    })
  }
  getChatMsg = msgObj => {
    console.log("chatroom:", msgObj);
  }
  componentDidMount() {
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
            return (<div className='chat-item' key={item._id} onClick={this.toSingleChat.bind(this, { _id: item.otherUserId, nickname: item.nickname })}>
              <div className='chat-avatar'>
                <img src={item.avatarUrl} alt="" />
                <Badge text={0} overflowCount={99} />
              </div>
              <div className='chat-inner'>
                <div className='chat-info'>
                  <h3>{item.nickname}</h3>
                  <span>
                    {new Date(item.chatDate).getTime() - Date.now() > 1000 * 60 * 60 * 24
                      ?
                      React.utils.dateFormat('yyyy-MM-dd hh:mm', item.chatDate)
                      :
                      React.utils.dateFormat('hh:mm', item.chatDate)}
                  </span>
                </div>
                <div className='chat-context'>
                  <p>{item.lastChatContent}</p>
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
