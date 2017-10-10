import BetterScroll from '@components/BetterScroll'

const BetterScrollWrapperWithOptions = (options) => {
  return (ChildComponent) => {
    return (props) => {
      return (
        <div className="page">
          <BetterScroll options={options}>
            <ChildComponent {...props} />
          </BetterScroll>
        </div>
      )
    }
  }
}

const BetterScrollWrapper = BetterScrollWrapperWithOptions()

export default BetterScrollWrapper

export {
  BetterScrollWrapperWithOptions
}
