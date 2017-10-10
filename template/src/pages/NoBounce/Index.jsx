import { observer } from 'mobx-react'
import BetterScrollWrapper from '@components/BetterScrollWrapper'

import './noBounce.scss'

@observer
@BetterScrollWrapper
export default class NoBounce extends Component {
  render() {
    return (
      <div className="no-bounce-page">
        This is no bounce page
      </div>
    )
  }
}
