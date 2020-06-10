import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import ChatRoom from '../chatroom/ChatRoom'
import MailList from '../maillist/MailList'
import Mine from '../mine/Mine'
import Header from '../../components/header/Header'
import Tabbar from '../../components/tabbar/Tabbar'
import './Home.scss'
// import childrenRouters from '../../routers/childrenRouters'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'chat',
      hidden: false,
      fullScreen: true,
      hasNew: false
    };
  }

  render() {
    // let username = sessionStorage.getItem("username");

    return (
      <>
        <Header></Header>
        <Switch>
          <Route path="/home/chat" render={() => (<ChatRoom />)} />
          <Route path="/home/maillist" render={() => (<MailList />)} />
          <Route path="/home/mine" render={() => (<Mine />)} />
          <Redirect from="/" to="/home/chat" />
          {/* {
            childrenRouters.map((item, index) => {
              return <Route key={index} path={item.path} exact render={props =>
                (!item.auth ? (<item.component {...props} />) : (username ? <item.component {...props} /> : <Redirect to=
                  '/login'
                />)
                )} />
            })
          } */}
        </Switch>
        <Tabbar></Tabbar>
      </>

    );
  }
}

export default Home

