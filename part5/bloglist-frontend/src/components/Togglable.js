import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, btnName }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{btnName}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
      </div>
    </div>
  )
})

Togglable.propTypes = {
  btnName: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable