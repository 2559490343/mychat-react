import React from 'react';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import SingleChat from './pages/singlechat/SingleChat'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import './App.scss'
import './assets/style/iconfont.css'

// import mainRouters from './routers/mainRouters'
class App extends React.Component {
  render() {
    // let username = sessionStorage.getItem("username");
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" render={() => (<Login />)} />
            <Route path="/register" render={() => (<Register />)} />
            <Route path="/home" render={() => (<Home />)} />
            <Route path="/singlechat" render={() => (<SingleChat />)} />
            <Redirect from="/" to="/login" />
            {/* {
              mainRouters.map((item, index) => {
                return <Route key={index} path={item.path} exact render={props =>
                  (!item.auth ? (<item.component {...props} />) : (username ? <item.component {...props} /> : <Redirect to=
                    '/login'
                  />)
                  )} />
              })
            } */}
            )
            }
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;
