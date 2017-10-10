const isProduction = process.env.NODE_ENV === 'production'

const STATE_CLOSE = '0'
const STATE_OPEN = '1'
const STATE_PAUSE = '2'

const ACTION_OPEN = 'open'
const ACTION_CLOSE = 'close'
const ACTION_PAUSE = 'stop'

const stateCode2Str = {
  [STATE_CLOSE]: '关',
  [STATE_OPEN]: '开',
  [STATE_PAUSE]: '暂停'
}

const stateCode2Action = {
  [STATE_CLOSE]: ACTION_CLOSE,
  [STATE_OPEN]: ACTION_OPEN,
  [STATE_PAUSE]: ACTION_PAUSE
}

const noop = function() {}

export {
  isProduction,
  STATE_CLOSE,
  STATE_OPEN,
  STATE_PAUSE,
  ACTION_OPEN,
  ACTION_CLOSE,
  ACTION_PAUSE,
  stateCode2Str,
  noop,
  stateCode2Action
}
