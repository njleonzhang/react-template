import axios from 'axios'

import { CachedCsrf } from '@services/CachedCookies'
import { routerStore } from '@stores'
import Toast from '@components/Toast'

let loadingDelayHanlder

const startLoading = function(showLoading) {
  if (showLoading) {
    clearTimeout(loadingDelayHanlder)
    loadingDelayHanlder = setTimeout(_ => {
      // start loading
      Toast.loading()
    }, 500)
  }
}

const stopLoading = function(showLoading) {
  if (showLoading) {
    clearTimeout(loadingDelayHanlder)
    // stop loading
    Toast.hide()
  }
}

function parseData(response) {
  return response.data
}

function httpBase(method, url, data = {}, options = {}) {
  function innerHttpBase({
    showLoading = true,
    showErrorToast = true,
  }) {
    const httpOptions = {
      method,
      url: process.env.httpBaseUrl + url,
      headers: {
        'x-zhsq-source': 'wechat',
      },
      withCredentials: true,
    }

    if (method === 'post') {
      httpOptions.data = data
      httpOptions.headers['X-CSRFToken'] = CachedCsrf.get()
    }

    startLoading(showLoading)

    return axios(httpOptions)
      .then(parseData)
      .then(response => {
        stopLoading(showLoading)
        if (response.code === 'OK') {
          return response.data ? response.data : {}
        }
        const error = new Error(response.msg)
        error.response = response
        throw error
      }).catch(error => {
        stopLoading(showLoading)

        if (error.response) {
          switch (error.response.code) {
            case 'USER_NOT_LOGGED_IN':
            case 'CSRF_FAILED':
              Toast.show(error.message)
              routerStore.replace(`/login?redirect=${routerStore.location.pathname}`)
              break

            default:
              if (showErrorToast) {
                Toast.show(error.message)
              }
          }
          return Promise.reject(error)
        }
        const status = parseInt(error.status / 100, 10)
        let errorMsg = ''
        switch (status) {
          case 5:
            errorMsg = '服务器内部错误'
            break
          case 4:
            errorMsg = 'URL找不到'
            break
          case 0:
            errorMsg = '连接服务器超时'
            break
          default:
            errorMsg = '未知错误'
        }
        if (showErrorToast) {
          Toast.show(errorMsg)
        }
        return Promise.reject(error)
      })
  }

  return innerHttpBase(options)
}

export const get = function(url, options) {
  return httpBase('get', url, {}, options)
}

export const post = function(url, data, options) {
  return httpBase('post', url, data, options)
}
