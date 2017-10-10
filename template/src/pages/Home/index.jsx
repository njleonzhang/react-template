import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import BetterScroll from '@components/BetterScroll'
import { Route } from 'react-router-dom'
import LazyRoute from 'lazy-route'
import Protected from '@components/Protected'
import MessageBox from '@components/MessageBox'

import './home.scss'

@inject('homeStore', 'routerStore')
@Protected
@observer
export default class Home extends Component {
  @observable showLogoutConfirm = false

  routers = _ => {
    return [
      <Route
        key="noBounce"
        exact
        path={`${this.props.match.url}/noBounce`}
        render={props => (
          <LazyRoute {...props} component={import('@pages/NoBounce')} />
        )}
      />
    ]
  }

  loadHomeData = _ => {
    return this.props.homeStore.loadHomeData()
  }

  handleLogout = _ => {
    this.showLogoutConfirm = true
  }

  gotoNoBouncePage = _ => {
    this.props.routerStore.push('/home/noBounce')
  }

  componentDidMount() {
    this.loadHomeData()
  }

  render() {
    const buttons = [{
      text: 'Cancel',
      onButtonClick: _ => {
        this.showLogoutConfirm = false
      }
    }, {
      text: 'Confirm',
      onButtonClick: _ => {
        this.props.authStore.logout()
      }
    }]

    return (
      <div className="home-page">
        <BetterScroll onRefresh={this.loadHomeData}>
          <div className="content">
            This is the home page
          </div>
          {
            this.props.homeStore.devices.map((device, index) => {
              return (
                <div key={`a-${index}`}>
                  {device.name}
                </div>
              )
            })
          }
          <div className="btn" onClick={this.gotoNoBouncePage}>goto noBounce page</div>
          <div className="btn" onClick={this.handleLogout}>Logout</div>

          <p>Pull to refresh</p>
        </BetterScroll>
        <MessageBox
          show={this.showLogoutConfirm}
          desc="Are you sure to logout?"
          buttons={buttons}
        />
        {/* route in this page */}
        {this.routers()}
      </div>
    )
  }
}

