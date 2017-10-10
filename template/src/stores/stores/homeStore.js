import { observable, action } from 'mobx'
import api from '@api'

export class HomeStore {
  @observable devices = []

  @action loadHomeData() {
    this.devices = []

    return api.Device.getDevices({ throwError: true })
      .then(data => {
        this.devices = data
      })
      .catch(error => {
        console.log(error)
      })
  }

  @action clear() {
    this.devices = []
  }
}

export default new HomeStore()
