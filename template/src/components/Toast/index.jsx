import 'rc-notification/assets/index.css'
import Notification from 'rc-notification'
import classnames from 'classnames'
import Icon from '@components/Icon'
import '@stores'
import './index.scss'

let messageInstance
const prefixCls = 'toast'

function getMessageInstance(mask) {
  if (messageInstance) {
    messageInstance.destroy()
    messageInstance = null
  }
  messageInstance = Notification.newInstance({
    prefixCls,
    style: { }, // clear rc-notification default style
    transitionName: `${prefixCls}-fade`,
    className: classnames({
      [`${prefixCls}-mask`]: mask,
      [`${prefixCls}-nomask`]: !mask,
    }),
  })
  return messageInstance
}

function notice(content, type, duration = 3, onClose, mask = false) {
  const iconType = ({
    info: null,
    loading: 'loading'
  })[type]

  let instance = getMessageInstance(mask)
  instance.notice({
    duration,
    style: {},
    content: iconType ? (
      <div className={`${prefixCls}-text ${prefixCls}-text-icon`} role="alert" aria-live="assertive">
        <Icon type={iconType} />
        <div className={`${prefixCls}-text-info`}>{content}</div>
      </div>
    ) : (
      <div className={`${prefixCls}-text`} role="alert" aria-live="assertive">
        <div>{content}</div>
      </div>
    ),
    onClose: () => {
      if (onClose) {
        onClose()
      }
      instance.destroy()
      instance = null
      messageInstance = null
    },
  })
}

function show(content, duration, mask) {
  return notice(content, 'info', duration, () => {}, mask)
}

function loading(content = '加载中...', duration = 3600, mask) {
  return notice(content, 'loading', duration, () => {}, mask)
}

function hide() {
  if (messageInstance) {
    messageInstance.destroy()
    messageInstance = null
  }
}

export default {
  show,
  loading,
  hide
}
