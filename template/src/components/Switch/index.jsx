import PropTypes from 'prop-types'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import './switch.scss'

@observer
export default class Switch extends Component {
  @observable checked

  static defaultProps = {
    checked: false,
    onChange: noop,
    onClick: noop,
    disabled: false
  }

  static propsTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.checked = props.checked
  }

  componentWillReceiveProps(newProps) {
    if (newProps.disabled) {
      return
    }
    const { checked } = newProps
    if (checked !== undefined) {
      this.checked = checked
      this.props.onChange(this.checked)
    }
  }

  onClick = event => {
    event.stopPropagation()
    if (this.props.disabled) {
      this.props.onClick(null)
    } else {
      this.checked = !this.checked
      this.props.onChange(this.checked)
      this.props.onClick(this.checked)
    }
  }

  render() {
    const { className } = this.props

    return (
      <div className={`zy-switch ${className}`} onClick={this.onClick}>
        <div className={`checkbox ${this.checked ? 'checked' : ''}`} />
      </div>
    )
  }
}
