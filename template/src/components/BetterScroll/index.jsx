import { observer } from 'mobx-react'
import { observable } from 'mobx'
import React, { Component } from 'react'
import BScroll from 'better-scroll'
import Icon from '@components/Icon'
import PropTypes from 'prop-types'
import './index.scss'

const beforeRefreshText = '下拉刷新'
const canRefreshText = '释放刷新'
const successRefreshText = '刷新完成'
const failRefreshText = '刷新失败'

const doc = window.document
const docEl = doc.documentElement
const dpr = docEl.getAttribute('data-dpr') || 1
const defaultThreshold = 60 * dpr

@observer
class BetterScroll extends Component {
  @observable pulldownText = beforeRefreshText

  static propTypes = {
    onRefresh: PropTypes.func
  }

  static defaultProps = {
    onRefresh: null
  }

  constructor(props) {
    super(props)
    const options = {
      probeType: 1,
      preventDefault: false,
      resizePolling: 500
    }
    const { onRefresh } = this.props
    if (onRefresh) {
      this.beforePulldownText = this.pulldownText
      options.pullDownRefresh = {
        threshold: defaultThreshold,
        stop: defaultThreshold
      }
    }

    this.bScrollOpts = {
      ...options,
      ...this.props.options
    }
  }

  componentDidMount() {
    this.$scroll = new BScroll(this.$el, this.bScrollOpts)

    // 禁用原生的touch move事件
    this.$el.addEventListener('touchmove', e => {
      e.preventDefault()
    })

    if (this.props.onRefresh) {
      this.$scroll.on('beforeScrollStart', () => {
        this.beforePulldownText = beforeRefreshText
        this.pulldownText = beforeRefreshText
      })

      this.$scroll.on('scroll', (pos) => {
        if (pos.y > defaultThreshold) {
          this.beforePulldownText = this.pulldownText
          this.pulldownText = canRefreshText
        } else {
          this.beforePulldownText = this.pulldownText
          this.pulldownText = beforeRefreshText
        }
      })

      this.$scroll.on('pullingDown', () => {
        this.beforePulldownText = this.pulldownText
        this.pulldownText = ''
        this.props.onRefresh().then(() => {
          this.finishPullDown(successRefreshText)
        }, () => {
          this.finishPullDown(failRefreshText)
        })
      })
    }
    this.refresh()
  }

  componentDidUpdate() {
    if (!this.props.onRefresh || this.beforePulldownText === this.pulldownText) {
      this.refresh()
    }
  }

  componentWillUnmount() {
    this.$scroll && this.$scroll.destroy()
  }

  refresh() {
    this.$scroll && this.$scroll.refresh()
  }

  finishPullDown(resultText) {
    this.$scroll.finishPullDown()
    this.beforePulldownText = this.pulldownText
    this.pulldownText = resultText
  }

  renderPulldown() {
    if (this.props.onRefresh) {
      let pulldown
      if (this.pulldownText.length) {
        pulldown = (
          <span>{ this.pulldownText }</span>
        )
      } else {
        pulldown = (
          <div className="loading-wrapper">
            <Icon type="loading" />
            <span style={{ marginLeft: 10 }}>加载中...</span>
          </div>
        )
      }
      return (
        <div className="pulldown-wrapper">
          {pulldown}
        </div>
      )
    }
    return null
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    }

    let wrapperStyle
    if (this.props.onRefresh) {
      wrapperStyle = {
        minHeight: '101%'
      }
    }

    return (
      <div className="better-scroll" style={style} ref={el => { this.$el = el }}>
        <div className="better-scroll-wrapper" style={wrapperStyle}>
          {this.renderPulldown()}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default BetterScroll
