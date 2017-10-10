import classnames from 'classnames'
import PopupMask from '@components/PopupMask'
import './messageBox.scss'

@PopupMask
export default class MessageBox extends Component {
  static propTypes = {
    desc(props, propName) {
      if (props.type !== 'prompt' && !props[propName]) {
        return new Error('Prop desc is required, Validation failed!')
      }
      return null
    }
  }

  static defaultProps = {
    desc: ''
  }
  render() {
    const cls = classnames(
      'message-box',
      {
        'message-box-prompt': this.props.type === 'prompt'
      }
    )
    return (
      <div className={cls}>
        {
          this.props.title
            ? (
              <div className="message-title">
                {this.props.title}
              </div>
            )
            : null
        }
        {
          this.props.desc && this.props.type !== 'prompt'
            ? (
              <div className="message-desc">
                <div>
                  {this.props.desc}
                </div>
              </div>
            )
            : null
        }
        {
          this.props.type === 'prompt'
            ? (
              <label className="message-input">
                <input type={this.props.inputType || 'text'} ref={input => { this.input = input }} />
              </label>
            )
            : null
        }
        <div className="message-footer">
          {
            this.props.buttons.map(button => {
              return (
                <div className="message-footer-button" key={button.text} onClick={e => {
                  e.stopPropagation()
                  button.onButtonClick(this.input && this.input.value)
                }}>
                  {button.text}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
