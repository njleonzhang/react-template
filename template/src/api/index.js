import { get, post } from '@services/Http'

const Auth = {
  getAuthCode: code => {
    return post('sms/send-code/', {
      cellphone: code
    })
  },

  login: (cellphone, sms_code) => {
    return post('user/login/', {
      cellphone,
      sms_code
    })
  },

  logout: () => {
    return get('user/logout/')
  }
}

const Device = {
  getDevices() {
    return get('/devices/')
  }
}

export default {
  Auth,
  Device
}
