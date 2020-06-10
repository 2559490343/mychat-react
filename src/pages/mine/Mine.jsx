import React, { Component } from 'react'
import './Mine.scss'
export default class Mine extends Component {
  componentDidMount() {
    console.log('我');
  }
  render() {
    return (
      <div className='Mine'>
        <div className="mine-head">
          <div className="head-avatar">
            <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3118813608,3660597234&fm=26&gp=0.jpg" alt="" />
          </div>
          <div className="head-nickname">熊熊熊</div>
          <div className="head-username">2559490343</div>
        </div>
        <div className="mine-body"></div>
      </div>
    )
  }
}
