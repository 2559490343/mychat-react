import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import './ChatRoom.scss'
class ChatRoom extends Component {
  state = {
    chatList: [{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}, {id:9}, {id:10}, {id:11}]
  }
  handleSend = async () => {
  }
  toSingleChat = () => {
    this.props.history.push('/singlechat', { name: '熊熊熊' })
  }
  componentDidMount() {
    // console.log('聊天室');
  }
  render() {
    return (
      <div className="chatRoom">
        {
          this.state.chatList.map(item => {
            return (<div className='chat-item' key={item.id} onClick={this.toSingleChat}>
              <div className='chat-avatar'>
                <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg" alt="" />
              </div>
              <div className='chat-inner'>
                <div className='chat-info'>
                  <h3>熊熊熊</h3>
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
