import './popupMask.scss'

export default function PopupMask(Component) {
  return outProps => {
    const { show, ...props } = outProps
    if (!show) {
      return null
    }

    return (
      <div className="mask-wrapper">
        <div className="mask" />
        <div className="mask-content">
          <Component {...props} />
        </div>
      </div>
    )
  }
}
