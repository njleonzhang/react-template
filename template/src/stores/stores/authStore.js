import { observable, action } from 'mobx'
import api from '@api'
import { getQueryParam } from '@services/QueryParser'
import { CachedCsrf } from '@services/CachedCookies'

import routerStore from './routerStore'
import homeStore from './homeStore'

class AuthStore {
  @observable authenticated = false
  @observable startWithoutCode = false

  @action loginByCode() {
    const code = getQueryParam(routerStore.location.search, 'code')

    if (code) {
      api.Auth.loginByCode(code)
        .then(_ => {
          this.authenticated = true
        })
        .catch(_ => {
          this.authenticated = false
          routerStore.replace(`/login?redirect=${routerStore.location.pathname}`)
        })
    } else {
      this.startWithoutCode = true
    }
  }

  @action getAuthCode(cellphone) {
    return api.Auth.getAuthCode(cellphone)
  }

  @action login(cellphone, authCode) {
    api.Auth.login(cellphone, authCode).then(_ => {
      CachedCsrf.renew()
      this.authenticated = true
      const redirect = getQueryParam(routerStore.location.search, 'redirect')
      if (redirect) {
        routerStore.push(redirect)
      } else {
        routerStore.push('/home')
      }
    })
  }

  @action logout() {
    api.Auth.logout().then(_ => {
      CachedCsrf.clear()
      homeStore.clear()
      this.authenticated = false
      routerStore.replace('/login')
    })
  }
}

export default new AuthStore()
