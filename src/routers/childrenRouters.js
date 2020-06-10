import ChatRoom from '../pages/chatroom/ChatRoom'
import MailList from '../pages/maillist/MailList'
import Mine from '../pages/mine/Mine'
export default [
  { path: '/home/chat', name: 'Home', component: ChatRoom, auth: true },
  { path: '/home/maillist', name: 'Login', component: MailList, auth: true },
  { path: '/home/mine', name: 'SingleChat', component: Mine, auth: true },
]