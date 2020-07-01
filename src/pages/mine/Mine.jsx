import React, { Component } from 'react'
import './Mine.scss'
export default class Mine extends Component {
  state = {
    user: {}
  }
  componentDidMount() {
    let user = React.utils.getStorage('user');
    this.setState({
      user
    })
  }
  render() {
    return (
      <div className='Mine'>
        <div className="mine-head">
          <div className="head-avatar">
            <img src={this.state.user.avatarUrl} alt="" />
          </div>
          <div className="head-nickname">{this.state.user.nickname}</div>
          <div className="head-username">{this.state.user.username}</div>
        </div>
        <div className="mine-body"></div>
      </div>
    )
  }
}
