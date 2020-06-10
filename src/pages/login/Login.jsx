import React, { Component } from 'react'
import { Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import './Login.scss'
class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  getUserName = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  getPassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  handleLogin = () => {
    // console.log(this.state);
    if (!this.state.username) {
      Toast.offline("请输入用户名!", 1);
      return
    } else if (!this.state.password) {
      Toast.offline("请输入密码!", 1);
      return
    } else {
      React.api.getMsg().then(res => {
        console.log(res);

      });

      Toast.success('登录成功！', 1);
      setTimeout(() => {
        this.props.history.push('/home')
      }, 500);
      sessionStorage.setItem('username', this.state.username)
    }

  }
  toRegister = () => {
    this.props.history.push('/register')
  }
  render() {
    return (
      <div className='login'>
        <h1>用户登录</h1>
        <div className="login-form">
          <label>
            <span>用户名:</span>
            <input type="text" placeholder="请输入用户名" onChange={this.getUserName} value={this.state.username} />
          </label>
          <label>
            <span>密码:</span>
            <input type="password" placeholder="请输入密码" onChange={this.getPassword} value={this.state.password} />
          </label>

          <div className='login-btn' onClick={this.handleLogin}>登录</div>
          <div className='toRegister' onClick={this.toRegister}>没有账号？去注册</div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
