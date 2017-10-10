import { inject, observer } from 'mobx-react'

export default function Protected(ChildrenComponent) {
  @inject('authStore')
  @observer
  class CheckLogin extends Component {
    componentDidMount() {
      if (!this.props.authStore.authenticated) {
        this.props.authStore.loginByCode()
      }
    }

    render() {
      return (
        this.props.authStore.authenticated || this.props.authStore.startWithoutCode
          ? <ChildrenComponent {...this.props} />
          : null
      )
    }
  }

  return CheckLogin
}
