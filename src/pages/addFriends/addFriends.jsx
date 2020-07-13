import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { SearchBar, Button } from 'antd-mobile';
import './addFriends.scss'
class AddFriends extends Component {
    state = {
        btnText: "取消",
        searchValue: '',
        resultList: []
    }
    handleCancel = () => {
        if (this.state.btnText === '取消') {
            this.props.history.goBack()
        } else {
            // console.log("search");
            React.api.searchFriends({ username: this.state.searchValue }).then(res => {
                if (res.code === 1) {
                    this.setState({
                        resultList: res.data.resultList
                    })
                }
            })
        }
    }
    handleChange = (val) => {
        this.setState({
            searchValue: val.trim()
        }, () => {
            if (val.trim() && val !== 0) {
                this.setState({
                    btnText: '搜索'
                })
            } else {
                this.setState({
                    btnText: '取消'
                })
            }
        })
    }
    render() {
        return (
            <div className="addFriends">
                <div className="search">
                    <SearchBar
                        placeholder="输入聊天号搜索好友"
                        onCancel={this.handleCancel}
                        onChange={this.handleChange}
                        showCancelButton
                        cancelText={this.state.btnText}
                        value={this.state.searchValue}
                    />
                </div>
                <div className="resultList">
                    {
                        this.state.resultList.map(item => (
                            <div className='result-item' key={item._id}>
                                <div className='result-avatar'>
                                    <img src={item.avatarUrl} alt="" />
                                </div>
                                <div className='result-inner'>
                                    <div className='result-info'>
                                        <h3>{item.nickname}</h3>
                                        <span>{item.username}</span>
                                    </div>
                                </div>
                                <div className="result-btn">
                                    <Button icon="plus" size="small" style={{ width: '60px', fontSize: '12px', padding: '0', background: "#1aad19", color: "#fff", fontWeight: '600' }}>添加</Button>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        )
    }
}

export default withRouter(AddFriends)
