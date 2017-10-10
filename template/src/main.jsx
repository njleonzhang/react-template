import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import { syncHistoryWithStore } from 'mobx-react-router'
import fastclick from 'fastclick'
import createHashHistory from 'history/createHashHistory'
import '@styles/main.scss'
import App from '@components/App'
import { isObservable } from 'mobx'
import store, { routerStore } from '@stores'
import promiseFinally from 'promise.prototype.finally'

promiseFinally.shim()
fastclick.attach(document.body)

const hashHistory = createHashHistory()
const history = syncHistoryWithStore(hashHistory, routerStore)

const renderApp = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...store}>
        <Router history={history}>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

renderApp(App)

// hot reload config
if (module.hot) {
  module.hot.accept(['./components/App', './stores'], () => {
    const newApp = require('./components/App').default
    renderApp(newApp)
  })
}

// for test
window.isObservable = isObservable
window.APP_STORE = store
