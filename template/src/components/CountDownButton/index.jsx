import { observable } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import './countDownButton.scss'

@observer
export default class CountDownButton extends Component {
  @observable time
  @observable text
  @observable counting

  static propTypes = {
    time: PropTypes.number,
    text: PropTypes.string,
    request: PropTypes.func
  }

  static defaultProps = {
    time: 60,
    text: 'Get AuthCode',
    request: undefined
  }

  constructor(props) {
    super(props)
    this.text = props.text
    this.counting = false
  }

  handleClick = e => {
    if (this.counting) {
      return
    }
    if (this.props.request) {
      this.props.request(e)
        .then(_ => {
          this.time = this.props.time
          this.counting = true
          this.text = `${this.time} second`
          const interval = setInterval(_ => {
            if (this.time === 0) {
              this.text = 'Get AuthCode'
              clearInterval(interval)
              this.counting = false
              return
            }
            this.text = `${--this.time} second`
          }, 1000)
        })
    }
  }

  render() {
    return (
      <button className={`count-down-button ${this.props.buttonClass}`} onClick={this.handleClick}>
        {this.text}
      </button>
    )
  }
}
