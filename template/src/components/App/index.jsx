import { observer } from 'mobx-react'
import { withRouter, Route } from 'react-router-dom'
import LazyRoute from 'lazy-route'
import '@stores' // for hot-reload, make code change in store trigger App.jsx reload

import './index.css'

@withRouter
@observer
export default class App extends Component {
  render() {
    return (
      <div className="App container">
        <Route
          exact
          path="/login"
          render={props => (
            <LazyRoute {...props} component={import('@pages/Login')} />
          )}
        />
        <Route
          path="/home"
          render={props => (
            <LazyRoute {...props} component={import('@pages/Home')} />
          )}
        />
      </div>
    )
  }
}
