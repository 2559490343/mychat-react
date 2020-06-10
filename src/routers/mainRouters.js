import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import SingleChat from '../pages/singlechat/SingleChat'
export default [
  { path: '/home', name: 'Home', component: Home, auth: true },
  { path: '/login', name: 'Login', component: Login, auth: false },
  { path: '/singlechat', name: 'SingleChat', component: SingleChat, auth: false },
]

