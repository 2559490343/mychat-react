import React, { Component } from 'react'
import { NavBar, Icon, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import './SingleChat.scss'
class SingleChat extends Component {
  state = {
    userId: React.utils.getStorage('user')._id,
    chat_list: [
    ],
    message: ''
  }
  chat_area = null
  sendMessage = () => {
    // console.log(this.state.message);
    if (this.state.message === '') {
      Toast.offline("请输入信息！", 1)
      return
    }

    let obj = {
      sendUserId: React.utils.getStorage('user')._id,
      receiveUserId: this.props.history.location.state._id,
      chatMsg: this.state.message,
      sendUserAvatar: React.utils.getStorage('user').avatarUrl,
      _id: Math.random() * 1000000
    };
    React.api.sendChatMsg(obj).then(res => {

    })
    let arr = this.state.chat_list;
    arr.push(obj)
    this.setState({
      chat_list: arr,
      message: ''
    }, () => {
      this.chat_area.scrollTop = this.chat_area.scrollHeight;
    });

  }
  getMessage = (e) => {
    this.setState({
      message: e.target.value
    })
    // this.state.message = e.target.value
  }
  keySend = (e) => {
    // console.log(e.keyCode,e.ctrlKey);
    if (e.keyCode === 13 && e.ctrlKey === true) {
      this.sendMessage()
    }

  }
  getHisChatMsgList = () => {
    let obj = {
      pageNo: 1,
      pageSize: 30,
      sendUserId: React.utils.getStorage('user')._id,
      receiveUserId: this.props.history.location.state._id
    }
    React.api.getHisChatMsgList(obj).then(res => {
      if (res.code === 1) {
        this.setState({
          chat_list: res.data.chatMsgList
        }, () => {
          this.chat_area.scrollTop = this.chat_area.scrollHeight;
        })
      }
    })
  }

  getChatMsg = msgObj => {
    console.log("singlechat", msgObj);
    let chat_list = this.state.chat_list;
    chat_list.push(msgObj)
    this.setState({ chat_list }, () => {
      this.chat_area.scrollTop = this.chat_area.scrollHeight;
    })
  }

  componentDidMount() {
    let chat_area = document.querySelector("#chat_area");
    this.chat_area = chat_area;
    this.getHisChatMsgList();
    React.socket.on("getChatMsg", this.getChatMsg)
  }
  componentWillUnmount() {
    React.socket.socket.removeListener('getChatMsg', this.getChatMsg)
  }
  // componentDidUpdate(nextProps, nextState) {
  //   // this.chat_area.scrollTop = this.chat_area.scrollHeight;
  // }
  render() {
    return (
      <div className='single-chat'>
        <NavBar
          mode="light"
          icon={<Icon type="left" style={{ color: '#000' }} />}
          onLeftClick={() => this.props.history.goBack()}
          style={{ backgroundColor: '#ededed' }}
        >{this.props.history.location.state.nickname}</NavBar>
        <div className='chat-area' id='chat_area'>
          {
            this.state.chat_list.map(item =>
              (<div key={item._id} className={`chat-item ${item.sendUserId === this.state.userId ? "chat-item-right" : ''}`}>
                <div className="chat-item-inner">
                  <div className="avatar">
                    <img src={item.sendUserAvatar} alt="" />
                  </div>
                  <div className="content">
                    {item.chatMsg}
                  </div>
                </div>

              </div>
              ))
          }
        </div>
        <div className='chat-input'>
          <span className="iconfont icon-yuyin"></span>
          <div className="input-area">
            <textarea placeholder="点击这里输入" onChange={this.getMessage} value={this.state.message} onKeyUp={this.keySend} />
          </div>
          <span className="iconfont icon-add"></span>
          <span className="iconfont icon-zhifeiji" onClick={this.sendMessage} ></span>
        </div>
      </div>
    )
  }
}
export default withRouter(SingleChat)
