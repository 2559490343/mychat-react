import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import chat from '../../assets/img/chat.jpg'
import mine from '../../assets/img/mine.png'
import maillist from '../../assets/img/maillist.png'
import chatActive from '../../assets/img/chat-active.jpg'
import mineActive from '../../assets/img/mine-active.png'
import maillistActive from '../../assets/img/maillist-active.png'
import './Tabbar.scss'
class Tabbar extends Component {
  state = {
    selected: 0
  }
  componentDidMount() {
    // 根据当前路由更新tab
    let route = this.props.history.location;
    switch (route.pathname) {
      case '/home/chat':
        this.setState({
          selected: 0
        });
        break;
      case '/home/maillist':
        this.setState({
          selected: 1
        });
        break;
      case '/home/mine':
        this.setState({
          selected: 2
        });
        break;
      default:
        break;
    }
  }
  // tab切换点击事件
  handleTab = (index) => {
    if (this.state.selected === index) return
    this.setState({
      selected: index
    });
    // console.log(this.props.history);
    let router = this.props.history;
    // 根据index跳转对应路由
    switch (index) {
      case 0:
        router.push('/home/chat')
        break;
      case 1:
        router.push('/home/maillist')
        break;
      case 2:
        router.push('/home/mine')
        break;
      default:
        break;
    }

  }
  render() {
    return (
      <div className='tabbar'>
        <div className='tab-item' onClick={() => { this.handleTab(0) }}>
          <img src={this.state.selected === 0 ? chatActive : chat} alt="" />
          <figure>聊天</figure>
        </div>
        <div className='tab-item' onClick={() => { this.handleTab(1) }}>
          <img src={this.state.selected === 1 ? maillistActive : maillist} alt="" />
          <figure>通讯录</figure>
        </div>
        <div className='tab-item' onClick={() => { this.handleTab(2) }}>
          <img src={this.state.selected === 2 ? mineActive : mine} alt="" />
          <figure>我</figure>
        </div>
      </div>
    )
  }
}
export default withRouter(Tabbar)