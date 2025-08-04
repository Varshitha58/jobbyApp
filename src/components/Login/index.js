import {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErr: false,
    errMsg: '',
  }

  onChangeUsername = e => this.setState({username: e.target.value})

  onChangePassword = e => this.setState({password: e.target.value})

  onSubmitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showErr: true, errMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showErr, errMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />

          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            className="input"
            value={username}
            onChange={this.onChangeUsername}
          />

          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-btn">
            Login
          </button>

          {showErr && <p className="err-msg">{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default withRouter(Login)
