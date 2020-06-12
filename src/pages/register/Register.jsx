import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile';

import './Register.scss'
class Register extends Component {
    state = {
        username: '',
        password: '',
        confirm: ''
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
    getConfirm = (e) => {
        this.setState({
            confirm: e.target.value
        })
    }
    handleRegister = () => {
        // console.log(this.state);
        if (!this.state.username) {
            Toast.offline("请输入用户名!", 1);
            return
        } else if (!this.state.password) {
            Toast.offline("请输入密码!", 1);
            return
        } else if (!this.state.confirm) {
            Toast.offline("请确认密码!", 1);
            return
        } else {
            let params = {
                username: this.state.username,
                password: this.state.password
            }
            React.api.handleRegister(params).then(res => {
                // console.log(res);
                if (res.code === 1) {
                    Toast.success('注册成功！', 1);
                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, 500);
                    sessionStorage.setItem('username', this.state.username)
                } else {
                    Toast.fail(res.msg, 1);
                }

            }).catch(err => {
                console.log(err);
            })

        }

    }
    toLogin = () => {
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className='Register'>
                <h1>用户注册</h1>
                <div className="register-form">
                    <label>
                        <span>用户名:</span>
                        <input type="text" placeholder="请输入用户名" onChange={this.getUserName} value={this.state.username} />
                    </label>
                    <label>
                        <span>密码:</span>
                        <input type="password" placeholder="请输入密码" onChange={this.getPassword} value={this.state.password} />
                    </label>
                    <label>
                        <span>确认密码:</span>
                        <input type="password" placeholder="请确认密码" onChange={this.getConfirm} value={this.state.confirm} />
                    </label>
                    <div className='register-btn' onClick={this.handleRegister}>注册</div>
                    <div className='toLogin' onClick={this.toLogin}>已有账号？去登陆</div>
                </div>
            </div>
        )
    }
}
export default withRouter(Register)