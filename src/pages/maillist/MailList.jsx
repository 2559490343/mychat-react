import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Badge } from 'antd-mobile';
import './MailList.scss'
class MailList extends Component {
  componentDidMount() {
    this.getFrientsList()
  }
  state = {
    letterList: ['↑', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
    mailList: [],
    activeLetter: '',
    applyCount: 0
  }
  handleLetterClick = (e) => {
    e.persist()
    let letter = e.target.innerText;
    this.setState({
      activeLetter: letter === '↑' ? '' : letter
    })
    if (letter === '↑') {
      this.mailListDom.scrollIntoView();
    } else {
      let itemList = document.getElementsByClassName('name-item');
      [...itemList].some(item => {
        if (item.dataset.index === letter) {
          item.scrollIntoView()
          return true
        } else {
          return false
        }
      })
    }
  }
  toSingleChat = (info) => {
    this.props.history.push('/singlechat', { nickname: info.nickname, _id: info._id })
  }
  toNewFriends = () => {
    this.props.history.push('/home/newFriends')
  }
  getFrientsList = () => {
    React.api.getFrientsList({ _id: React.utils.getStorage('user')._id }).then(res => {
      if (res.code === 1) {
        this.setState({
          mailList: res.data.mailList,
          applyCount: res.data.applyCount
        })
      }

    })
  }
  render() {
    return (
      <div className='MailList' ref={(e) => { this.mailListDom = e }}>
        <div className='maillist-body' >
          <div className="body-options">
            <div className="list-item" onClick={this.toNewFriends}>
              <div className="avatar">
                <img src="http://img2.imgtn.bdimg.com/it/u=3693349525,1948615145&fm=26&gp=0.jpg" alt="" />
                <Badge text={this.state.applyCount} overflowCount={99} />
              </div>
              <div className="username">新的朋友</div>
            </div>
            <div className="list-item">
              <div className="avatar">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADcANwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3aiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK8W+KvxNlgnm8PaFOUZcpd3KHkHuint7n8KAOp8Y/FjRvDEklnaj+0NQXgxxthIz/tN6+wyfpXlN78ZvGNzMzwXdvaIekcVupA/FgTXn/1ooHY9CsPjP4vs2Hn3FteqO08AH6piu00f482ExVNY0qa3J4Mtu4kX8jgj9a8JooCx9eaL4u0DxCo/svVLedyM+Vu2yD/gJwf0rar4rR3jcOjFXU5DKcEH616l4H+MF/pc8Vj4hke8sD8ouG5li9yf4h9ef5UBY+gqKitrmG8tYrm2lSWCVQ6SIchgehFS0CCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOX+IXiNvDHg29vomxdOBDbn0duAfwGT+FfKTu0js7sWZiSWJySfWvevj3Kw8PaVCPutdFj9Qhx/M14JQNBRRRQMKKKKACiiigD2v4G+KZHe58N3UhZQpntNx+7z86j8wfzr2uvlP4bXbWfxD0V1JG+fyj7hgV/rX1ZQJhRRXDeNvifpXhHdaRj7bqeP+PdGwI/d27fTr9KBHc0V8x3/wAXvGN5Ozx6ilqh6RQQrhfxIJ/Wrul/GvxVZEC7Nrfp382La35rj9QaB2Po+ivLdD+OOhX22PVrafTpD1cfvY/zAyPyr0qxv7TU7RLqxuYri3flZImDKfxFAixRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHk/wAeoS3hnTJh0S8Kn8UP+FeA19GfG6e0TwMsM0qrcSXKNAh6sR97HsAf5V850DQUUUUDCiiigAooooA6f4dQNcfEPQ0Uci5D/goLf0r6vr5t+C0VvJ8QY3mdVkjtpGhB/ifAGP8Avksfwr6SoEziPid4zbwj4dAtGA1G8Jjtz/cA+8/4ZH4kV8xyyyTzPLK7SSOxZnY5LE9STXpXxyuZJfHEEBJ8uGzQKO2SzEn+X5V5lQCCiiigYV0PhLxjqfhDU1ubKVmgYjz7Zj8ko+nY+hrnqKAPsjR9Vtdc0i11Ozfdb3CB19R6g+4OR+FXq8r+BN/JceFL6zdiVtrrKewZQcfmD+deqUEhRRRQAUUUUAFFFFABRRRQAUUUUAeIfH+GT7Roc/Ji2TJ7A5U/r/SvGK+nfit4al8R+DZfswBubJvtKA9WAB3KPw/kK+YqBoKKKKBhRRRQAUUUUAdl8KoJJ/iTpGzP7tndiOwCNX1JXiXwL8NSCS68STACMqba3HcnILN+gH517bQJnzv8dLYxeNrab+GayQ59wzD/AArzGvRfjTqk1747ks5FCxWMSRx46tuAYk/n+ledUAFFFFAwooooA9/+A1o0XhjUbojCzXe1ffao/wDiq9XrzL4G3j3Hgme3aMBba7dVYfxZAbn869NoJCiiigAooooAKKKKACiiigAooooAa6LJGyMMqwII9q+PfEGlyaJ4gv8ATJAQbadoxnuAeD+Iwfxr7Erw/wCOPhRkuIfE1tHlHCwXWB0YfdY/UfL+AoGjxmiiigYUUUUAFKASQAMk9qSu8+FHhNvEniqO5mQ/YNPImlJHDN/Cv4kZPsKAPevA+jNoHgzS9OkXbMkIeUejt8zD8CcfhXQUUUEngvx00CWDWrTXo1H2e5jEEhHaRc4z9V/9BNeR19S/FDRH1zwFfxQruntwLmMY6lOSP++d1fLVA0FFFFAwoord8HaHJ4j8WadpqKSkkoaU+ka8sfyBoA+iPhhoEvh7wNaQXC7bi4JuZV/ulugPuFArsaQAAAAYA4FLQSFFFFABRRRQAUUUUAFFFFABRRRQAVV1HT7XVdPnsL2FZbadCkiHuDVquZ8aeNdP8G6Ubi4YS3cgxb2wPzSH+ijuaAPnXxv4NvPButvazBntJCWtrjHEi+h/2h3FczX03o2v+G/in4eexu4k8/bma0c/PG395D6ehH415l4o+C+t6XK82i/8TKzzkICFmQe46N+H5UDPMaK2D4T8RCbyjoWpeZnG37K/+Fdb4d+DfiPV5UfUYxpdrnlpsGQj2Qf1xQM47w/oGoeJdXi03Toi8zn5mP3Y17sx7AV9UeFvDVl4U0KHTLNc7fmllI+aVz1Y/wCeBWEF8KfCbw6eQjMO+GnuWH+fYCtPwl430fxhZ+ZYzbLhf9ZaykCRPfHce4oEdJRRRQIQgMCCMg8EGvmT4neCZPCuvvcW8f8AxK7xy8DAcRnqUP07e3419NPIkUbSSOqIoyzMcAD1Jrz5vHfg3xjqN74WvGDwSfJHNLxHM3fY3Yg9D37UAfNlFeneKPgvremTyTaIP7Rss5VMgTIPQjgN+H5VzVn8OPF97OIo9Bu4znlpl8tR+LYoKOWAJOByTX0b8JPAz+HNKbVdQi26leqMIRzDH1C/U9T+ArM8M/DnRfAdsPEPiq9gkuYPmQHmKJu2B1dvT9B3ru/DHjXRPFsLvplyfNQ/PBKNsij1x3HuKBHQ0UUUCCiiigAooooAKKKKACiiuP8AGfxF0jwdH5UpN1qDDKWsZ5A9WP8ACP19qAOwrJ1rxNovh6EyapqVvbcZCM2Xb6KOT+VfPOu/FrxVrLOkV4NPt26RWo2nH+/979RXESzSzytLNI8kjHLO7Ek/Umgdj2XxN8dHdZLbw5Z+X2+13Iyfqqf4n8K8h1DUr3Vr2S8v7mW5uJDlpJGyT/gPaqtFAya1u7mxuo7m0nkgnjOUkjYqyn2Ir1Lw/wDHLVbKJINaso79Bx50beXJ+PGD+leT0UAfQX/C+PDvl5/s7U9/93an891c3rnx3v7iNotF0yO0zx507eY31C8AH65ryGigVi5qWqX2sXr3mo3ctzcP1eRsn6D0HsKhtLu4sbqO5tZ5IJ4zuSSNirKfYioaKBnrnhv45X9miW+vWYvUHH2iEhJMe69G/SvU9A+IPhnxGVjs9TjS4b/lhP8Au3+gB6/hmvlCigVj6c+IPgnV/FttssNektowObKQYhkPuV5/PP4V4B4h8H674Wm26pYyRRk4Sdfmjb6MP5da0/D3xM8T+HQkUN6bq1X/AJYXXzjHoD1H4GvZvCnxG0Hx1CdKv7eOC8lXDWk+GSX12k9foeaAPHdA+KXijw/ClvHeLd2yDCxXa79o9jkN+Ga3Lr46eJJoSkNnp8DEY3qjMR7jLYqH4ofDhPC0g1XSwx0qZ9rRk5MDHoM/3T2/KvNaANPWvEOreIrr7Rqt9NdSDoHPyr9FHA/CqVpeXNhdJc2dxLBPGcpJExVl+hFQ0UDPU9A+OOtWASHV7WLUYhgGRT5cv5gYP5fjXqnh74l+GPEQVIb9ba5b/l3usRtn0B6H8DXyxRQKx9rZzRXzh8OfiXf6BqVvp2p3Lz6RKwQ+acmDPRlPp6ivo8EEZByKBBRRRQAUUUUAYvivxBF4Y8NXmqy4JhTEaE/fc8KPz/Svku+vbjUr6e9u5WluJ3LyO3Uk1698edcLXOnaFG/yopupgD3OVX9N3514zQNBRRRQMKKKKACiiigAooooAKKKKACiiigAp8UrwypLE7JIhDKynBBHQimUUAfUHhrUrb4j/Dpor3aZJYzbXQH8Mg/iH/jrCvmjUbGfS9SubC5XbNbytE49wcV6X8DdcNn4ludHkb91fRF0H/TROf1Xd+VV/jdoo0/xhFqEaYj1CEMSP76/K36bT+NAjzOiiigYUUUUAFfU3wx10694EsZZH3T2w+zSk9cpwD+K7T+NfLNe0/APUz5ur6UzcFUuUH0+Vv5rQJnttFFFAgooqtqF0tjpt1eP92CF5T9FUn+lAHy18RdU/tfx9q9yGyiTeSn0Qbf6Zrl6fLI00ryucu7FmPqTTKCgooooAKKKKACiiigAooooAKKKKACiiigAooooA1/C+qHRfFOmajnCwXCM5/2c4b9Ca9w+OGmi88GW9+gy1ncqc/7Djaf12188V9OX5/4Sb4LSSfekm0oSn3kRQ3/oS0CPmOiiigYUUUUAFd/8Gr37L8RLaPOBcwyRH343D9VFcBXSfD+4+zeP9DkBxm7RP++vl/rQB9ZUUUUEhXLfEe7+x/DzW5AcFrcxD/gZC/1rqa89+NFx5Pw8mTOPOuIk/Xd/7LQB810UUUFBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV9L/CeZdS+GFtbPz5Zmt2HsWJ/k1fNFfQPwHud/hLUICf8AVXpP4Mi/4GgTPAriE29zLC33o3KH8Dio62PFdv8AZfF+swYxsvZhj/gZrHoGFFX7PRNV1Fgtlpt3cE9PKgZv5Cuq0z4R+MNRIL6etnGf47qULj/gIy36UAcNW54Mhln8baGkKkv9uhbj0Dgn9Aa9W0b4C2yFZNa1Z5fWK0XaP++mz/IV6ToXhHQfDaAaXpsML4wZiN0h+rHmgVzbooooEFeXfHZyvguzUDhr9c/98PXqNcx498Knxh4Yl02OVIrhXWWF3+6GHrjsQSKAPlCiuj17wH4k8OMxv9Ml8lf+W8I8yPHrkdPxxXOUFBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV7l8AHY2GuxkfKssJH1If/AV5VofgzxB4jdRpumTyRn/lsw2Rj/gR4r6G+G/gqXwXoU0F1NHLeXMnmStHnaoAwFBPXHP50CZeuPAHhW71Ge/udGgmup3LyPIWbcx6nBOK0bPw3oenkGz0ewgI7x26KfzxWpRQIQKFGAAB6CloooAKKKKACiiigAooooAMZrnNX8BeF9c3G90a28xussS+W/5rjP410dFAHkOp/AXTJSz6Xq9zbE8hJ0Eo/MYP865DUfgl4ptCTamzvV7eXLsb8mwP1r6NooC58lX3gTxVp2Tc6DfADq0cRkUfiuRWHNbz27FZoZImHZ1Kn9a+0ajlghnXbNEki+jqCP1oHc+LaK+vLnwf4bu8+foOmuT3+zID+YFZU/wu8F3Gd2hRL/1zkkT+TUBc+WKK+nl+EPgkHJ0lm9jcy/8AxVTwfCvwVAcrocbH/ppNI382oC58tU+OKSZtsUbu3oqkmvrW28FeF7PBg0DTlI7m3Vj+ZFbEFpbWq7be3ihHpGgX+VAXPkyx8F+JtRI+y6FfuD0ZoGVfzOBXT6f8FvFt4R9ojtbJT1M0wY/kua+kqKAueO6Z8BLNNraprU0p7pbRhB+Zz/Ku60f4deFdE2tbaRBJKv8Ay1uB5rZ9fmzj8K6iigQgUKAFAAHQCloooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q==" alt="" />
              </div>
              <div className="username">群聊</div>
            </div>
          </div>
          <div className="body-mainlist">
            {
              this.state.mailList.map(item => {
                if (item.friends.length) {
                  return (
                    <div className="name-item" key={item.label} data-index={item.label} >
                      <div className="name-initials">{item.label}</div>
                      <div className="name-list">
                        {
                          item.friends.map(it => (
                            <div className="list-item" key={it._id} onClick={this.toSingleChat.bind(this, it)}>
                              <div className="avatar">
                                <img src={it.avatarUrl} alt="" />
                              </div>
                              <div className="username">{it.nickname}</div>
                            </div>
                          ))
                        }

                      </div>
                    </div>
                  )
                } else {
                  return (<div key={item.label}></div>)
                }
              })
            }

          </div>
        </div>
        <div className='maillist-rightbar'>
          {
            this.state.letterList.map(item => (
              <div className={`letters-item ${this.state.activeLetter === item ? 'active' : ''}`} key={item} onClick={this.handleLetterClick}>{item}</div>
            ))
          }

        </div>
      </div >
    )
  }
}
export default withRouter(MailList)
