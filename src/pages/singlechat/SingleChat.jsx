import React, { Component } from 'react'
import { NavBar, Icon, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import './SingleChat.scss'

class SingleChat extends Component {
  state = {
    userId: 1,
    chat_list: [
      {
        userId: 1,
        id: 1,
        content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        avatar: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg'
      },
      {
        userId: 2,
        id: 2,
        content: '哈哈哈哈哈',
        avatar: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg'
      },
      {
        userId: 1,
        id: 3,
        content: '哈哈哈哈哈',
        avatar: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg'

      },
      {
        userId: 2,
        id: 4,
        content: '哈哈哈哈哈',
        avatar: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg'

      },
      {
        userId: 1,
        id: 5,
        content: '哈哈哈哈哈',
        avatar: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg'

      }
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
      userId: 1,
      id: parseInt(Math.random() * 100),
      content: this.state.message,
      avatar: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg'
    }
    let arr = this.state.chat_list;
    arr.push(obj)
    this.setState({
      chat_list: arr,
      message: ''
    }, () => {
      this.chat_area.scrollTop = this.chat_area.scrollHeight;
    })
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
  componentDidMount() {
    let chat_area = document.querySelector("#chat_area");
    this.chat_area = chat_area
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
        >{this.props.history.location.state.name}</NavBar>
        <div className='chat-area' id='chat_area'>
          {
            this.state.chat_list.map(item =>
              (<div key={item.id} className={`chat-item ${item.userId === this.state.userId ? "chat-item-right" : ''}`}>
                <div className="chat-item-inner">
                  <div className="avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="content">
                    {item.content}
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
