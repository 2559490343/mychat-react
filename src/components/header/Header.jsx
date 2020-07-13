import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile';
import './Header.scss'
class Header extends Component {
  state = {

  }
  goAddFriend = () => {
    this.props.history.push("/home/addFriends")
  }
  // componentDidMount() {

  // }
  render() {
    // 检测路由变化改变title
    const route = this.props.history.location;
    let route_name = ''
    switch (route.pathname) {
      case '/home/chat':
        route_name = '聊天'
        break;
      case '/home/maillist':
        route_name = '通讯录'
        break;
      case '/home/mine':
        route_name = '我'
        break;
      default:
        break;
    }

    return (
      <div className="header">
        <div className="header-inner">
          <NavBar
            mode="light"
            rightContent={[
              <Icon key="0" type="search" style={{ marginRight: '16px', color: '#000' }} />,
              <Icon key="1" type="plus" style={{ color: '#000' }} onClick={this.goAddFriend} />,
            ]}
            style={{ backgroundColor: '#ededed' }}
          >{route_name}</NavBar>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
