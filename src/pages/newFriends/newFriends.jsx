import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Toast } from 'antd-mobile';
import './newFriends.scss'
class newFriends extends Component {
    state = {
        applyList: []
    }
    componentDidMount() {
        this.getApplyList()
    }
    getApplyList = () => {
        React.api.getApplyList().then(res => {
            if (res.code === 1) {
                this.setState({
                    applyList: res.data.applyList
                })
            }
        })
    }
    handleAgreeApply = (_id) => {
        React.api.agreeApply({ _id }).then(res => {
            if (res.code === 1) {
                Toast.success('添加成功!', 1);
                this.getApplyList();
            }
        })
    }
    render() {
        return (
            <div className='newFriends'>
                {
                    this.state.applyList.length ? this.state.applyList.map(item => (<div className='apply-item' key={item._id}>
                        <div className='apply-avatar'>
                            <img src={item.avatarUrl} alt="" />
                        </div>
                        <div className='apply-inner'>
                            <div className='apply-info'>
                                <h3>{item.nickname}</h3>
                                <span>{item.username}</span>
                            </div>
                        </div>
                        <div className="apply-btn">
                            {
                                item.isAgree ?
                                    (<span style={{ fontSize: "14px" }}>已添加</span>)
                                    :
                                    (<Button size="small" onClick={this.handleAgreeApply.bind(this, item._id)} style={{ width: '60px', fontSize: '12px', padding: '0', background: "#1aad19", color: "#fff", fontWeight: '600' }}>同意</Button>)
                            }
                        </div>
                    </div>)) : (<div className='noList-msg'>暂无好友申请记录哦~</div>)
                }
            </div>
        )
    }
}

export default withRouter(newFriends)
