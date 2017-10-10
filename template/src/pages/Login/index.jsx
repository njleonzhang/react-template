import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import BetterScrollWrapper from '@components/BetterScrollWrapper'
import CountDownButton from '@components/CountDownButton'
import Toast from '@components/Toast'

import './login.scss'

@BetterScrollWrapper
@inject('authStore')
@observer
export default class Login extends Component {
  @observable cellphone = ''
  @observable authCode = ''

  handleInputChange = e => {
    const target = e.target
    if (target.name === 'cellphone') {
      this.cellphone =
        target.value.length >= 11
          ? target.value.slice(0, 11)
          : target.value
    } else {
      this.authCode =
        target.value.length >= 6
          ? target.value.slice(0, 6)
          : target.value
    }
  }

  getAuthCode = e => {
    e.preventDefault()
    if (this.cellphone) {
      return this.props.authStore.getAuthCode(this.cellphone)
    }

    Toast.show('please input cellphone')
    return Promise.reject()
  }

  login = _ => {
    if (!this.cellphone) {
      Toast.show('please input cellphone')
      return
    }

    if (!this.authCode) {
      Toast.show('please input auth code')
      return
    }

    this.props.authStore.login(this.cellphone, this.authCode)
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-form">
          <label>
            <div className="table-cell-middle icon-wrapper">
              <i className="image-icon icon-cellphone" />
            </div>
            <div className="table-cell-middle">
              <input name="cellphone" type="text" placeholder="cellphone"
                value={this.cellphone} onChange={this.handleInputChange} />
            </div>
          </label>

          <label>
            <div className="table-cell-middle icon-wrapper">
              <i className="image-icon icon-auth-code" />
            </div>
            <div className="table-cell-middle">
              <input name="authCode" type="text" placeholder="password"
                value={this.authCode} onChange={this.handleInputChange} />
            </div>
            <div className="table-cell-middle">
              <CountDownButton request={this.getAuthCode} />
            </div>
          </label>

          <button className="block-button login-button" onClick={this.login}>
            Submit
          </button>

          <p>write any cellphone and password to login</p>
        </div>
      </div>
    )
  }
}
