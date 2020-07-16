import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import './Mine.scss'
import { Toast, Modal } from 'antd-mobile';
class Mine extends Component {
  state = {
    user: {},
    showEdit: false
  }
  componentDidMount() {
    let user = React.utils.getStorage('user');
    this.setState({
      user
    })
  }
  handleChangeAvatar = () => {
    console.log('handleChangeAvatar :>> ');
    let fileUpload = document.createElement('input');
    fileUpload.type = 'file';
    fileUpload.accept = "image/gif,image/jpeg,image/jpg,image/png,image/svg"
    fileUpload.style.display = 'none'
    document.body.appendChild(fileUpload);
    fileUpload.click(); // 触发点击
    fileUpload.onchange = (e) => {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      React.api.changeUserAvatar(formData).then(res => {
        if (res.code === 1) {
          Toast.success('头像上传成功！', 0.5);
          let user = Object.assign({}, this.state.user)
          user.avatarUrl = res.data.avatarUrl;
          this.setState({
            user
          });
          React.utils.saveStorage('user', user)
        }
      })
    }
  }
  handleShowEdit = () => {
    this.setState({
      showEdit: true
    })
  }
  handleLogout = () => {
    Modal.alert('提示', '确定要退出登录吗?', [
      { text: '取消', onPress: () => { return } },
      {
        text: '确定',
        onPress: () => {
          sessionStorage.clear();
          this.props.history.replace('/login');
        },
      },
    ])

  }
  handleEditNickname = (e) => {
    let user = { ...this.state.user };
    user.nickname = e.target.value
    this.setState({
      user
    })
  }
  handleSaveEdit = () => {
    this.setState({
      showEdit: false
    });
    React.api.changeUserNickname({ nickname: this.state.user.nickname }).then(res => {
      if (res.code === 1) {
        const user = this.state.user;
        React.utils.saveStorage('user', user);
        Toast.success("昵称修改成功！", 0.8)
      }
    })
  }
  keySaveEdit = (e) => {
    if (e.keyCode === 13) {
      this.handleSaveEdit()
    }

  }
  render() {
    return (
      <div className='Mine'>
        <div className="mine-head">
          <div className="head-avatar" onClick={this.handleChangeAvatar}>
            <img src={this.state.user.avatarUrl} alt="" />
          </div>
          <div className="head-nickname">
            {
              !this.state.showEdit ? (<div className="nickname-text" onClick={this.handleShowEdit}>
                <span style={{ marginLeft: '12px' }}>{this.state.user.nickname}</span>
                <i className="el-icon-edit" style={{ fontSize: '12px', marginLeft: '5px' }}></i>
              </div>) : (<div className='nickname-edit'>
                <input type="text" autoFocus value={this.state.user.nickname} onKeyUp={this.keySaveEdit} onKeyPress={this.keySaveEdit} onBlur={this.handleSaveEdit} onChange={this.handleEditNickname} />
              </div>)
            }

          </div>
          <div className="head-username">{this.state.user.username}</div>
        </div>
        <div className="mine-body">
          <div className="body-func"></div>
          <div className="body-logout">
            <div className="logout-btn" onClick={this.handleLogout}>退出登录</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Mine)
